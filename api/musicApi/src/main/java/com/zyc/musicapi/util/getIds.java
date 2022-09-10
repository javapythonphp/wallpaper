package com.zyc.musicapi.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class getIds {
    public static List<String> getAllId(){
        String url = "http://localhost:3000/playlist/detail?id=5402755367";
        String content = getMusic.loadJson(url);
        List<String> musicIds = new ArrayList<>();
        JSONArray listArray = (JSONArray) (((JSONObject)((JSONObject) JSON.parseObject(content).get("playlist"))).get("trackIds"));
        for (int i = 0; i < listArray.size(); i++) {
            JSONObject id = (JSONObject) listArray.get(i);
            musicIds.add(id.get("id").toString());
        }
        return musicIds;
    }
}
