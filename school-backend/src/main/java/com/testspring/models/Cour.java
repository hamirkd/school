package com.testspring.models;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "cours")
@JsonIgnoreProperties(value = { "createdAt" }, allowGetters = true)
public class Cour {
	@Id
	private String id;

	@NotBlank
	@Size(max = 100)
	private String titre;

	@Size(max = 500)
	private String contenu;

	@DBRef
	@Field("users")
	private User user;

	private Date createdAt;

	private Boolean visibilite;

	public Cour(String titre, String contenu, User user, Boolean visibilite) {
		this.titre = titre;
		this.contenu = contenu;
		this.user = user;
		this.visibilite = visibilite;
		createdAt = new Date();
	}	

	public Date getCreatedAt() {
		return createdAt;
	}

	public String getId() {
		return id;
	}

	public String getContenu() {
		return contenu;
	}

	public String getTitre() {
		return titre;
	}

	public User getUser() {
		return user;
	}

	public void setContenu(String contenu) {
		this.contenu = contenu;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Boolean getVisibilite() {
		return visibilite;
	}

    @Override
    public String toString() {
    	return String.format("Cour[id:'%s',titre:'%s',contenu:'%s',user:'%s']",id,titre,contenu,user);
    }
	public void setCour(Cour cour) {
		this.contenu = cour.contenu;
		this.titre = cour.titre;
		this.visibilite = cour.visibilite;
	}
}
