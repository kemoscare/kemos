package com.biglazy.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum ResourceType {
    @JsonProperty("theme") Theme,
    @JsonProperty("organ") Organ,
    @JsonProperty("protocol") Protocol
}
