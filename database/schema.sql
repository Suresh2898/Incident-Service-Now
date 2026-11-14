
CREATE DATABASE IF NOT EXISTS incidentdb;

USE incidentdb;

CREATE TABLE IF NOT EXISTS incidents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20),
    status VARCHAR(30),
    assigned_to VARCHAR(100),
    category VARCHAR(100),
    created_at DATETIME
);
