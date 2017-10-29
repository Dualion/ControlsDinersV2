package com.dualion.controldiners.repository;

import com.dualion.controldiners.domain.Usuaris;
import org.springframework.stereotype.Repository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Usuaris entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarisRepository extends JpaRepository<Usuaris, Long> {

	List<Usuaris> findByActiuTrue();
	
	@Modifying
	@Query("update Usuaris u set u.actiu = :actiu where u.id = :userId")
	void setUsuarisActiuById(@Param("actiu") Boolean actiu, @Param("userId") Long userId);

}
