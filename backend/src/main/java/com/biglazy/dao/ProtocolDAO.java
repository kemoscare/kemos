package com.biglazy.dao;

import org.jdbi.v3.sqlobject.statement.SqlUpdate;

public interface ProtocolDAO {
    @SqlUpdate("CREATE TABLE protocol (id INTEGER PRIMARY KEY, theme VARCHAR, name VARCHAR, organ VARCHAR);")
    void createTable();


}
