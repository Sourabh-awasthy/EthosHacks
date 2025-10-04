package models

import "time"

// Profile represents the profiles table
type Profile struct {
	EntityID   string `gorm:"primaryKey"`
	Name       string
	Role       string
	Email      string `gorm:"unique"`
	Department string
	StudentID  string `gorm:"unique"`
	StaffID    string `gorm:"unique"`
	CardID     string `gorm:"unique"`
	DeviceHash string `gorm:"unique"`
	FaceID     string `gorm:"unique"`

	// One-to-Many relationships
	FreeTextNotes    []FreeTextNote    `gorm:"foreignKey:EntityID"`
	LabBookings      []LabBooking      `gorm:"foreignKey:EntityID"`
	LibraryCheckouts []LibraryCheckout `gorm:"foreignKey:EntityID"`
}

// CampusCardSwipe represents the campus_card_swipes table
type CampusCardSwipe struct {
	CardID     string
	LocationID string
	Timestamp  time.Time
}

// CCTVFrame represents the cctv_frames table
type CCTVFrame struct {
	FrameID    string `gorm:"primaryKey"`
	LocationID string
	Timestamp  time.Time
	FaceID     string
}

// FaceEmbedding represents the face_embeddings table
type FaceEmbedding struct {
	FaceID    string `gorm:"primaryKey"`
	Embedding string
}

// FreeTextNote represents the free_text_notes table
type FreeTextNote struct {
	NoteID    string `gorm:"primaryKey"`
	EntityID  string
	Category  string
	Text      string
	Timestamp time.Time
}

// LabBooking represents the lab_bookings table
type LabBooking struct {
	BookingID string `gorm:"primaryKey"`
	EntityID  string
	RoomID    string
	StartTime time.Time
	EndTime   time.Time
	Attended  string
}

// LibraryCheckout represents the library_checkouts table
type LibraryCheckout struct {
	CheckoutID string `gorm:"primaryKey"`
	EntityID   string
	BookID     string
	Timestamp  time.Time
}

// WifiAssociationsLog represents the wifi_associations_logs table
type WifiAssociationsLog struct {
	DeviceHash string
	ApID       string
	Timestamp  time.Time
}
