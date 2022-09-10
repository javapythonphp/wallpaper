package com.zyc.musicapi.service;

import com.zyc.musicapi.po.music;
import com.zyc.musicapi.po.recommendMusic;

import java.util.List;

public interface musicService {
    public void saveAll(List<music> list);
    public void deleteAll();
    public List<music> findAll();
}
