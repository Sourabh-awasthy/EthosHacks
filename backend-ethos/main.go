package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/user/ethos-backend/handlers"
	"github.com/user/ethos-backend/models"
)

var db *gorm.DB

func main() {
	var err error
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://user:password@db:5432/ethosdb?sslmode=disable"
		log.Println("DATABASE_URL environment variable not set, using default for docker-compose")
	}

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("FATAL: failed to connect to database: %v", err)
	}
	log.Println("Database connection successful.")

	h := handlers.New(db)

	// Auto-migrate the schema. This will create/update tables based on your GORM models.
	log.Println("Running database migrations...")
	err = db.AutoMigrate(
		&models.Profile{},
		&models.CampusCardSwipe{},
		&models.CCTVFrame{},
		&models.FaceEmbedding{},
		&models.FreeTextNote{},
		&models.LabBooking{},
		&models.LibraryCheckout{},
		&models.WifiAssociationsLog{},
	)
	if err != nil {
		log.Fatalf("FATAL: failed to auto-migrate database: %v", err)
	}
	log.Println("Database migration successful!")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello from the Go backend!")
	})
	// The profiles handler is now a method on our handler struct.
	http.HandleFunc("/api/profiles", h.ProfilesHandler)

	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}

	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
