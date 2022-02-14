package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Configuration;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/07 12:28
 */
@Mapper
public interface ConfigurationMapper extends BaseMapper<Configuration>{
    @Select("select department from configuration group by department")
    List<Configuration> getDepartment();

    @Select("select key_business from configuration where department=#{department} group by key_business")
    List<Configuration> getSecondaryMenu(String department);
}
