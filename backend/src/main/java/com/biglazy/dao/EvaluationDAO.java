package com.biglazy.dao;

import org.jdbi.v3.sqlobject.statement.SqlUpdate;

public interface EvaluationDAO {
    @SqlUpdate("CREATE TABLE evaluation (id INTEGER PRIMARY KEY, delay INTEGER, dayAfter INTEGER, imagery BOOLEAN, consultation BOOLEAN)")
    void createTable();
}
