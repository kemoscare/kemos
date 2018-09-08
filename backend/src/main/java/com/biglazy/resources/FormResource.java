package com.biglazy.resources;

import com.biglazy.api.Protocol;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.types.ObjectId;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
}
