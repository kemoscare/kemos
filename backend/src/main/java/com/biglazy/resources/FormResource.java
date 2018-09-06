package com.biglazy.resources;

import com.biglazy.api.Protocol;
import com.biglazy.api.Saying;
import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jdbi.v3.core.Jdbi;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.Optional;

@Path("/biglazy")
@Produces(MediaType.APPLICATION_JSON)
public class FormResource {

    private Jdbi jdbi;

    public FormResource(Jdbi jdbi) {
        this.jdbi = jdbi;
    }

    @POST
    public Protocol postForm(Protocol protocol) {
        return protocol;
    }
}
