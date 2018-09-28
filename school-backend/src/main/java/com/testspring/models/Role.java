package com.testspring.models;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Document(collection = "roles")
@JsonIgnoreProperties(value = { "createdAt" }, allowGetters = true)
public class Role {
	@Id
	private String id;

	@NotBlank
	@Size(max = 100)
    @Indexed(unique=true)
	private String nom;
	
	private Date createdAt;
	
	
	public Role(String nom) {
		this.nom=nom;
		this.createdAt=new Date();
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return String.format("Role[id=%s,nom=%s]", id,nom);
	}
}
