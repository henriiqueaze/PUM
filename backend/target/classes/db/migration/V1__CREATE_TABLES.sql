CREATE TABLE IF NOT EXISTS coordinator_db (
  id BIGSERIAL PRIMARY KEY,
  academic_email VARCHAR(255) NOT NULL,
  cpf VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS course_db (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  coordinator_id BIGINT NOT NULL,
  CONSTRAINT fk_course_coordinator FOREIGN KEY (coordinator_id) REFERENCES coordinator_db(id)
);

CREATE INDEX IF NOT EXISTS idx_course_coordinator_id ON course_db (coordinator_id);

CREATE TABLE IF NOT EXISTS student_db (
  id BIGSERIAL PRIMARY KEY,
  academic_email VARCHAR(255) NOT NULL,
  cpf VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(255) NOT NULL,
  course_id BIGINT NOT NULL,
  CONSTRAINT fk_student_course FOREIGN KEY (course_id) REFERENCES course_db(id)
);

CREATE INDEX IF NOT EXISTS idx_student_course_id ON student_db (course_id);
