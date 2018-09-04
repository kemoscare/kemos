package com.biglazy.dao;

import org.jdbi.v3.sqlobject.statement.SqlUpdate;

public interface DayDAO {
    @SqlUpdate("CREATE TABLE Day (id INTEGER PRIMARY KEY, careMode VARCHAR, careGalenic VARCHAR, products VARCHAR[]);")
    void createTable();
}
