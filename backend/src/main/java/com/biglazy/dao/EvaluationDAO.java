package com.biglazy.dao;

import com.biglazy.api.Evaluation;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

public interface EvaluationDAO {
    @SqlUpdate("CREATE TABLE evaluation (id INTEGER PRIMARY KEY, delay INTEGER, dayAfter INTEGER, imagery BOOLEAN, consultation BOOLEAN)")
    void createTable();
    @SqlQuery("SELECT * FROM evaluation;")
    @RegisterBeanMapper(Evaluation.class)
    List<Evaluation> listEvaluations();
}
