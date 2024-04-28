CREATE TABLE kategori (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE invlist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    kategori_id BIGINT,
    created_by VARCHAR(255),
    FOREIGN KEY (kategori_id) REFERENCES kategori(id)
);
