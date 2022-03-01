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
    @Select("select kes.id,ei_id,ks_date,js_date,round(DATEDIFF(ks_date,ei.birthday)/365,2) as age,round(DATEDIFF(js_date,ks_date)/365,2) as " +
            "duration,experience_stage,experience,job,full_name,secondary_unit from " +
            "key_experience_score kes left join essential_info ei on kes.ei_id=ei.id")
    List<KeyExperienceScore> getList();

    @Select("update key_experience_score set ei_id=#{eiId},ks_date=#{ksDate},js_date=#{jsDate}," +
            "age=#{age},experience_stage=#{experienceStage},job=#{job},experience=#{experience} " +
            "where id=#{id}")
    void update(int id,int eiId,String ksDate,String jsDate,String age,String experienceStage,String job,String experience);
}
