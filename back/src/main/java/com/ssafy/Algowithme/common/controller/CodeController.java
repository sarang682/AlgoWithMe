package com.ssafy.Algowithme.common.controller;


import com.ssafy.Algowithme.common.dto.request.ExecuteRequest;
import com.ssafy.Algowithme.common.dto.request.SaveCodeRequest;
import com.ssafy.Algowithme.common.dto.response.ExecutionResponse;
import com.ssafy.Algowithme.common.service.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/code")
@RequiredArgsConstructor
public class CodeController {

    private final CodeService codeService;

    @PostMapping("/save")
    public ResponseEntity<String> savePersonalCode(@RequestBody SaveCodeRequest request) {
        codeService.savePersonalCode(request);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/execute")
    public ResponseEntity<ExecutionResponse> execute(@RequestBody ExecuteRequest request) {
        return ResponseEntity.ok(codeService.executeCode(request));
    }

}
