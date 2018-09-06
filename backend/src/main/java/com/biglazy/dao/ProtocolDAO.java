package com.biglazy.dao;

import org.jdbi.v3.sqlobject.statement.SqlUpdate;

public interface ProtocolDAO {
    @SqlUpdate("CREATE TABLE protocol (id INTEGER PRIMARY KEY, theme VARCHAR, name VARCHAR, organ VARCHAR, radio_radiochimiottt VARCHAR, dayOneEquals INTEGER);")
    void createTable();


}
