


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
     *
     * @param fullName 姓名
     * @return 基本信息list
     */
    @Select("select kab.id,ei_id,full_name,department2,department1,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R from " +
            "key_ability_score kab left join essential_info ei on ei.id=kab.ei_id " +
            "where full_name like '%'+#{fullName}+'%' and department2 like '%'+#{department}+'%' ")
    List<KeyAbilityScore> getListByName(String fullName,String department);

    /**
     * 查询
     *
     * @param eiId eiId
     * @return 基本信息list
     */
    @Select("select top 1 kab.id,ei_id,full_name,department2,department1,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R from " +
            "key_ability_score kab left join essential_info ei on ei.id=kab.ei_id " +
            "where kab.ei_id = #{eiId} ")
    List<KeyAbilityScore> getListById(int eiId);

    /**
     * 查询平均值
     *
     * @return 基本信息list
     */
    @Select("select sum(CONVERT(float,D))/count(D) D,sum(CONVERT(float,E))/count(E) E,sum(CONVERT(float,F))/count(F) F ,sum(CONVERT(float,G))/count(G) G,sum(CONVERT(float,H))/count(H) H,sum(CONVERT(float,I))/count(I) I,sum(CONVERT(float,J))/count(J) J,sum(CONVERT(float,K))/count(K) K,sum(CONVERT(float,L))/count(L) L,sum(CONVERT(float,M))/count(M) M,sum(CONVERT(float,N))/count(N) N,sum(CONVERT(float,O))/count(O) O,sum(CONVERT(float,P))/count(P) P,sum(CONVERT(float,Q))/count(Q) Q,sum(CONVERT(float,R))/count(R) R from key_ability_score")
    List<KeyAbilityScore> getAverage();

    /**
     * 修改
     */
    @Select("update key_ability_score set ei_id=#{eiId},D=#{D},E=#{E},F=#{F},G=#{G},H=#{H},I=#{I}" +
            ",J=#{J},K=#{K},L=#{L},M=#{M},N=#{N},O=#{O},P=#{P},Q=#{Q},R=#{R}" +
            " where id=#{id}")
    void update(Integer id, Integer eiId, String D, String E, String F, String G, String H, String I, String J, String K, String L, String M, String N, String O, String P, String Q, String R);

    /**
     * 根据部门查询
     */
    @Select("select department2,round(sum(convert(float,D))/count(D),2) as D," +
            "round(sum(convert(float,E))/count(E),2) as E," +
            "round(sum(convert(float,F))/count(F),2) as F," +
            "round(sum(convert(float,G))/count(G),2) as G," +
            "round(sum(convert(float,H))/count(H),2) as H," +
            "round(sum(convert(float,I))/count(I),2) as I," +
            "round(sum(convert(float,J))/count(J),2) as J," +
            "round(sum(convert(float,K))/count(K),2) as K," +
            "round(sum(convert(float,L))/count(L),2) as L," +
            "round(sum(convert(float,M))/count(M),2) as M," +
            "round(sum(convert(float,N))/count(N),2) as N," +
            "round(sum(convert(float,O))/count(O),2) as O," +
            "round(sum(convert(float,P))/count(P),2) as P," +
            "round(sum(convert(float,Q))/count(Q),2) as Q," +
            "round(sum(convert(float,R))/count(R),2) as R " +
            "from key_ability_score kac left join essential_info ei on " +
            "ei.id=kac.ei_id GROUP BY department2")
    List<KeyAbilityScore> getAverageByDepartment();

}
