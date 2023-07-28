package com.binod.portfolio.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DisplayController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/moviefinder")
    public String aboutUs() {
        return "html/moviefinder";
    }

    @GetMapping("/notetaker")
    public String accessory() {
        return "html/notetaker";
    }

    @GetMapping("/weather")
    public String admin() {
        return "html/weather";
    }

}
