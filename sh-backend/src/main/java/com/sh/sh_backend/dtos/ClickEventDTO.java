package com.sh.sh_backend.dtos;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ClickEventDTO {
    private LocalDate clickDate;
    private Long count;
}
