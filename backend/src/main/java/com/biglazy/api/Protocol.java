package com.biglazy.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Protocol {

    public Protocol(String data, String metadata) {
        this.data = data;
        this.metadata = metadata;
    }

    @JsonProperty
    public String data;
    @JsonProperty
    public String metadata;
}
