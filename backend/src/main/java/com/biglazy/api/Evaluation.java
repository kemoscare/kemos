package com.biglazy.api;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.Map;

public class Evaluation {

    @JsonProperty("delai") private Integer delay;
    @JsonProperty("j") private Integer dayAfter;
    @JsonIgnore  private Boolean imagery;
    @JsonIgnore  private Boolean consultation;

    @JsonProperty("contenu")
    private void unpackContent(Map<String, Object> content) {
        this.imagery = (Boolean)content.get("imagerie");
        this.consultation = (Boolean)content.get("consultation");
    }

    @JsonProperty("contenu")
    public Map<String, Object> packContent() {
        Map<String, Object> content = new HashMap<String, Object>();
        content.put("imagerie", this.imagery);
        content.put("consultation", this.consultation);
        return content;
    }

//    public Evaluation(Integer delay, Integer dayAfter, Boolean imagery, Boolean consultation) {
//
//        this.delay = delay;
//        this.dayAfter = dayAfter;
//        this.imagery = imagery;
//        this.consultation = consultation;
//    }

    public Integer getDelay() {
        return delay;
    }

    public void setDelay(Integer delay) {
        this.delay = delay;
    }

    public Integer getDayAfter() {
        return dayAfter;
    }

    public void setDayAfter(Integer dayAfter) {
        this.dayAfter = dayAfter;
    }

    public Boolean getImagery() {
        return imagery;
    }

    public void setImagery(Boolean imagery) {
        this.imagery = imagery;
    }

    public Boolean getConsultation() {
        return consultation;
    }

    public void setConsultation(Boolean consultation) {
        this.consultation = consultation;
    }

}
