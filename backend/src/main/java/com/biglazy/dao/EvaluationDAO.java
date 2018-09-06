package com.biglazy.dao;

import com.biglazy.api.Evaluation;
import com.biglazy.api.Protocol;
import org.jdbi.v3.sqlobject.CreateSqlObject;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

public interface EvaluationDAO {

    @SqlUpdate("CREATE TABLE IF NOT EXISTS evaluation (id SERIAL, protocol_id INTEGER, delay INTEGER, dayAfter INTEGER, imagery BOOLEAN, consultation BOOLEAN)")
    void create();

    @SqlUpdate("INSERT INTO evaluation (protocol_id, delay, dayAfter, imagery, consultation) VALUES (:protocol_id, :delay, :dayAfter, :imagery, :consultation)")
    void insert(@BindBean Evaluation evaluation);


    @SqlQuery("SELECT * FROM evaluation;")
    @RegisterBeanMapper(Evaluation.class)
    List<Evaluation> listEvaluations();
}
