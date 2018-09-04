package com.biglazy.api;

public class Protocol {

    private String name;
    private Boolean radio_radiochimiottt;
    private String theme;
    private String organ;
    private Integer dayOneEquals;

    public Integer getDayOneEquals() {
        return dayOneEquals;
    }

    public void setDayOneEquals(Integer dayOneEquals) {
        this.dayOneEquals = dayOneEquals;
    }

    public Protocol(String name, Boolean radio_radiochimiottt, String theme, String organ, Integer dayOneEqual) {
        this.name = name;
        this.radio_radiochimiottt = radio_radiochimiottt;
        this.theme = theme;
        this.organ = organ;
        this.dayOneEquals = dayOneEqual;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getRadio_radiochimiottt() {
        return radio_radiochimiottt;
    }

    public void setRadio_radiochimiottt(Boolean radio_radiochimiottt) {
        this.radio_radiochimiottt = radio_radiochimiottt;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getOrgan() {
        return organ;
    }

    public void setOrgan(String organ) {
        this.organ = organ;
    }
}
