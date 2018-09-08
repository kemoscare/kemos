package com.biglazy.resources;

import com.biglazy.api.Protocol;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.types.ObjectId;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import java.io.IOException;

import static com.mongodb.client.model.Filters.eq;

@Path("/biglazy")
@Produces(MediaType.APPLICATION_JSON)
public class FormResource {

    private MongoClient mongoClient;
    private MongoCollection<Protocol> protocolCollection;

    public FormResource(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
        this.protocolCollection = mongoClient.getDatabase("biglazy").getCollection("protocoles", Protocol.class);

    }

    @POST
    public void postForm(Protocol protocol) {

//        ObjectMapper mapper = new ObjectMapper();
//        try {
//            Protocol protocol1 = mapper.readValue(protocol, Protocol.class);
//            ObjectId id = protocol1.getId();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }

        ObjectId id = protocol.getId();
        if(id == null) {
            this.protocolCollection.insertOne(protocol);
        } else {
            this.protocolCollection.findOneAndReplace(eq(id), protocol);
        }


    }

    @GET
    public Protocol getForm(@QueryParam("id") ObjectId objectId) {

        Protocol protocol = protocolCollection.find(eq(objectId)).first();
        System.out.println(protocol.getId());
        return protocol;
    }
}
