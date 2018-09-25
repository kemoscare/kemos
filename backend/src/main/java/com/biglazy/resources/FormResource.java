package com.biglazy.resources;

import com.biglazy.api.Protocol;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Aggregates;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.or;

@Path("/biglazy")
@Produces(MediaType.APPLICATION_JSON)
public class FormResource {

    private MongoClient mongoClient;
    private MongoCollection<Protocol> protocolCollection;
    private MongoCollection<Document> aggregatableCollection;

    public FormResource(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
        this.protocolCollection = mongoClient.getDatabase("biglazy").getCollection("protocoles", Protocol.class);
        this.aggregatableCollection = mongoClient.getDatabase("biglazy").getCollection("protocoles");

    }

//    @POST
//    public void stringPostForm(String protocol) {
//        ObjectMapper mapper = new ObjectMapper();
//        System.out.println(protocol);
//
//        try {
//
//            Protocol protocol1 = mapper.readValue(protocol, Protocol.class);
//            ObjectId id = protocol1.getId();
//            if(id == null) {
//                this.protocolCollection.insertOne(protocol1);
//            } else {
//                this.protocolCollection.findOneAndReplace(eq(id), protocol1);
//            }
//
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

    @POST
    public void postForm(Protocol protocol) {

        ObjectId id = protocol.getId();
        if(id == null) {
            this.protocolCollection.insertOne(protocol);
        } else {
            this.protocolCollection.findOneAndReplace(eq(id), protocol);
        }

    }

    @GET
    public List<Protocol> getProtocols(@QueryParam("theme") Optional<String> theme,
                                       @QueryParam("organ") Optional<String> organ) {
        List<Protocol> protocols = new ArrayList<>();
        for(Protocol p : protocolCollection.find()) {
            protocols.add(p);
        }
        return protocols;
    }

    @GET
    @Path("/{id}")
    public Protocol getProtocol(@PathParam("id") ObjectId objectId) {

        Protocol protocol = protocolCollection.find(eq(objectId)).first();
        System.out.println(protocol.getId());
        return protocol;
    }

    @GET
    @Path("/organs")
    public List<Document> getOrgans(@QueryParam("theme") String theme) {
        List<Document> organs = new ArrayList<>();
        System.out.println(theme);
        for(Document organ: aggregatableCollection.aggregate(Arrays.asList(Aggregates.match(eq("theme", theme)), Aggregates.group("$organ")))) {
            organs.add(organ);
        }

        return organs;
    }

    @GET
    @Path("/themes")
    public List<Document> getThemes() {
        List<Document> themes = new ArrayList<>();
        aggregatableCollection.aggregate(Arrays.asList(Aggregates.group("$theme"))).forEach((Consumer<? super Document>) themes::add);
        return themes;

    }
}
