package com.sh.sh_backend.controllers;

import com.sh.sh_backend.dtos.ClickEventDTO;
import com.sh.sh_backend.dtos.UrlMappingDTO;
import com.sh.sh_backend.model.User;
import com.sh.sh_backend.service.UrlMappingService;
import com.sh.sh_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/urls")
@AllArgsConstructor
public class UrlMappingController {
    @Autowired
    private UrlMappingService urlMappingService;
    private UserService userService;


     @PostMapping("/shorten")
     @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> createShortUrl(@RequestBody Map<String,String> request, Principal principal){

         String originalUrl = request.get("originalUrl");
         User user =  userService.findByUsername(principal.getName());
         //call service
         UrlMappingDTO urlMappingDto = urlMappingService.createShortUrl(originalUrl,user);
         return ResponseEntity.ok(urlMappingDto);
     }

    @GetMapping("/myUrls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal){
        User user =  userService.findByUsername(principal.getName());
        List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                               @RequestParam("startDate")String startDate
                                                               , @RequestParam("EndDate")String EndDate){

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start  = LocalDateTime.parse(startDate,formatter);
        LocalDateTime end  = LocalDateTime.parse(EndDate,formatter);
        List<ClickEventDTO>clickEventDtos=urlMappingService.getClickEventByDate(shortUrl,start,end);
        return ResponseEntity.ok(clickEventDtos);
    }

    @GetMapping("/totalClick")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate,Long>> getTotalClicksByDates(Principal principal,
                                                                     @RequestParam("startDate")String startDate
                                                                     ,@RequestParam("EndDate")String EndDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        User user = userService.findByUsername(principal.getName());
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(EndDate, formatter);
        Map<LocalDate, Long> totalClick = urlMappingService.getTotalClicksByUserAndDate(user, start, end);
        return ResponseEntity.ok(totalClick);
    }

}
