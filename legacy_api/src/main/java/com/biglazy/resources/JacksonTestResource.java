package com.biglazy.resources;


import com.biglazy.api.Saying;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("jackson")
@Produces(MediaType.APPLICATION_JSON)
public class JacksonTestResource {

    @POST
    public Saying submit(Saying saying) {
        return saying;
    }

    @GET
    public Saying getSayingOrDieTrying() {
        return new Saying(1, "I don't know what you heard about me");
    }

}
