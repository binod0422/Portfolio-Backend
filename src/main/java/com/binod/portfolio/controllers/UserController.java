package com.binod.portfolio.controllers;


import com.binod.portfolio.entities.User;
import com.binod.portfolio.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Iterable<User>> getUser(){
        return ResponseEntity.ok(userService.getUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user){
        User addUser = userService.addUser(user);
        User savedUser = userService.addUser(user);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/user/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity.status(HttpStatus.CREATED).body(addUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User>  updatedPlayer(@PathVariable Integer id, @RequestBody User updates){
        return ResponseEntity.ok(userService.updateUser(id, updates));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HashMap<String, Object>> deleteUser(@PathVariable Integer id){

        HashMap<String, Object> responseMap = userService.deleteUser(id);

        if(responseMap.get("userInfo") == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }

        return ResponseEntity.ok(responseMap);
    }


}
