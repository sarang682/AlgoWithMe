package com.ssafy.Algowithme.problem.repository;

import com.ssafy.Algowithme.problem.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

  List<Problem> findByNameContaining(String name);

  List<Problem> findByLevelInOrderByLevel(String[] level);
}
