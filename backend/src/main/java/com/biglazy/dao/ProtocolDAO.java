package com.biglazy.dao;

import com.biglazy.api.Protocol;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

public interface ProtocolDAO {
    @SqlUpdate("CREATE TABLE IF NOT EXISTS protocol (id SERIAL, theme VARCHAR, name VARCHAR, organ VARCHAR, radio_radiochimiottt VARCHAR, dayOneEquals INTEGER);")
    void create();

    @SqlUpdate("INSERT INTO protocol (theme, name, organ, radio_radiochimiottt, dayOneEquals) VALUES (:theme, :name, :organ, :radio_radiochimiottt, :dayOneEquals)")
    @GetGeneratedKeys("id")
    int insert(@BindBean Protocol protocol);


}
