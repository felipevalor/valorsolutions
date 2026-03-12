-- Migration: 001_init.sql
-- Description: Create leads table for Valor Solutions portfolio

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    mensaje TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indices for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Example records for verification
INSERT INTO leads (nombre, email, mensaje, created_at) 
VALUES ('John Doe', 'john@example.com', 'Interesado en un sitio web para mi negocio.', datetime('now'));

INSERT INTO leads (nombre, email, mensaje, created_at) 
VALUES ('Jane Smith', 'jane@work.com', 'Consulta sobre una app fullstack edge.', datetime('now'));

-- Query used by the Worker in POST /api/contact:
-- INSERT INTO leads (nombre, email, mensaje, created_at)
-- VALUES (?, ?, ?, ?)
