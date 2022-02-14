
package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.KeyPerformance;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:16
 */
@Mapper
public interface KeyPerformanceMapper extends BaseMapper<KeyPerformance> {
    /**
     * 查询所有基本信息
     *
     * @return 基本信息list
     */
    @Select("select jiben2.id,jiben2.nian,jiben2.full_name,jiben2.post,jiben2.secondary_unit,jiben2.department1,jiben2.score,jiben2.renshu_sum,paiming2.ranking,'' as paiming,'' as dangwei,'' as jixiao,'' as guanjianjixiao from(select jiben.id,jiben.nian,jiben.full_name,jiben.post,jiben.secondary_unit,jiben.department1,jiben.score,bumen.renshu_sum from(select renyuan.id,defen.nian,renyuan.full_name,renyuan.post,renyuan.secondary_unit,renyuan.department1,defen.score from performance as defen left join essential_info as renyuan on defen.ei_id = renyuan.id) as jiben left join (select bumen_num.nian,bumen_num.secondary_unit,count(secondary_unit) as renshu_sum from(select defen.nian,renyuan.secondary_unit from performance as defen left join essential_info as renyuan on defen.ei_id = renyuan.id) as bumen_num GROUP BY nian,secondary_unit) as bumen on bumen.secondary_unit = jiben.secondary_unit and bumen.nian = jiben.nian) as jiben2 left join(SELECT paiming.ei_id,paiming.nian,ROW_NUMBER() OVER (PARTITION BY paiming.nian,paiming.secondary_unit ORDER BY paiming.score DESC) ranking FROM (SELECT defen.ei_id,defen.nian,renyuan.secondary_unit,defen.score FROM performance AS defen LEFT JOIN essential_info AS renyuan ON defen.ei_id = renyuan.id ORDER BY nian,secondary_unit,score DESC) as paiming) as paiming2 on jiben2.id = paiming2.ei_id and jiben2.nian = paiming2.nian where (jiben2.nian = year(now()) or jiben2.nian = year(now())-1 or jiben2.nian = year(now()) -2)")
    List<KeyPerformance> getList();

    /**
     * 查询所有基本信息
     * @param fullName 姓名
     * @return 基本信息list
     */
    @Select("select jiben2.id,jiben2.nian,jiben2.full_name,jiben2.post,jiben2.secondary_unit,jiben2.department1,jiben2.score,jiben2.renshu_sum,paiming2.ranking,'' as paiming,'' as dangwei,'' as jixiao,'' as guanjianjixiao from(select jiben.id,jiben.nian,jiben.full_name,jiben.post,jiben.secondary_unit,jiben.department1,jiben.score,bumen.renshu_sum from(select renyuan.id,defen.nian,renyuan.full_name,renyuan.post,renyuan.secondary_unit,renyuan.department1,defen.score from performance as defen left join essential_info as renyuan on defen.ei_id = renyuan.id) as jiben left join (select bumen_num.nian,bumen_num.secondary_unit,count(secondary_unit) as renshu_sum from(select defen.nian,renyuan.secondary_unit from performance as defen left join essential_info as renyuan on defen.ei_id = renyuan.id) as bumen_num GROUP BY nian,secondary_unit) as bumen on bumen.secondary_unit = jiben.secondary_unit and bumen.nian = jiben.nian) as jiben2 left join(SELECT paiming.ei_id,paiming.nian,ROW_NUMBER() OVER (PARTITION BY paiming.nian,paiming.secondary_unit ORDER BY paiming.score DESC) ranking FROM (SELECT defen.ei_id,defen.nian,renyuan.secondary_unit,defen.score FROM performance AS defen LEFT JOIN essential_info AS renyuan ON defen.ei_id = renyuan.id ORDER BY nian,secondary_unit,score DESC) as paiming) as paiming2 on jiben2.id = paiming2.ei_id and jiben2.nian = paiming2.nian where (jiben2.nian = year(now()) or jiben2.nian = year(now())-1 or jiben2.nian = year(now()) -2) and jiben2.full_name like \"%\" #{fullName} \"%\" ")
    List<KeyPerformance> getListByName(String fullName);

    /**
     * 查询所有基本信息
     * @param eiId eiId
     * @return list
     */
    @Select("select jiben2.id,jiben2.nian,jiben2.full_name,jiben2.post,jiben2.secondary_unit,jiben2.department1,jiben2.score,jiben2.renshu_sum,paiming2.ranking,'' as paiming,'' as dangwei,'' as jixiao,'' as guanjianjixiao from(select jiben.id,jiben.nian,jiben.full_name,jiben.post,jiben.secondary_unit,jiben.department1,jiben.score,bumen.renshu_sum from(select renyuan.id,defen.nian,renyuan.full_name,renyuan.post,renyuan.secondary_unit,renyuan.department1,defen.score from performance as defen left join essential_info as renyuan on defen.ei_id = renyuan.id) as jiben left join (select bumen_num.nian,bumen_num.secondary_unit,count(secondary_unit) as renshu_sum from(select defen.nian,renyuan.secondary_unit from performance as defen left join essential_info as renyuan on defen.ei_id = renyuan.id) as bumen_num GROUP BY nian,secondary_unit) as bumen on bumen.secondary_unit = jiben.secondary_unit and bumen.nian = jiben.nian) as jiben2 left join(SELECT paiming.ei_id,paiming.nian,ROW_NUMBER() OVER (PARTITION BY paiming.nian,paiming.secondary_unit ORDER BY paiming.score DESC) ranking FROM (SELECT defen.ei_id,defen.nian,renyuan.secondary_unit,defen.score FROM performance AS defen LEFT JOIN essential_info AS renyuan ON defen.ei_id = renyuan.id ORDER BY nian,secondary_unit,score DESC) as paiming) as paiming2 on jiben2.id = paiming2.ei_id and jiben2.nian = paiming2.nian where (jiben2.nian = year(now()) or jiben2.nian = year(now())-1 or jiben2.nian = year(now()) -2) and jiben2.id =#{eiId} order by nian desc")
    List<KeyPerformance> getListById(int eiId);

    @Select("update performance set nian=#{nian},ei_id=#{eiId}" +
            ",score=#{score} where id=#{id}")
    void update(Integer id,String nian,Integer eiId,Double score);
}