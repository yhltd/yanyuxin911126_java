package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.KeyExperienceConfig;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/09 14:39
 */
@Mapper
public interface KeyExperienceConfigMapper extends BaseMapper<KeyExperienceConfig> {
    /**
     *  查询
     */
    @Select("select * from key_experience_config where unit like \"%\" #{unit} \"%\" ")
    List<KeyExperienceConfig> getListByUnit(String unit);

    /**
     *  查询
     */
    @Select("select * from key_experience_config where level !='' and level is not null")
    List<KeyExperienceConfig> getListByDepartment1(String department1);
}
