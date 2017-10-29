package com.dualion.controldiners.service.mapper;

import com.dualion.controldiners.domain.*;
import com.dualion.controldiners.service.dto.ProcesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Proces and its DTO ProcesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProcesMapper extends EntityMapper<ProcesDTO, Proces> {

    

    

    default Proces fromId(Long id) {
        if (id == null) {
            return null;
        }
        Proces proces = new Proces();
        proces.setId(id);
        return proces;
    }
}
