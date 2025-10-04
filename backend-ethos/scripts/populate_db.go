package scripts

import (
	"context"
	"database/sql"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	// Connect to the database
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}
	defer db.Close()

	// Ping the database to ensure a connection is established
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := db.PingContext(ctx); err != nil {
		log.Fatalf("Error pinging the database: %v", err)
	}

	log.Println("Successfully connected to the database.")

	// Get the current working directory
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatalf("Error getting current working directory: %v", err)
	}

	// Construct the path to the Test_Dataset directory
	datasetDir := filepath.Join(cwd, "..", "Test_Dataset")

	// Define the tables and their corresponding CSV files
	tablesToPopulate := []struct {
		tableName string
		fileName  string
	}{
		{"profiles", "student or staff profiles.csv"},
		{"campus_card_swipes", "campus card_swipes.csv"},
		{"cctv_frames", "cctv_frames.csv"},
		{"face_embeddings", "face_embeddings.csv"},
		{"free_text_notes", "free_text_notes (helpdesk or RSVPs).csv"},
		{"lab_bookings", "lab_bookings.csv"},
		{"library_checkouts", "library_checkouts.csv"},
		{"wifi_associations_logs", "wifi_associations_logs.csv"},
	}

	// Read and populate data from each CSV file
	for _, table := range tablesToPopulate {
		filePath := filepath.Join(datasetDir, table.fileName)
		if err := populateTable(db, filePath, table.tableName); err != nil {
			log.Printf("Error populating table %s: %v", table.tableName, err)
		}
	}
}

func populateTable(db *sql.DB, filePath, tableName string) error {
	// Open the CSV file
	file, err := os.Open(filePath)
	if err != nil {
		return fmt.Errorf("could not open file %s: %w", filePath, err)
	}
	defer file.Close()

	// Create a new CSV reader
	reader := csv.NewReader(file)

	// Read the header row
	header, err := reader.Read()
	if err != nil {
		return fmt.Errorf("could not read header from %s: %w", filePath, err)
	}

	// Start a new transaction
	tx, err := db.Begin()
	if err != nil {
		return fmt.Errorf("could not begin transaction: %w", err)
	}
	defer tx.Rollback() // Rollback is a no-op if the transaction is committed

	// Truncate the table to ensure idempotency
	if _, err := tx.Exec(fmt.Sprintf("TRUNCATE TABLE %s RESTART IDENTITY", tableName)); err != nil {
		return fmt.Errorf("could not truncate table %s: %w", tableName, err)
	}

	// Prepare the insert statement
	query := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s)", tableName, strings.Join(header, ","), generatePlaceholders(len(header)))
	stmt, err := tx.Prepare(query)
	if err != nil {
		return fmt.Errorf("could not prepare statement for %s: %w", tableName, err)
	}
	defer stmt.Close()

	// Read the remaining rows and insert them into the database
	rowCount := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("error reading record from %s: %w", filePath, err)
		}

		// Convert the record to a slice of interfaces
		args := make([]interface{}, len(record))
		for i, v := range record {
			// Handle empty strings as NULL for database insertion if necessary
			if v == "" {
				args[i] = nil
			} else {
				args[i] = v
			}
		}

		// Execute the insert statement
		if _, err := stmt.Exec(args...); err != nil {
			return fmt.Errorf("error inserting record into %s: %w", tableName, err)
		}
		rowCount++
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("could not commit transaction for %s: %w", tableName, err)
	}

	log.Printf("Successfully populated table %s with %d records from %s", tableName, rowCount, filePath)
	return nil
}

func generatePlaceholders(count int) string {
	placeholders := make([]string, count)
	for i := 0; i < count; i++ {
		placeholders[i] = fmt.Sprintf("$%d", i+1)
	}
	return strings.Join(placeholders, ",")
}
