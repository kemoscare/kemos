package com.biglazy.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Day {

    @JsonProperty("j") private String day;
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

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
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
