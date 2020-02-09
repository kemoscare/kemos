package com.biglazy.health;

import com.biglazy.MongoFactory;
import com.codahale.metrics.health.HealthCheck;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCursor;

import java.util.ArrayList;
import java.util.List;

public class DatabaseHealthCheck extends HealthCheck {

    private final static MongoFactory mongoFactory = new MongoFactory();
    private final ConnectionString connectionString;

    public DatabaseHealthCheck(ConnectionString connectionString) {
        this.connectionString = connectionString;
    }


    @Override protected Result check() throws Exception {
        try {
            List<String> databases = new ArrayList<>();
            MongoClient client = MongoFactory.client(this.connectionString);
            MongoCursor<String> cursor = client.listDatabaseNames().iterator();
            while(cursor.hasNext()) {
                databases.add(cursor.next());
            }

            if(databases.size() > 0) {
                return Result.healthy("Databases are : " + databases);
            } else {
                return Result.unhealthy("No database found, check connection");
            }

        } catch (Exception e) {
            return Result.unhealthy(e);
        }
    }
}
