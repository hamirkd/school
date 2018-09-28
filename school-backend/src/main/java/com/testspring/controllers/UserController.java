package com.testspring.controllers;

import javax.validation.Valid;

import com.testspring.models.Cour;
import com.testspring.models.DataU;
import com.testspring.models.Role;
import com.testspring.models.User;
import com.testspring.repositories.RoleRepository;
import com.testspring.services.CourService;
import com.testspring.services.RoleService;
import com.testspring.services.UserService;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

	@Autowired
	UserService userService;
	@Autowired
	CourService courService;
	@Autowired
	RoleService roleService;

	@GetMapping("")
	public List<User> getAllUsers() {
		Sort sortBy = new Sort(Sort.Direction.ASC, "createdAt");
		return userService.listeDesUtilisateurs(sortBy);
	}

	@PostMapping("")
	public User creerCompte(@RequestBody User user) {
		Set<Role> roles = new HashSet<>();
		for (String s : user.getRoles()) {
			System.err.println(s);
			Role role = roleService.findRole(s);
			if (role != null)
				roles.add(role);
			else {
				roles.add(roleService.createRole(s));
			}
		}
		user.setRoles(roles);
		return userService.creerCompte(user);
	}

	@PutMapping(value = "/{id}")
	public User updateUser(@PathVariable("id") String id, @Valid @RequestBody User user) {
		user.setRoles(roleService.getRoles(user.getRoles()));
		return userService.modifyUser(id, user);
	}

	@PostMapping("/login")
	public User authentification(@Valid @RequestBody DataU user) {
		User usero = userService.authentification(user.id, user.login, user.password);
		if (usero != null)
			System.out.println(usero.getCours());
		return usero;
	}
	

	@DeleteMapping(value = "/{id}")
	public boolean deleteUser(@PathVariable("id") String id) {
		return courService.deleteAllCoursOfUser(userService.getUserById(id))&&userService.deleteUser(id);
		
	}

	@GetMapping("/sort/{column}/{order}")
	public List<User> getAllUsersSort(@PathVariable("column") String column, @PathVariable("order") boolean order) {
		Sort sortBy;
		if (order)
			sortBy = new Sort(Sort.Direction.ASC, column);
		else
			sortBy = new Sort(Sort.Direction.DESC, column);
		return userService.listeDesUtilisateurs(sortBy);
	}
    
}
