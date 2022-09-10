package com.zyc.musicapi.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zyc.musicapi.po.music;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class getDetails {
    public static List<music> getAllDetails(List<String> ids){
        List<music> list = new ArrayList<>();
        for (int i = 0; i < ids.size(); i++) {
            String id = ids.get(i);
            Map<String,String> map = getNameAndArtistAndPic(id);
            music m = new music();
            m.setMusicId(id);
            m.setName(map.get("name"));
            m.setArtist(map.get("artist"));
            m.setPic(map.get("pic"));
            m.setUrl(getUrl(id));
            m.setLrc(getLyric(id));
            if(m!=null)
                list.add(m);
            System.out.println(map.get("name"));
        }
        return list;
    }



    public static String getLyric(String id){
        String lyric = "";
        try{
            String url = "http://localhost:3000/lyric?id="+id;
            String content = getMusic.loadJson(url);
            JSONObject jsonObject = JSON.parseObject(content);
            lyric = (String) ((JSONObject)(jsonObject.get("lrc"))).get("lyric");
        }catch (Exception e){
            lyric = "";
        }
        return lyric;
    }

    public static String getUrl(String id){
        String url = "http://localhost:3000/song/url?id="+ id +"&br=999000";
        String content = getMusic.loadJson(url);
        JSONObject jsonObject = JSON.parseObject(content);
        JSONArray jsonArray = (JSONArray) jsonObject.get("data");
        String musicUrl = (String) ((JSONObject)jsonArray.get(0)).get("url");
        return musicUrl;
    }


    public static Map<String,String> getNameAndArtistAndPic(String id){
        Map<String,String> map = new HashMap<>();

        try{
            String url = "http://localhost:3000/song/detail?ids="+id;
            String content = getMusic.loadJson(url);
            JSONObject jsonObject = JSON.parseObject(content);
            JSONObject jsonObject1 = (JSONObject) ((JSONArray)jsonObject.get("songs")).get(0);

            String name = (String) jsonObject1.get("name");

            JSONObject jsonObject2 = ((JSONObject)((JSONArray)jsonObject1.get("ar")).get(0));
            String artist = (String) jsonObject2.get("name");

            String pic = (String) ((JSONObject)jsonObject1.get("al")).get("picUrl");

            map.put("name",name);
            map.put("artist",artist);
            map.put("pic",pic);
        }catch (Exception e){
            map.put("name","none");
            map.put("artist","none");
            map.put("pic","none");
        }

        return map;
    }

    @Deprecated
    public static Map<String,String> getNameAndArtistAndPicByOtherApi(String id){
        Map<String,String> map = new HashMap<>();

        try{
            String url = "https://api.imjad.cn/cloudmusic/?type=detail&id="+id;
            String content = getMusic.loadJson(url);
            JSONObject jsonObject = JSON.parseObject(content);
            JSONObject jsonObject1 = (JSONObject) ((JSONArray)jsonObject.get("songs")).get(0);

            String name = (String) jsonObject1.get("name");

            JSONObject jsonObject2 = ((JSONObject)((JSONArray)jsonObject1.get("ar")).get(0));
            String artist = (String) jsonObject2.get("name");

            String pic = (String) ((JSONObject)jsonObject1.get("al")).get("picUrl");

            map.put("name",name);
            map.put("artist",artist);
            map.put("pic",pic);
        }catch (Exception e){
            map.put("name","none");
            map.put("artist","none");
            map.put("pic","none");
        }

        return map;
    }


    public static void main(String[] args) {

        System.out.println(getNameAndArtistAndPic("1324502515"));
    }

}
