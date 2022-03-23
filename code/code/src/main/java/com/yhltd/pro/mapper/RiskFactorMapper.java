package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.RiskFactor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/08 12:02
 */
@Mapper
public interface RiskFactorMapper extends BaseMapper<RiskFactor> {
    /**
     * 查询所有信息
     *
     * @return list
     */
    @Select("select rf.id,ei_id,full_name,department2,department1,A,B,C,D,E from risk_factor rf " +
            "left join essential_info ei on rf.ei_id=ei.id")
    List<RiskFactor> getList();

    /**
     * 根据姓名查询
     *
     * @return list
     */
    @Select("select rf.id,ei_id,full_name,department2,department1,A,B,C,D,E from risk_factor rf " +
            "left join essential_info ei on rf.ei_id=ei.id where " +
            "full_name like '%'+#{fullName}+'%' and department2 like '%'+#{department}+'%'")
    List<RiskFactor> getListByName(String fullName,String department);

    @Select("update risk_factor set ei_id=#{eiId},A=#{A},B=#{B},C=#{C},D=#{D},E=#{E} " +
            "where id=#{id}")
    void update(Integer id, Integer eiId, Double A, Double B, Double C, Double D, Double E);

    @Select("select department2,department1,max(convert(float,A)) as A," +
            "max(convert(float,B)) as B,max(convert(float,C)) as C," +
            "max(convert(float,D)) as D,max(convert(float,E)) as E " +
            "from risk_factor rf left join essential_info ei on " +
            "rf.ei_id=ei.id where ei.department2=#{department2} " +
            "group by department2,department1")
    List<RiskFactor> getListByDepartment(String department2);

}
