package com.zyc.musicapi.service;

import com.zyc.musicapi.po.music;
import com.zyc.musicapi.po.recommendMusic;

import java.util.List;

public interface recommendMusicService {
    public void saveAll(List<recommendMusic> list);
    public void deleteAll();
    public List<recommendMusic> findAll();
}
