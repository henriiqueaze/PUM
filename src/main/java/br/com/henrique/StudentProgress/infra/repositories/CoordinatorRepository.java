package br.com.henrique.StudentProgress.infra.repositories;

import br.com.henrique.StudentProgress.model.entities.Coordinator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordinatorRepository extends JpaRepository<Coordinator, Long> {
}
