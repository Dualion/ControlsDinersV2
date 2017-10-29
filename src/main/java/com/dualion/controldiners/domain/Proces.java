package com.dualion.controldiners.domain;


import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Proces.
 */
@Entity
@Table(name = "proces")
public class Proces implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(name = "estat")
    private Boolean estat;
	@CreatedDate
    @Column(name = "data_inici")
    private ZonedDateTime dataInici = ZonedDateTime.now();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDataInici() {
        return dataInici;
    }

    public Proces dataInici(ZonedDateTime dataInici) {
        this.dataInici = dataInici;
        return this;
    }

    public void setDataInici(ZonedDateTime dataInici) {
        this.dataInici = dataInici;
    }

    public Boolean isEstat() {
        return estat;
    }

    public Proces estat(Boolean estat) {
        this.estat = estat;
        return this;
    }

    public void setEstat(Boolean estat) {
        this.estat = estat;
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
        Proces proces = (Proces) o;
        if (proces.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), proces.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Proces{" +
            "id=" + getId() +
            ", dataInici='" + getDataInici() + "'" +
            ", estat='" + isEstat() + "'" +
            "}";
    }
}
