package com.zyc.musicapi.dao;

import com.zyc.musicapi.po.music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import javax.annotation.Resource;

@Resource
public interface musicRepository extends JpaRepository<music, Long>, JpaSpecificationExecutor<music> {

}
