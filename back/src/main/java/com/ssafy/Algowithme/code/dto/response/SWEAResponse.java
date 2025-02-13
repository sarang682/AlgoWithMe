package com.ssafy.Algowithme.code.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SWEAResponse {

  private int status;
  private String input;
  private String expected;
  private String got;
  private boolean passed;
  private int test_case;
  private int matches;
  private int execution_time;
  private List<SWEADetail> details;
}
