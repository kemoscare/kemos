package com.biglazy;

import ca.grimoire.dropwizard.cors.config.CrossOriginFilterFactory;
import ca.grimoire.dropwizard.cors.config.CrossOriginFilterFactoryHolder;
import io.dropwizard.Configuration;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.*;
import javax.validation.constraints.*;

public class BigLazyConfiguration extends Configuration implements CrossOriginFilterFactoryHolder {
    @NotEmpty
    private String template;

    @NotEmpty
    private String defaultName = "Stranger";
    private String database;

    @JsonProperty
    public String getTemplate() {
        return template;
    }

    @JsonProperty
    public void setTemplate(String template) {
        this.template = template;
    }

    @JsonProperty
    public String getDefaultName() {
        return defaultName;
    }

    @JsonProperty
    public void setDefaultName(String name) {
        this.defaultName = name;
    }

    @JsonProperty
    public void setDatabase(String database) {
        this.database = database;
    }

    @JsonProperty
    public String getDatabase() {
        return this.database;
    }

    private CrossOriginFilterFactory cors = new CrossOriginFilterFactory();

    public void setCors(CrossOriginFilterFactory cors) {
        this.cors = cors;
    }

    @Override
    public CrossOriginFilterFactory getCors() {
        return cors;
    }
}
