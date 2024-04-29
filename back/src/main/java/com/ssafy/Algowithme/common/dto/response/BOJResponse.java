package com.ssafy.Algowithme.common.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BOJResponse {
    private int status;
    private String error;
    private List<BOJDetail> results;
}
