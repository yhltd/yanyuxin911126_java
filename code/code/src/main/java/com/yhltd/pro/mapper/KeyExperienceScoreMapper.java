package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.KeyExperienceScore;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/10 10:55
 */
@Mapper
public interface KeyExperienceScoreMapper extends BaseMapper<KeyExperienceScore> {
    @Select("select kes.id,ei_id,ks_date,js_date,DATEDIFF(year,ei.birthday,ks_date) as age," +
            "round(convert(float,DATEDIFF(day,ks_date,js_date))/365,1) as duration,experience_stage," +
            "isnull(experience,'') as experience,job,full_name,secondary_unit,unit_name from key_experience_score kes left join " +
            "essential_info ei on kes.ei_id=ei.id")
    List<KeyExperienceScore> getList();

    @Select("select kes.id,ei_id,ks_date,js_date,DATEDIFF(year,ei.birthday,ks_date) as age," +
            "round(convert(float,DATEDIFF(day,ks_date,js_date))/365,1) as duration,experience_stage," +
            "isnull(experience,'') as experience,job,full_name,secondary_unit,unit_name from " +
            "key_experience_score kes left join essential_info ei on kes.ei_id=ei.id where " +
            "full_name like '%'+#{fullName}+'%' and secondary_unit like '%'+#{secondaryUnit}+'%' ")
    List<KeyExperienceScore> getListByName(String fullName,String secondaryUnit);

    @Select("update key_experience_score set ei_id=#{eiId},ks_date=#{ksDate},js_date=#{jsDate}," +
            "age=#{age},experience_stage=#{experienceStage},job=#{job},experience=#{experience}, " +
            "unit_name=#{unitName} where id=#{id}")
    void update(int id, int eiId, String ksDate, String jsDate, String age, String experienceStage, String job, String experience,String unitName);
}
