package com.biglazy;

import ca.grimoire.dropwizard.cors.CorsBundle;
import ca.grimoire.dropwizard.cors.config.CrossOriginFilterFactoryHolder;
import com.biglazy.dao.DayDAO;
import com.biglazy.dao.EvaluationDAO;
import com.biglazy.dao.ProtocolDAO;
import com.biglazy.resources.FormResource;
import com.biglazy.resources.JacksonTestResource;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.postgres.PostgresPlugin;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class BigLazyApplication extends Application<BigLazyConfiguration> {

    public static void main(final String[] args) throws Exception {
        new BigLazyApplication().run(args);
    }

    @Override
    public String getName() {
        return "BigLazy";
    }

    @Override
    public void initialize(final Bootstrap<BigLazyConfiguration> bootstrap) {
        bootstrap.addBundle(new CorsBundle<BigLazyConfiguration>());
    }

    @Override
    public void run(final BigLazyConfiguration configuration,
                    final Environment environment) {

//        Jdbi jdbi = Jdbi.create(configuration.getDatabase());
//        jdbi.installPlugin(new SqlObjectPlugin());
//        jdbi.installPlugin(new PostgresPlugin());
//
//        try(Handle handle = jdbi.open()) {
//            ProtocolDAO protocolDAO = handle.attach(ProtocolDAO.class);
//            EvaluationDAO evaluationDAO = handle.attach(EvaluationDAO.class);
//            DayDAO dayDAO = handle.attach(DayDAO.class);
//
//            protocolDAO.create();
//            evaluationDAO.create();
//            dayDAO.create();
//        }
        System.out.println(configuration.getDatabase());

        ConnectionString connectionString = new ConnectionString(configuration.getDatabase());
        MongoClient mongoClient = MongoFactory.client(connectionString);

        final FormResource resource = new FormResource(mongoClient);
        environment.jersey().register(resource);

        final JacksonTestResource jacksonTestResource = new JacksonTestResource();
        environment.jersey().register(jacksonTestResource);
    }

}
