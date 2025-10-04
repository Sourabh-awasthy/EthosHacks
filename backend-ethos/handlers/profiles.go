package handlers

import (
	"net/http"

	"github.com/user/ethos-backend/models"
	"gorm.io/gorm"
)

type Handler struct {
	DB *gorm.DB
}

// New creates a new Handler with a database connection.
func New(db *gorm.DB) Handler {
	return Handler{DB: db}
}

func (h *Handler) ProfilesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		respondWithError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	// Get the 'role' query parameter from the URL (e.g., ?role=student)
	role := r.URL.Query().Get("role")

	var profiles []models.Profile
	query := h.DB.Model(&models.Profile{})

	// If a role is provided in the query, add a WHERE clause to filter the results.
	if role != "" {
		query = query.Where("role = ?", role)
	}

	// Execute the query.
	if err := query.Find(&profiles).Error; err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not retrieve profiles")
		return
	}

	respondWithJSON(w, http.StatusOK, profiles)
}
