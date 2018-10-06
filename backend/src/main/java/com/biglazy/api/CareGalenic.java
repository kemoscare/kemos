package com.biglazy.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CareGalenic {
    @JsonProperty("iv") IntraVeinous,
    @JsonProperty("peros") PerOs,
    @JsonProperty("diffuseur") Distributor
}
