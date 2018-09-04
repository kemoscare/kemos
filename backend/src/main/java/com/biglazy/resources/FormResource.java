package com.biglazy.resources;

import com.biglazy.api.Protocol;
import com.codahale.metrics.annotation.Timed;
import org.jdbi.v3.core.Jdbi;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@Path("/biglazy")
@Produces(MediaType.APPLICATION_JSON)

public class FormResource {

    private Jdbi jdbi;

    public FormResource(Jdbi jdbi) {
        this.jdbi = jdbi;
    }

    @GET
    @Timed
    public Protocol sayHello(@QueryParam("name") Optional<String> name) {
        return new Protocol("", "");
    }
}
