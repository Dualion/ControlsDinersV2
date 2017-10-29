package com.dualion.controldiners.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import com.dualion.controldiners.domain.util.BigDecimalConverter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

/**
 * A Quantitat.
 */
@Entity
@Table(name = "quantitat")
public class Quantitat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
	@Convert(converter=BigDecimalConverter.class)
    @Column(name = "diners", nullable = false)
    private BigDecimal diners;

    @NotNull
    @Column(name = "actiu", nullable = false)
    private Boolean actiu;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getDiners() {
        return diners;
    }

    public Quantitat diners(BigDecimal diners) {
        this.diners = diners.setScale(2, RoundingMode.CEILING);

        return this;
    }

    public void setDiners(BigDecimal diners) {
        this.diners = diners.setScale(2, RoundingMode.CEILING);

    }

    public Boolean isActiu() {
        return actiu;
    }

    public Quantitat actiu(Boolean actiu) {
        this.actiu = actiu;
        return this;
    }

    public void setActiu(Boolean actiu) {
        this.actiu = actiu;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Quantitat quantitat = (Quantitat) o;
        if (quantitat.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quantitat.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Quantitat{" +
            "id=" + getId() +
            ", diners='" + getDiners() + "'" +
            ", actiu='" + isActiu() + "'" +
            "}";
    }
}
