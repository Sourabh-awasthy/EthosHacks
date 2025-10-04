CREATE TABLE profiles (
    entity_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(255),
    email VARCHAR(255),
    department VARCHAR(255),
    student_id VARCHAR(255),
    staff_id VARCHAR(255),
    card_id VARCHAR(255),
    device_hash VARCHAR(255),
    face_id VARCHAR(255)
);

CREATE TABLE campus_card_swipes (
    card_id VARCHAR(255),
    location_id VARCHAR(255),
    timestamp TIMESTAMP
);

CREATE TABLE cctv_frames (
    frame_id VARCHAR(255),
    location_id VARCHAR(255),
    timestamp TIMESTAMP,
    face_id VARCHAR(255)
);

CREATE TABLE face_embeddings (
    face_id VARCHAR(255),
    embedding TEXT
);

CREATE TABLE free_text_notes (
    note_id VARCHAR(255),
    entity_id VARCHAR(255),
    category VARCHAR(255),
    text TEXT,
    timestamp TIMESTAMP
);

CREATE TABLE lab_bookings (
    booking_id VARCHAR(255),
    entity_id VARCHAR(255),
    room_id VARCHAR(255),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    attended VARCHAR(255)
);

CREATE TABLE library_checkouts (
    checkout_id VARCHAR(255),
    entity_id VARCHAR(255),
    book_id VARCHAR(255),
    timestamp TIMESTAMP
);

CREATE TABLE wifi_associations_logs (
    device_hash VARCHAR(255),
    ap_id VARCHAR(255),
    timestamp TIMESTAMP
);
