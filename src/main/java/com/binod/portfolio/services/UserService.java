package com.binod.portfolio.services;


import com.binod.portfolio.entities.User;
import com.binod.portfolio.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> getUser() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + id);
        }

        return optionalUser.get();
    }


    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Integer id, User updates) {
        User userToUpdate = getUserById(id);

        if (!updates.getName().isEmpty()) {
            userToUpdate.setName(updates.getName());
        }
        if (updates.getEmail() != null) {
            userToUpdate.setEmail(updates.getEmail());
        }
        if (updates.getMessage() != null) {
            userToUpdate.setMessage(updates.getMessage());
        }
        return userRepository.save(userToUpdate);
    }


    public HashMap<String, Object> deleteUser(Integer id) {
        HashMap<String, Object> responseMap = new HashMap<>();

        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
//            if the player does not exist, this is what will be returned
            responseMap.put("wasDeleted", false);
            responseMap.put("userInfo", null);
            responseMap.put("Message", "User not found with id: " + id);
            return responseMap;
        }

        responseMap.put("wasDeleted", true);
        responseMap.put("userInfo", optionalUser.get());

        return responseMap;
    }

}



