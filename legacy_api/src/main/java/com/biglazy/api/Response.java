package com.biglazy.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.Document;

import java.util.List;

public class Response {
    private ResourceType resourceType;
    private ResourceType linksTo;
    private ResourceType linksFrom;
    @JsonProperty("isFinal") private Boolean isFinal;
    private List<Document> resources;

    public Response(ResourceType resourceType, ResourceType linksTo, ResourceType linksFrom, List<Document> resources) {
        this.resourceType = resourceType;
        this.linksTo = linksTo;
        this.linksFrom = linksFrom;
        this.resources = resources;
        this.isFinal = false;
    }

    public Response(ResourceType resourceType, ResourceType linksTo, ResourceType linksFrom, List<Document> resources, Boolean isFinal) {
        this.resourceType = resourceType;
        this.linksTo = linksTo;
        this.linksFrom = linksFrom;
        this.isFinal = isFinal;
        this.resources = resources;
    }

    public ResourceType getResourceType() {
        return resourceType;
    }

    public void setResourceType(ResourceType resourceType) {
        this.resourceType = resourceType;
    }

    public ResourceType getLinksTo() {
        return linksTo;
    }

    public void setLinksTo(ResourceType linksTo) {
        this.linksTo = linksTo;
    }

    public ResourceType getLinksFrom() {
        return linksFrom;
    }

    public void setLinksFrom(ResourceType linksFrom) {
        this.linksFrom = linksFrom;
    }

    public List<Document> getResources() {
        return resources;
    }

    public void setResources(List<Document> resources) {
        this.resources = resources;
    }

    public Boolean getFinal() {
        return isFinal;
    }

    public void setFinal(Boolean aFinal) {
        isFinal = aFinal;
    }
}
