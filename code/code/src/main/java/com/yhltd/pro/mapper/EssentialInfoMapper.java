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
    @Select("select id,full_name,sex,birthday,DATEDIFF(YEAR,birthDay,GETDATE()) as age" +
            ",riqi,education,post,department1,level,secondary_unit,department2 from " +
            "essential_info")
    List<EssentialInfo> getList();

    /**
     * 查询所有基本信息
     *
     * @param fullName 姓名
     * @return 基本信息list
     */
    @Select("select id,full_name,sex,birthday,DATEDIFF(YEAR,birthDay,GETDATE()) as age" +
            ",riqi,education,post,department1,level,secondary_unit,department2 from " +
            "essential_info where full_name like '%'+#{fullName}+'%' and department2 like '%'+#{department}+'%' ")
    List<EssentialInfo> getListByName(String fullName,String department);

    /**
     * 查询基本信息id
     *
     * @param fullName 姓名
     * @return 基本信息list
     */
    @Select("select top 1 id from essential_info where full_name = #{fullName} and secondary_unit " +
            "=#{secondaryUnit}")
    List<EssentialInfo> getEiId(String fullName, String secondaryUnit);

    /**
     * 查询基本信息id
     *
     * @param fullName 姓名
     * @return 基本信息list
     */
    @Select("select top 1 id from essential_info where full_name = #{fullName} and department1 " +
            "=#{department1} and department2=#{department2}")
    List<EssentialInfo> getEiId2(String fullName, String department2, String department1);

    /**
     * 查询基本信息id
     *
     * @param fullName 姓名
     * @return 基本信息list
     */
    @Select("select top 1 id from essential_info where full_name = #{fullName} and level " +
            "=#{level}")
    List<EssentialInfo> getEiId3(String fullName, String level);

    /**
     * 查询基本信息id
     *
     * @param
     * @return 基本信息list
     */
    @Select("select department2 from essential_info group by department2 ")
    List<EssentialInfo> getDepartment2();


}
