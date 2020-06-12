package com.biglazy.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum RadioChimiotherapie {
    @JsonProperty("radiotherapie") Radiotherapie,
    @JsonProperty("chimiotherapie") Chimiotherapie,
    @JsonProperty("radiochimiotherapie") RadioChimiotherapie
}
