package com.biglazy.resources;

import com.biglazy.api.Day;
import com.biglazy.api.Evaluation;
import com.biglazy.api.Protocol;
import com.biglazy.api.Saying;
import com.biglazy.dao.DayDAO;
import com.biglazy.dao.EvaluationDAO;
import com.biglazy.dao.ProtocolDAO;
import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Path("/biglazy")
@Produces(MediaType.APPLICATION_JSON)
public class FormResource {

    private MongoClient mongoClient;

    public FormResource(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @POST
    public Protocol postForm(Protocol protocol) {

//        SQL Post
//        try(Handle handle = this.jdbi.open()) {
//            ProtocolDAO protocolDAO = handle.attach(ProtocolDAO.class);
//            EvaluationDAO evaluationDAO = handle.attach(EvaluationDAO.class);
//            DayDAO dayDAO = handle.attach(DayDAO.class);
//
//            int last_id = protocolDAO.insert(protocol);
//            for(Day day : protocol.getDays()) { day.setProtocol_id(last_id); dayDAO.insert(day); };
//            for(Evaluation evaluation : protocol.getEvaluations()) { evaluation.setProtocol_id(last_id); evaluationDAO.insert(evaluation); };
//
//        } catch (Error e) {
//            e.printStackTrace();
//        }

        MongoCollection<Protocol> collection = mongoClient.getDatabase("biglazy").getCollection("protocoles", Protocol.class);
        collection.insertOne(protocol);

        return protocol;
    }
}
