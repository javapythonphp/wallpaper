package com.zyc.musicapi.controller;

import com.zyc.musicapi.po.music;
import com.zyc.musicapi.po.recommendMusic;
import com.zyc.musicapi.service.musicService;
import com.zyc.musicapi.service.recommendMusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.zyc.musicapi.util.*;
import java.util.List;

@Controller
public class main {

    private musicService m;
    @Autowired
    public void setM(musicService m) {
        this.m = m;
    }

    private recommendMusicService m1;
    @Autowired
    public void setM1(recommendMusicService m1) {
        this.m1 = m1;
    }

    @CrossOrigin
    @ResponseBody
    @GetMapping("/saveDetails")
    public List<music> getAllIds(){
        m.deleteAll();
        List<music> list = getDetails.getAllDetails(getIds.getAllId());
        m.saveAll(list);
        return list;
    }

    @CrossOrigin
    @ResponseBody
    @GetMapping("/findDetails")
    public List<music> findDetails(){
        return m.findAll();
    }

    @Deprecated
    @ResponseBody
    @GetMapping("/saveRecommends")
    public List<music> saveRecommends(){

        return null;
    }

    @Deprecated
    @ResponseBody
    @GetMapping("/findRecommends")
    public List<recommendMusic> findRecommends(){
        return m1.findAll();
    }

    @GetMapping("/index")
    public String go(){
        return "index";
    }
}
