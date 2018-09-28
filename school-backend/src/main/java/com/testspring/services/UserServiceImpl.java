package com.testspring.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.testspring.models.Cour;
import com.testspring.models.Role;
import com.testspring.models.User;
import com.testspring.repositories.RoleRepository;
import com.testspring.repositories.UserRepository;

@Service
@Transactional

public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public User authentification(String id,String login,String password) {
		// TODO Auto-generated method stub
		if(id!=null)return userRepository.findById(id).get();
		return userRepository.findByLoginAndPassword(login,password);
	}

	@Override
	public List<User> listeDesUtilisateurs(Sort sortBy) {

		return userRepository.findAll(sortBy);
	}

	@Override
	public User creerCompte(User user) {

		return userRepository.save(user);
	}

	@Override
	public User getUserByLogin(String login) {
		// TODO Auto-generated method stub
		return userRepository.findByLogin(login);
	}
	@Override
	public User getUserById(String id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id).get();
	}
	@Override
	public boolean isGetRole(Role role) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isGetRole(String nom) {
		
		return false;
	}
	@Override
	public User addCour(Cour cour) {
		String id=cour.getUser().getId();
		cour.setUser(null);
		return userRepository.findById(id)
                .map(userData -> {
                	userData.addCour(cour);
                    User updatedUser = userRepository.save(userData);
                    return ResponseEntity.ok().body(updatedUser);
                }).orElse(ResponseEntity.notFound().build()).getBody();
	}
	@Override
	public Cour removeCour(Cour cour) {
		return userRepository.findById(cour.getUser().getId())
                .map(userData -> {
                	System.out.println("Deleting cour in user = "+userData.removeCour(cour));
                    userRepository.save(userData);
                    return ResponseEntity.ok().body(cour);
                }).orElse(ResponseEntity.notFound().build()).getBody();
	}

	@Override
	public User modifyCour(Cour cour) {
		return addCour(removeCour(cour));
	}
	@Override
	public User modifyUser(String id,User user) {
		// TODO Auto-generated method stub
		return userRepository.findById(id)
                .map(userData -> {
                	userData.setUser(user);
                    User updatedUser = userRepository.save(userData);
                    return ResponseEntity.ok().body(updatedUser);
                }).orElse(ResponseEntity.notFound().build()).getBody();
	}
	
	@Override
	public boolean deleteUser(String id) {
		userRepository.deleteById(id);
		return true;
	}
	
}
