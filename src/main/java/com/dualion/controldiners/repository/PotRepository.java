package com.dualion.controldiners.repository;

import com.dualion.controldiners.domain.Pot;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Pot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PotRepository extends JpaRepository<Pot, Long> {

	Optional<Pot> findFirstByOrderByIdDesc();
	
}
