package com.biglazy.dao;

import com.biglazy.api.Day;
import com.biglazy.api.Protocol;
import org.jdbi.v3.sqlobject.CreateSqlObject;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

public interface DayDAO {

    @SqlUpdate("CREATE TABLE IF NOT EXISTS day (id SERIAL, protocol_id INTEGER, careMode VARCHAR, careGalenic VARCHAR, products VARCHAR[]);")
    void create();

    @SqlUpdate("INSERT INTO day (protocol_id, careMode, careGalenic, products) VALUES (:protocol_id, :careMode, :careGalenic, :products)")
    void insert(@BindBean Day day);


}
