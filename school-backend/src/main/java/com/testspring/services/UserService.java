package com.testspring.services;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.testspring.models.Cour;
import com.testspring.models.Role;
import com.testspring.models.User;

public interface UserService {

	public List<User> listeDesUtilisateurs(Sort sortBy);

	public User authentification(String id,String login,String password);
	
	public User creerCompte(User user);

	public User getUserByLogin(String login);
	
	public User getUserById(String id);
	
	public User addCour(Cour cour);
	
	public User modifyUser(String id,User user);

	public boolean isGetRole(String nom);
	
	public boolean isGetRole(Role role);

	public Cour removeCour(Cour cour);
	
	public User modifyCour(Cour cour);
	
	public boolean deleteUser(String id);
}
