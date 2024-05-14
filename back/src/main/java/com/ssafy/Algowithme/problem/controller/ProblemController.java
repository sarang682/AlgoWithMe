package com.ssafy.Algowithme.problem.controller;

import com.ssafy.Algowithme.problem.dto.response.AllProblemResponse;
import com.ssafy.Algowithme.problem.dto.response.ProblemByTagsResponse;
import com.ssafy.Algowithme.problem.dto.response.ProblemByTitleResponse;
import com.ssafy.Algowithme.problem.dto.response.RawProblemResponse;
import com.ssafy.Algowithme.problem.service.ProblemService;
import com.ssafy.Algowithme.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService problemService;

    @GetMapping("/all")
    @Operation(summary = "문제 리스트 조회", description = "요약된 문제 정보 리스트를 반환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = {@Content(schema = @Schema(implementation = AllProblemResponse.class))}),
            @ApiResponse(responseCode = "500", description = "조회 실패")
    })
    public ResponseEntity<AllProblemResponse> getAllProblem() {
        return problemService.getAll();
    }

    @GetMapping("/{pageId}")
    @Operation(summary = "문제 세부정보 조회", description = "페이지 아이디로 문제의 세부정보를 반환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = {@Content(schema = @Schema(implementation = RawProblemResponse.class))}),
            @ApiResponse(responseCode = "1400", description = "조회 실패")
    })
    public ResponseEntity<RawProblemResponse> getProblem(@PathVariable("pageId") Long pageId) {
        return ResponseEntity.ok(problemService.getProblem(pageId));
    }

    @GetMapping("/search")
    @Operation(summary = "문제 제목 조회", description = "문제의 제목으로 문제 리스트를 반환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = {@Content(schema = @Schema(implementation = ProblemByTitleResponse.class))}),
            @ApiResponse(responseCode = "400", description = "조회 실패")
    })
    public ResponseEntity<ProblemByTitleResponse> getProblemByTitle(@RequestParam("title") String title, @RequestParam("page") int page) {
        return ResponseEntity.ok(problemService.getProblemByTitle(title, page));
    }

    @GetMapping("/search/tag")
    @Operation(summary = "문제 태그 조회", description = "문제의 태그로 문제 리스트를 반환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = {@Content(schema = @Schema(implementation = ProblemByTagsResponse.class))}),
            @ApiResponse(responseCode = "400", description = "조회 실패")
    })
    public ResponseEntity<ProblemByTagsResponse> getProblemByTag(@RequestParam("levels") String levels, @RequestParam("page") int page) {
        return ResponseEntity.ok(problemService.getProblemByTag(levels, page));
    }

    @PostMapping("/{problemId}/solution")
    @Operation(summary = "제출한 이력 기록", description = "유저가 해당 문제를 풀었던 시간을 기록한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "기록 성공"),
            @ApiResponse(responseCode = "400", description = "기록 실패")
    })
    public ResponseEntity<ProblemByTagsResponse> storeProblemSolvingHistory(@AuthenticationPrincipal User user, @PathVariable("problemId") Long problemId) {
        problemService.storeProblemSolvingHistory(user, problemId);
        return ResponseEntity.ok().build();
    }


}
