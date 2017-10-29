package com.dualion.controldiners.service.mapper;

import com.dualion.controldiners.domain.*;
import com.dualion.controldiners.service.dto.UsuarisDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Usuaris and its DTO UsuarisDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UsuarisMapper extends EntityMapper<UsuarisDTO, Usuaris> {

    

    

    default Usuaris fromId(Long id) {
        if (id == null) {
            return null;
        }
        Usuaris usuaris = new Usuaris();
        usuaris.setId(id);
        return usuaris;
    }
}
