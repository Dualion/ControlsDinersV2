package com.dualion.controldiners.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dualion.controldiners.service.UsuarisService;
import com.dualion.controldiners.web.rest.errors.BadRequestAlertException;
import com.dualion.controldiners.web.rest.util.HeaderUtil;
import com.dualion.controldiners.web.rest.util.PaginationUtil;

import io.github.jhipster.web.util.ResponseUtil;

import com.dualion.controldiners.service.dto.UsuarisDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Usuaris.
 */
@RestController
public class UsuarisResource {

	private final Logger log = LoggerFactory.getLogger(UsuarisResource.class);
    
	@Autowired
    private UsuarisService usuarisService;
	
	private static final String ENTITY_NAME = "usuaris";

    /**
     * POST  /usuarises : Create a new usuaris.
     *
     * @param usuarisDTO the usuarisDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new usuarisDTO, or with status 400 (Bad Request) if the usuaris has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/api/usuarises")
    @Timed
    public ResponseEntity<UsuarisDTO> createUsuaris(@Valid @RequestBody UsuarisDTO usuarisDTO) throws URISyntaxException {
        log.debug("REST request to save Usuaris : {}", usuarisDTO);
        if (usuarisDTO.getId() != null) {
        	throw new BadRequestAlertException("A new usuaris cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsuarisDTO result = usuarisService.save(usuarisDTO);
        return ResponseEntity.created(new URI("/api/usuarises/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /usuarises : Updates an existing usuaris.
     *
     * @param usuarisDTO the usuarisDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated usuarisDTO,
     * or with status 400 (Bad Request) if the usuarisDTO is not valid,
     * or with status 500 (Internal Server Error) if the usuarisDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/api/usuarises")
    @Timed
    public ResponseEntity<UsuarisDTO> updateUsuaris(@Valid @RequestBody UsuarisDTO usuarisDTO) throws URISyntaxException {
        log.debug("REST request to update Usuaris : {}", usuarisDTO);
        if (usuarisDTO.getId() == null) {
            return createUsuaris(usuarisDTO);
        }
        
        if (usuarisDTO.isActiu()) {
        	usuarisService.activa(usuarisDTO.getId());
        } else {
        	usuarisService.desactiva(usuarisDTO.getId());
        }
        
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, usuarisDTO.getId().toString()))
            .body(usuarisDTO);
    }

    /**
     * GET  /usuarises : get all the usuarises.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of usuarises in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/public/usuarises")
    @Timed
    public ResponseEntity<List<UsuarisDTO>> getAllUsuarises(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Usuarises");
        Page<UsuarisDTO> page = usuarisService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/usuarises");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /usuarises/:id : get the "id" usuaris.
     *
     * @param id the id of the usuarisDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the usuarisDTO, or with status 404 (Not Found)
     */
    @GetMapping("/public/usuarises/{id}")
    @Timed
    public ResponseEntity<UsuarisDTO> getUsuaris(@PathVariable Long id) {
        log.debug("REST request to get Usuaris : {}", id);
        UsuarisDTO usuarisDTO = usuarisService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(usuarisDTO));
    }
}
