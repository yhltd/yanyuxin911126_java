package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.EssentialInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/27 12:55
 */
@Mapper
public interface EssentialInfoMapper extends BaseMapper<EssentialInfo> {
    /**
     * 查询所有基本信息
     *
     * @return 基本信息list
     */
    @Select("select id,full_name,sex,birthday,ROUND(DATEDIFF(CURDATE(), birthday)/365.2422) as age" +
            ",riqi,education,post,department1,level,secondary_unit,department2 from " +
            "essential_info")
    List<EssentialInfo> getList();

    /**
     * 查询所有基本信息
     * @param fullName 姓名
     * @return 基本信息list
     */
    @Select("select id,full_name,sex,birthday,ROUND(DATEDIFF(CURDATE(), birthday)/365.2422) as age" +
            ",riqi,education,post,department1,level,secondary_unit,department2 from " +
            "essential_info where full_name like \"%\" #{fullName} \"%\" ")
    List<EssentialInfo> getListByName(String fullName);
}
