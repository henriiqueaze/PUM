package br.com.henrique.StudentProgress.infra.repositories;

import br.com.henrique.StudentProgress.model.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}
