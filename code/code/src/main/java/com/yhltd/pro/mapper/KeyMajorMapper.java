package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.entity.KeyMajor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/07 14:28
 */
@Mapper
public interface KeyMajorMapper extends BaseMapper<KeyMajor> {
    /**
     * 查询所有
     *
     * @return list
     */
    @Select("select km.id,ei_id,ei.full_name as full_name,km.department,ei.level as level," +
            "A,B,C,D,E,F,G,H,I,J from key_major as km left join essential_info as " +
            "ei on ei.id=km.ei_id")
    List<KeyMajor> getList();

    /**
     * 根据姓名查询
     *
     * @return list
     */
    @Select("select km.id,ei_id,ei.full_name as full_name,km.department,ei.level as level," +
            "A,B,C,D,E,F,G,H,I,J from key_major as km left join essential_info as " +
            "ei on ei.id=km.ei_id where ei.full_name like \"%\" #{fullName} \"%\" ")
    List<KeyMajor> getListByName(String fullName);

    /**
     * 根据姓名查询
     *
     * @return list
     */
    @Select("select * from key_major where ei_id=#{eiId} limit 1")
    List<KeyMajor> getListById(int eiId);

    /**
     * 修改
     */
    @Select("update key_major set ei_id=#{eiId},department=#{department},A=#{A},B=#{B}" +
            ",C=#{C},D=#{D},E=#{E},F=#{F},G=#{G},H=#{H},I=#{I},J=#{J} where id=#{id}")
    void update(Integer id,Integer eiId,String department,String A,String B,String C,String D,String E,String F,String G,String H,String I,String J);

    /**
     *  根据部门查询
     * */
    @Select("select department2,sum(D)/count(D) as D,sum(E)/count(E) as E,sum(F)/count(F) as F,sum(G)/count(G) as G,sum(H)/count(H) as H,sum(I)/count(I) as I,sum(J)/count(J) as J,sum(K)/count(K) as K,sum(L)/count(L) as L,sum(M)/count(M) as M,sum(N)/count(N) as N,sum(O)/count(O) as O,sum(P)/count(P) as P,sum(Q)/count(Q) as Q,sum(R)/count(R) as R from key_ability_score kac left join essential_info ei on ei.id=kac.ei_id")
    List<KeyMajor>getAverageByDepartment();

}
