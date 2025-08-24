package com.sh.sh_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.sh.sh_backend.model")

public class ShBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShBackendApplication.class, args);
	}
}
