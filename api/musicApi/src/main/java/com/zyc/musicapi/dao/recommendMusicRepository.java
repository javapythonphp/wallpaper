package com.zyc.musicapi.dao;

import com.zyc.musicapi.po.recommendMusic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import javax.annotation.Resource;

@Resource
public interface recommendMusicRepository extends JpaRepository<recommendMusic,Long>, JpaSpecificationExecutor<recommendMusic> {

}
