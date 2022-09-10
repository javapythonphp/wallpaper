package com.zyc.musicapi.service;

import com.zyc.musicapi.dao.recommendMusicRepository;
import com.zyc.musicapi.po.music;
import com.zyc.musicapi.po.recommendMusic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class recommendMusicServiceImpl implements recommendMusicService{

    private recommendMusicRepository m1;
    @Autowired
    public void setM1(recommendMusicRepository m1) {
        this.m1 = m1;
    }

    @Override
    public void saveAll(List<recommendMusic> list) {
        m1.saveAll(list);
    }

    @Override
    public void deleteAll() {
        m1.deleteAll();
    }

    @Override
    public List<recommendMusic> findAll() {
        return m1.findAll();
    }
}
