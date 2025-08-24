package com.sh.sh_backend.dtos;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UrlMappingDTO {
    private Long id;
    private String originalUrl;   // fixed spelling
    private String shortUrl;
    private int clickCount;       // fixed field name
    private LocalDateTime createdDate;
    private String username;


}
