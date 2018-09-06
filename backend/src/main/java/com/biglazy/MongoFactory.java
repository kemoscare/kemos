package com.biglazy;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class MongoFactory {

    private static MongoClient factoryContainer = null;

    public static MongoClient client() {

        if(factoryContainer == null) {
            CodecRegistry pojoCodecRegistry =
                    fromRegistries(MongoClientSettings.getDefaultCodecRegistry(), fromProviders(PojoCodecProvider.builder().automatic(true).build()));

            MongoClientSettings settings = MongoClientSettings.builder()
                    .codecRegistry(pojoCodecRegistry)
                    .build();

            MongoClient mongoClient = MongoClients.create(settings);
            factoryContainer = mongoClient;
        }

        return factoryContainer;
    }
}