package com.binod.portfolio.services;

import com.binod.portfolio.entities.User;
import com.binod.portfolio.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + id);
        }

        return optionalUser.get();
    }

    public User addUser(@Valid User user) {
        return userRepository.save(user);
    }

    public User updateUser(Integer id, @Valid User updates) {
        User userToUpdate = getUserById(id);

        if (updates.getName() != null && !updates.getName().isEmpty()) {
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
            responseMap.put("wasDeleted", false);
            responseMap.put("userInfo", null);
            responseMap.put("message", "User not found with id: " + id);
            return responseMap;
        }

        userRepository.deleteById(id);
        responseMap.put("wasDeleted", true);
        responseMap.put("userInfo", optionalUser.get());
        responseMap.put("message", "User with id: " + id + " has been deleted successfully.");
        return responseMap;
    }
}
