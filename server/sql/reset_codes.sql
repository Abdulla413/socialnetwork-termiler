DROP TABLE IF EXISTS reset_codes;
CREATE TABLE reset_codes(
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email !=''),
    code VARCHAR(6) NOT NULL CHECK (code != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);