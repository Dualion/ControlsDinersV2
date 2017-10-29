package com.dualion.controldiners.service.mapper;

import com.dualion.controldiners.domain.*;
import com.dualion.controldiners.service.dto.PotDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pot and its DTO PotDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PotMapper extends EntityMapper<PotDTO, Pot> {

    

    

    default Pot fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pot pot = new Pot();
        pot.setId(id);
        return pot;
    }
}
