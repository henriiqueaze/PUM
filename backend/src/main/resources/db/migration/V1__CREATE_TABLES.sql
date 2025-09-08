CREATE TABLE IF NOT EXISTS `coordinator_db` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `academic_email` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS `course_db` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `coordinator_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnoe75hrve8ueh045tmyg2im52` (`coordinator_id`),
  CONSTRAINT `FKnoe75hrve8ueh045tmyg2im52` FOREIGN KEY (`coordinator_id`) REFERENCES `coordinator_db` (`id`)
);


CREATE TABLE IF NOT EXISTS `student_db` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `academic_email` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  `course_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcc9dsh5qx6nv35sfvbgqxtbun` (`course_id`),
  CONSTRAINT `FKcc9dsh5qx6nv35sfvbgqxtbun` FOREIGN KEY (`course_id`) REFERENCES `course_db` (`id`)
)