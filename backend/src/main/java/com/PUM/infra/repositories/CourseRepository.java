package com.PUM.infra.repositories;

import com.PUM.model.entities.Coordinator;
import com.PUM.model.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCoordinator(Coordinator coordinator);

}
