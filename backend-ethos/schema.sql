CREATE TABLE profiles (
    entity_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    department VARCHAR(255),
    student_id VARCHAR(255) UNIQUE,
    staff_id VARCHAR(255) UNIQUE,
    card_id VARCHAR(255) UNIQUE,
    device_hash VARCHAR(255) UNIQUE,
    face_id VARCHAR(255) UNIQUE
);

CREATE TABLE campus_card_swipes (
    card_id VARCHAR(255),
    location_id VARCHAR(255),
    timestamp TIMESTAMP,
    FOREIGN KEY (card_id) REFERENCES profiles(card_id)
);
CREATE INDEX idx_campus_card_swipes_card_id ON campus_card_swipes(card_id);

CREATE TABLE cctv_frames (
    frame_id VARCHAR(255) PRIMARY KEY,
    location_id VARCHAR(255),
    timestamp TIMESTAMP,
    face_id VARCHAR(255),
    FOREIGN KEY (face_id) REFERENCES profiles(face_id)
);
CREATE INDEX idx_cctv_frames_face_id ON cctv_frames(face_id);

CREATE TABLE face_embeddings (
    face_id VARCHAR(255) PRIMARY KEY,
    embedding TEXT,
    FOREIGN KEY (face_id) REFERENCES profiles(face_id)
);

CREATE TABLE free_text_notes (
    note_id VARCHAR(255) PRIMARY KEY,
    entity_id VARCHAR(255),
    category VARCHAR(255),
    text TEXT,
    timestamp TIMESTAMP,
    FOREIGN KEY (entity_id) REFERENCES profiles(entity_id)
);
CREATE INDEX idx_free_text_notes_entity_id ON free_text_notes(entity_id);

CREATE TABLE lab_bookings (
    booking_id VARCHAR(255) PRIMARY KEY,
    entity_id VARCHAR(255),
    room_id VARCHAR(255),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    attended VARCHAR(255),
    FOREIGN KEY (entity_id) REFERENCES profiles(entity_id)
);
CREATE INDEX idx_lab_bookings_entity_id ON lab_bookings(entity_id);

CREATE TABLE library_checkouts (
    checkout_id VARCHAR(255) PRIMARY KEY,
    entity_id VARCHAR(255),
    book_id VARCHAR(255),
    timestamp TIMESTAMP,
    FOREIGN KEY (entity_id) REFERENCES profiles(entity_id)
);
CREATE INDEX idx_library_checkouts_entity_id ON library_checkouts(entity_id);

CREATE TABLE wifi_associations_logs (
    device_hash VARCHAR(255),
    ap_id VARCHAR(255),
    timestamp TIMESTAMP,
    FOREIGN KEY (device_hash) REFERENCES profiles(device_hash)
);
CREATE INDEX idx_wifi_associations_logs_device_hash ON wifi_associations_logs(device_hash);
