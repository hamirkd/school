package com.testspring.services;

import java.util.List;
import java.util.Set;

import com.testspring.models.Role;;

public interface RoleService {

	public List<Role>getRoles();
	
	public Set<Role>getRoles(Set<String> roles);

	public Role createRole(String nom);
	
	public Role createRole(Role role);
	
	public Role findRole(String nom);
	
}
