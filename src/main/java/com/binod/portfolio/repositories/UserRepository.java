package com.binod.portfolio.repositories;

import org.springframework.data.repository.CrudRepository;
import com.binod.portfolio.entities.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>{

}
