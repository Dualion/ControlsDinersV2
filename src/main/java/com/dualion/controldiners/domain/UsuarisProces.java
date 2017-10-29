package com.dualion.controldiners.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import com.dualion.controldiners.domain.util.BigDecimalConverter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

/**
 * A UsuarisProces.
 */
@Entity
@Table(name = "usuaris_proces")
public class UsuarisProces implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
	@Convert(converter=BigDecimalConverter.class)
    @Column(name = "diners", nullable = false)
    private BigDecimal diners;

    @ManyToOne
    private Proces proces;

    @ManyToOne
    private Usuaris usuaris;

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

    public UsuarisProces diners(BigDecimal diners) {
        this.diners = diners.setScale(2, RoundingMode.CEILING);

        return this;
    }

    public void setDiners(BigDecimal diners) {
        this.diners = diners.setScale(2, RoundingMode.CEILING);

    }

    public Proces getProces() {
        return proces;
    }

    public UsuarisProces proces(Proces proces) {
        this.proces = proces;
        return this;
    }

    public void setProces(Proces proces) {
        this.proces = proces;
    }

    public Usuaris getUsuaris() {
        return usuaris;
    }

    public UsuarisProces usuaris(Usuaris usuaris) {
        this.usuaris = usuaris;
        return this;
    }

    public void setUsuaris(Usuaris usuaris) {
        this.usuaris = usuaris;
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
        UsuarisProces usuarisProces = (UsuarisProces) o;
        if (usuarisProces.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuarisProces.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UsuarisProces{" +
            "id=" + getId() +
            ", diners='" + getDiners() + "'" +
            "}";
    }
}
