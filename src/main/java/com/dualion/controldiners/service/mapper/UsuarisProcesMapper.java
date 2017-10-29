package com.dualion.controldiners.service.mapper;

import com.dualion.controldiners.domain.*;
import com.dualion.controldiners.service.dto.UsuarisProcesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UsuarisProces and its DTO UsuarisProcesDTO.
 */
@Mapper(componentModel = "spring", uses = {ProcesMapper.class, UsuarisMapper.class})
public interface UsuarisProcesMapper extends EntityMapper<UsuarisProcesDTO, UsuarisProces> {

    @Mapping(source = "proces.id", target = "procesId")
    @Mapping(source = "usuaris.id", target = "usuarisId")
    @Mapping(source = "usuaris.nom", target = "usuarisNom")
    UsuarisProcesDTO toDto(UsuarisProces usuarisProces); 

    @Mapping(source = "procesId", target = "proces")
    @Mapping(source = "usuarisId", target = "usuaris")
    UsuarisProces toEntity(UsuarisProcesDTO usuarisProcesDTO);

    default UsuarisProces fromId(Long id) {
        if (id == null) {
            return null;
        }
        UsuarisProces usuarisProces = new UsuarisProces();
        usuarisProces.setId(id);
        return usuarisProces;
    }
}
