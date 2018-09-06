package com.biglazy.api;

import com.fasterxml.jackson.annotation.*;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(value = {"submit"}) //ignores submit field
public class Protocol {

    @JsonProperty("id") private int id;
    @JsonProperty("protocole") private String name;
    @JsonProperty("radio-radiochimiotherapie") private RadioChimiotherapie radio_radiochimiottt;
    @JsonProperty("theme") private String theme;
    @JsonProperty("organe") private String organ;
    @JsonProperty("dureeCycle") private Integer dayOneEquals;
    @JsonProperty("reevaluations") private List<Evaluation> evaluations;
    @JsonProperty("jours") private List<Day> days;

    public Integer getDayOneEquals() {
        return dayOneEquals;
    }

    public void setDayOneEquals(Integer dayOneEquals) {
        this.dayOneEquals = dayOneEquals;
    }

    public List<Evaluation> getEvaluations() {
        return evaluations;
    }

    public void setEvaluations(List<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }

    public List<Day> getDays() {
        return days;
    }

    public void setDays(List<Day> days) {
        this.days = days;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RadioChimiotherapie getRadio_radiochimiottt() {
        return radio_radiochimiottt;
    }

    public void setRadio_radiochimiottt(RadioChimiotherapie radio_radiochimiottt) {
        this.radio_radiochimiottt = radio_radiochimiottt;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getOrgan() {
        return organ;
    }
    public void setOrgan(String organ) {
        this.organ = organ;
    }

    public int getId() { return id; }

    public void setId(int id) { this.id = id; }


}
