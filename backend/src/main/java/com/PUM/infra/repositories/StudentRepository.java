package com.PUM.infra.repositories;

import com.PUM.model.entities.Course;
import com.PUM.model.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByCourse(Course course);
}
