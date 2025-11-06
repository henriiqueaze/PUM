CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  user_name VARCHAR(255) UNIQUE,
  full_name VARCHAR(255),
  password VARCHAR(255),
  account_non_expired BOOLEAN,
  account_non_locked BOOLEAN,
  credentials_non_expired BOOLEAN,
  enabled BOOLEAN
);
