package com.biglazy.resources;

import com.biglazy.api.Saying;
import com.codahale.metrics.annotation.Timed;

import javax.ws.rs.GET;
import javax.ws.rs.QueryParam;
import java.text.Normalizer;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

public class FormResource {
    private final String template;
    private final String defaultName;
    private final AtomicLong counter;

    public FormResource(String template, String defaultName, AtomicLong counter) {
        this.template = template;
        this.defaultName = defaultName;
        this.counter = counter;
    }

    @GET
    @Timed
    public Saying sayHello(@QueryParam("name") Optional<String> name) {
        final String value = String.format(template, name.orElse(defaultName));
        return new Saying(counter.incrementAndGet(), value);
    }
}
