package com.zyc.musicapi.service;

import com.zyc.musicapi.dao.musicRepository;
import com.zyc.musicapi.po.music;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class musicServiceImpl implements musicService{

    private musicRepository m;
    @Autowired
    public void setM(musicRepository m) {
        this.m = m;
    }

    @Override
    public void saveAll(List<music> list) {
        m.saveAll(list);
    }

    @Override
    public void deleteAll() {
        m.deleteAll();
    }

    @Override
    public List<music> findAll() {
        return m.findAll();
    }
}
