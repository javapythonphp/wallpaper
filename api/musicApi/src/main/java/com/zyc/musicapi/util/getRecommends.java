package com.zyc.musicapi.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zyc.musicapi.po.recommendMusic;

import java.util.ArrayList;
import java.util.List;

/*需要登录*/
@Deprecated
public class getRecommends {

    public static List<recommendMusic> getAllRecommends(){
        List<recommendMusic> list = new ArrayList<>();
        getMusic.loadJson("http://localhost:3000/login/cellphone?phone=19936011950&password=lk623542797za2525");
        String url = "http://localhost:3000/recommend/songs";
        String content = getMusic.loadJson(url);
        JSONObject jsonObject = JSON.parseObject(content);
        System.out.println(jsonObject);
        JSONArray re = (JSONArray) ((JSONObject)jsonObject.get("data")).get("dailySongs");
        for (int i = 0; i < re.size(); i++) {
            System.out.println(re.get(i));
        }
        return null;
    }

    public static void main(String[] args) {
        getAllRecommends();
    }

}
