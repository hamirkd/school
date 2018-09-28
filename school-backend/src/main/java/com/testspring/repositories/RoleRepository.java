package com.testspring.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.testspring.models.Role;

@Repository
public interface RoleRepository  extends MongoRepository<Role, String> {
	public Role findRoleByNom(String nom);
}
