


package com.yhltd.pro.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhltd.pro.entity.KeyAbilityScore;
import com.yhltd.pro.entity.KeyMajor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:16
 */
@Mapper
public interface KeyAbilityScoreMapper extends BaseMapper<KeyAbilityScore> {
    /**
     * 刷新
     *
     * @return 基本信息list
     */
    @Select("select kab.id,ei_id,full_name,department2,department1,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R from " +
            "key_ability_score kab left join essential_info ei on ei.id=kab.ei_id")
    List<KeyAbilityScore> getList();

    /**
     * 查询
     * @param fullName 姓名
     * @return 基本信息list
     */
    @Select("select kab.id,ei_id,full_name,department2,department1,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R from " +
            "key_ability_score kab left join essential_info ei on ei.id=kab.ei_id " +
            "where full_name like \"%\" #{fullName} \"%\" ")
    List<KeyAbilityScore> getListByName(String fullName);

    /**
     * 查询
     * @param eiId eiId
     * @return 基本信息list
     */
    @Select("select kab.id,ei_id,full_name,department2,department1,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R from " +
            "key_ability_score kab left join essential_info ei on ei.id=kab.ei_id " +
            "where kab.ei_id = #{eiId} limit 1")
    List<KeyAbilityScore> getListById(int eiId);

    /**
     * 查询平均值
     * @return 基本信息list
     */
    @Select("select sum(CONVERT(D,float))/count(D) D,sum(CONVERT(E,float))/count(E) E,sum(CONVERT(F,float))/count(F) F ,sum(CONVERT(G,float))/count(G) G,sum(CONVERT(H,float))/count(H) H,sum(CONVERT(I,float))/count(I) I,sum(CONVERT(J,float))/count(J) J,sum(CONVERT(K,float))/count(K) K,sum(CONVERT(L,float))/count(L) L,sum(CONVERT(M,float))/count(M) M,sum(CONVERT(N,float))/count(N) N,sum(CONVERT(O,float))/count(O) O,sum(CONVERT(P,float))/count(P) P,sum(CONVERT(Q,float))/count(Q) Q,sum(CONVERT(R,float))/count(R) R from key_ability_score")
    List<KeyAbilityScore> getAverage();

    /**
     *  修改
     */
    @Select("update key_ability_score set ei_id=#{eiId},D=#{D},E=#{E},F=#{F},G=#{G},H=#{H},I=#{I}" +
            ",J=#{J},K=#{K},L=#{L},M=#{M},N=#{N},O=#{O},P=#{P},Q=#{Q},R=#{R}" +
            " where id=#{id}")
    void update(Integer id,Integer eiId,String D,String E,String F,String G,String H,String I,String J,String K,String L,String M,String N,String O,String P,String Q,String R);

    /**
     *  根据部门查询
     * */
    @Select("select department2,ifnull(sum(D)/count(D),0) as D,ifnull(sum(E)/count(E),0) as E,ifnull(sum(F)/count(F),0) as F,ifnull(sum(G)/count(G),0) as G,ifnull(sum(H)/count(H),0) as H,ifnull(sum(I)/count(I),0) as I,ifnull(sum(J)/count(J),0) as J,ifnull(sum(K)/count(K),0) as K,ifnull(sum(L)/count(L),0) as L,ifnull(sum(M)/count(M),0) as M,ifnull(sum(N)/count(N),0) as N,ifnull(sum(O)/count(O),0) as O,ifnull(sum(P)/count(P),0) as P,ifnull(sum(Q)/count(Q),0) as Q,ifnull(sum(R)/count(R),0) as R from key_ability_score kac left join essential_info ei on ei.id=kac.ei_id group by department2")
    List<KeyAbilityScore>getAverageByDepartment();

}
