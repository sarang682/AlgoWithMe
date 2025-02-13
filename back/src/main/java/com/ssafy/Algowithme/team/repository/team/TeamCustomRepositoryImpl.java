package com.ssafy.Algowithme.team.repository.team;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.Algowithme.team.dto.*;
import com.ssafy.Algowithme.user.dto.SolvedTagCountDto;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.Algowithme.page.entity.QPage.page;
import static com.ssafy.Algowithme.page.entity.QWorkspaceTag.workspaceTag;
import static com.ssafy.Algowithme.team.entity.QTeam.team;
import static com.ssafy.Algowithme.user.entity.QUser.user;
import static com.ssafy.Algowithme.user.entity.QUserTeam.userTeam;
import static com.ssafy.Algowithme.problem.entity.QProblem.problem;
import static com.ssafy.Algowithme.team.entity.QCandidateProblem.candidateProblem;
import static com.ssafy.Algowithme.user.entity.QUserProblem.userProblem;

@RequiredArgsConstructor
public class TeamCustomRepositoryImpl implements TeamCustomRepository {

  private final JPAQueryFactory jpaQueryFactory;


  @Override
  public List<SolvedTagCountDto> getSolvedTagChart(Long teamId) {
    List<Tuple> tuple = jpaQueryFactory.select(workspaceTag.tag,
            ExpressionUtils.count(workspaceTag))
        .from(team)
        .innerJoin(page).on(team.id.eq(page.team.id))
        .innerJoin(workspaceTag).on(page.id.eq(workspaceTag.workspace.id))
        .where(team.id.eq(teamId), page.deleted.eq(false))
        .groupBy(workspaceTag.tag)
        .having(workspaceTag.tag.isNotNull())
        .fetch();

    List<SolvedTagCountDto> result = new ArrayList<>();

    tuple.forEach(t -> result.add(SolvedTagCountDto.builder()
        .tag(t.get(workspaceTag.tag))
        .count(t.get(1, Long.class)).build()));

    return result;
  }

  @Override
  public List<SolvedProblemDto> getSolvedProblem(Long teamId) {
    List<SolvedProblemRawDto> solvedProblemRawDtoList =
        jpaQueryFactory.select(Projections.fields(SolvedProblemRawDto.class,
                page.id.as("pageId"),
                problem.id.as("problemId"),
                problem.url,
                problem.provider,
                problem.number,
                problem.name,
                problem.level,
                page.createdAt))
            .from(team)
            .innerJoin(page).on(team.id.eq(page.team.id))
            .innerJoin(problem).on(problem.id.eq(page.problem.id))
            .where(team.id.eq(teamId), page.deleted.eq(false))
            .orderBy(page.updatedAt.desc())
            .limit(3)
            .fetch();

    List<SolvedProblemDto> result = new ArrayList<>();

    solvedProblemRawDtoList.forEach(dto ->
        result.add(SolvedProblemDto.builder()
            .pageId(dto.getPageId())
            .problemId(dto.getProblemId())
            .url(dto.getUrl())
            .provider(dto.getProvider().getName())
            .number(dto.getNumber())
            .name(dto.getName())
            .level(dto.getLevel())
            .createdAt(dto.getCreatedAt())
            .build()));

    return result;
  }

  @Override
  public List<CandidateProblemDto> getCandidateProblem(Long teamId) {
    List<CandidateProblemRawDto> candidateProblemRawDtoList =
        jpaQueryFactory.select(Projections.bean(CandidateProblemRawDto.class,
                candidateProblem.id.as("candidateId"),
                problem.id.as("problemId"),
                problem.url,
                problem.provider,
                problem.number,
                problem.name,
                problem.level))
            .from(team)
            .innerJoin(candidateProblem).on(team.id.eq(candidateProblem.team.id))
            .innerJoin(problem).on(problem.id.eq(candidateProblem.problem.id))
            .where(team.id.eq(teamId))
            .orderBy(candidateProblem.id.asc())
            .fetch();

    List<CandidateProblemDto> result = new ArrayList<>();

    candidateProblemRawDtoList.forEach(dto ->
        result.add(CandidateProblemDto.builder()
            .candidateId(dto.getCandidateId())
            .problemId(dto.getProblemId())
            .url(dto.getUrl())
            .provider(dto.getProvider().getName())
            .name(dto.getName())
            .number(dto.getNumber())
            .level(dto.getLevel())
            .build()));

    return result;
  }

  @Override
  public List<RankDto> getRank(Long teamId) {
    return jpaQueryFactory
        .select(Projections.fields(RankDto.class,
            user.id,
            user.nickname,
            user.imageUrl,
            userProblem.count().as("solvedCount")))
        .from(team)
        .innerJoin(userTeam).on(team.id.eq(userTeam.team.id))
        .innerJoin(user).on(user.id.eq(userTeam.user.id))
        .innerJoin(userProblem).on(user.id.eq(userProblem.user.id))
        .where(team.id.eq(teamId))
        .groupBy(user.id)
        .orderBy(userProblem.count().desc())
        .fetch();
  }
}
