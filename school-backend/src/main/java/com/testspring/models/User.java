package com.testspring.models;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Document(collection = "users")
@JsonIgnoreProperties(value = { "createdAt" }, allowGetters = true)
public class User {
	@Id
	private String id;

	@NotBlank
	@Size(max = 100)
	@Indexed(unique = true)
	private String login;

	private String password;

	private Date createdAt;

	@DBRef
	@Field("roles")
	private Set<Role> roles;

	@Field("cours")
	private List<Cour> cours;

	public User(String id, String login, String password) {
		this.id = id;
		this.login = login;
		this.password = password;
		createdAt = new Date();
	}

	public String getId() {
		return id;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public String getLogin() {
		return login;
	}

	public Cour addCour(Cour cour) {
		if (cours == null)
			cours = new ArrayList<Cour>();
		cours.add(cour);
		return cour;
	}

	public boolean removeCour(Cour cour) {
		if (cours == null)
			cours = new ArrayList<Cour>();
		for (Cour c : cours) {
			if (c.getId().compareTo(cour.getId())==0) {
				cours.remove(c);return true;}
			else
				System.out.println("c.getId() == cour.getId()"+"<=>"+c.getId()+"="+cour.getId());
		}
		return false;
	}

	public void setCours(List<Cour> cours) {
		this.cours = cours;
	}

	public List<Cour> getCours() {
		return cours;
	}

	public Set<String> getRoles() {
		Set<String> ros = new HashSet<>();
		for (Role r : roles)
			ros.add(r.getNom());
		return ros;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public boolean isGetRole(String role) {
		return roles.contains(role);
	}

	public static User getCopy(User user) {
		return new User(user.id, user.login, user.password);
	}

	public void setUser(User user) {
		this.id=user.id;
		if(user.login!=null)
		this.login=user.login;
		if(user.password!=null)
		this.password=user.password;
		if(user.roles!=null)
		this.roles=user.roles;
	}
	
	@Override
	public String toString() {
		return String.format("User[login:%s]", login);
	}
}
