package com.dualion.controldiners.service.mapper;

import com.dualion.controldiners.domain.*;
import com.dualion.controldiners.service.dto.QuantitatDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Quantitat and its DTO QuantitatDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface QuantitatMapper extends EntityMapper<QuantitatDTO, Quantitat> {

    

    

    default Quantitat fromId(Long id) {
        if (id == null) {
            return null;
        }
        Quantitat quantitat = new Quantitat();
        quantitat.setId(id);
        return quantitat;
    }
}
