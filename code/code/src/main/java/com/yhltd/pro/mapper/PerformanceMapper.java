package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.Performance;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:16
 */
@Mapper
public interface PerformanceMapper extends BaseMapper<Performance> {
    /**
     * 查询所有基本信息
     *
     * @return 基本信息list
     */
    @Select("select p.id,ei_id,nian,ei.full_name as full_name,ei.secondary_unit as secondary_unit," +
            "score,grade from performance as p left join essential_info as ei on ei.id=p.ei_id")
    List<Performance> getList();

    /**
     * 查询所有基本信息
     *
     * @param fullName 姓名
     * @return 基本信息list
     */
    @Select("select p.id,ei_id,nian,ei.full_name as full_name,ei.secondary_unit as secondary_unit," +
            "score,grade from performance as p left join essential_info as ei on ei.id=p.ei_id " +
            "where ei.full_name like '%'+#{fullName}+'%' and ei.secondary_unit like '%'+#{secondaryUnit}+'%' ")
    List<Performance> getListByName(String fullName,String secondaryUnit);

    @Select("update performance set nian=#{nian},ei_id=#{eiId}" +
            ",score=#{score},grade=#{grade} where id=#{id}")
    void update(Integer id, String nian, Integer eiId, Double score, String grade);
}
