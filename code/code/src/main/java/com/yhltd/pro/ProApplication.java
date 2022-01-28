package com.yhltd.pro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.yhltd"})
public class ProApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProApplication.class, args);
    }
}
