package com.biglazy.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CareMode {
    @JsonProperty("hospitalisation") Admission,
    @JsonProperty("hdj") DayCare
}
