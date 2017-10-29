package com.dualion.controldiners.repository;

import com.dualion.controldiners.domain.Proces;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Proces entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcesRepository extends JpaRepository<Proces, Long> {

	Optional<Proces> findFirstByEstat(Boolean estat);
	
}
