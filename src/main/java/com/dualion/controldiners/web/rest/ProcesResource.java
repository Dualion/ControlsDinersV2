package com.dualion.controldiners.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dualion.controldiners.service.ProcesService;
import com.dualion.controldiners.web.rest.errors.BadRequestAlertException;
import com.dualion.controldiners.web.rest.util.HeaderUtil;
import com.dualion.controldiners.web.rest.util.PaginationUtil;

import io.github.jhipster.web.util.ResponseUtil;

import com.dualion.controldiners.service.dto.ProcesDTO;
import com.dualion.controldiners.service.exception.ProcesException;
import com.dualion.controldiners.service.exception.QuantitatException;
import com.dualion.controldiners.service.exception.UsuarisProcesException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Proces.
 */
@RestController
public class ProcesResource {

	private final Logger log = LoggerFactory.getLogger(ProcesResource.class);
    
	@Autowired
    private ProcesService procesService;

	private static final String ENTITY_NAME = "proces";
	private static final String ENTITY_NAME_Q = "quantitat";
	
    /**
     * POST  /proces : Create a new proces.
     *
     * @return the ResponseEntity with status 201 (Created) and with body the new procesDTO, or with status 400 (Bad Request) if the proces has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/api/proces")
    @Timed
    public ResponseEntity<ProcesDTO> createProces() throws URISyntaxException {
        log.debug("REST request to save Proces ");

        ProcesDTO result;
		try {
			result = procesService.save();
		} catch (ProcesException e) {
			throw new BadRequestAlertException(e.getMessage(), ENTITY_NAME, "procesactive");
		} catch (QuantitatException e) {
			throw new BadRequestAlertException(e.getMessage(), ENTITY_NAME_Q, "quantitatactive");
		}
        return ResponseEntity.created(new URI("/api/proces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * POST  /proces/terminate : Terminate active proces.
     *
     * @return the ResponseEntity with status 201 (Created) and with body the new procesDTO, or with status 400 (Bad Request) if the proces has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/api/proces/terminate")
    @Timed
    public ResponseEntity<ProcesDTO> terminateProces() throws URISyntaxException {
        log.debug("REST request to terminate active Proces ");
        ProcesDTO result;
		try {
			result = procesService.acabarProcesActiu();
		} catch (UsuarisProcesException e) {
			throw new BadRequestAlertException(e.getMessage(), ENTITY_NAME, "usuarisnopagats");
		} catch (ProcesException e) {
			throw new BadRequestAlertException(e.getMessage(), ENTITY_NAME, "procesinactiu");
		}
        
        return ResponseEntity.created(new URI("/api/proces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("proces", result.getId().toString()))
            .body(result);
    }

    /**
     * GET  /proces : get all the proces.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of proces in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/public/proces")
    @Timed
    public ResponseEntity<List<ProcesDTO>> getAllProces(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Proces");
        Page<ProcesDTO> page = procesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/proces");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /proces/:id : get the "id" proces.
     *
     * @param id the id of the procesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the procesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/public/proces/{id}")
    @Timed
    public ResponseEntity<ProcesDTO> getProces(@PathVariable Long id) {
        log.debug("REST request to get Proces : {}", id);
        ProcesDTO procesDTO = procesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(procesDTO));
    }

    /**
     * GET  /proces/actiu : get the active proces.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the procesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/public/proces/actiu")
    @Timed
    public ResponseEntity<Map<String, Boolean>> getQuantitatActiva() {
        log.debug("REST request to get Quantitat Activa");
        ProcesDTO procesDTO = procesService.findActiva();
        if(procesDTO != null) {
        	return ResponseEntity.ok().body(Collections.singletonMap("actiu", true));
        } else {
        	return ResponseEntity.ok().body(Collections.singletonMap("actiu", false));
        }
    }
}
