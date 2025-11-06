CREATE TABLE IF NOT EXISTS user_permission (
  id_user BIGINT NOT NULL,
  id_permission BIGINT NOT NULL,
  PRIMARY KEY (id_user, id_permission),
  CONSTRAINT fk_user_permission_user FOREIGN KEY (id_user) REFERENCES users(id),
  CONSTRAINT fk_user_permission_permission FOREIGN KEY (id_permission) REFERENCES permission(id)
);

CREATE INDEX IF NOT EXISTS idx_user_permission_id_permission ON user_permission (id_permission);
