package com.biglazy.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Day {

    private int id;
    private int protocol_id;

    @JsonProperty("j") private Integer day;
    @JsonProperty("mode") private CareMode careMode;
    @JsonProperty("galenique") private CareGalenic careGalenic;
    @JsonProperty("produits") private List<String> products;

//    public Day(Integer day, CareMode careMode, CareGalenic careGalenic, List<String> products) {
//
//        this.day = day;
//        this.careMode = careMode;
//        this.careGalenic = careGalenic;
//        this.products = products;
//    }


    public void setId(int id) {
        this.id = id;
    }
    public int getId() {
        return id;
    }

    public int getProtocol_id() {
        return protocol_id;
    }

    public void setProtocol_id(int protocol_id) {
        this.protocol_id = protocol_id;
    }


    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public CareMode getCareMode() {
        return careMode;
    }

    public void setCareMode(CareMode careMode) {
        this.careMode = careMode;
    }

    public CareGalenic getCareGalenic() {
        return careGalenic;
    }

    public void setCareGalenic(CareGalenic careGalenic) {
        this.careGalenic = careGalenic;
    }

    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }


}
