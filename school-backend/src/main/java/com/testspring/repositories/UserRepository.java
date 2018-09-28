package com.testspring.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.testspring.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	public User findByLoginAndPassword(String login,String password);
	public User findByLogin(String login);
}
