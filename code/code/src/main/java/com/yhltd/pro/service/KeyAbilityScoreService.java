


package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.KeyAbilityScore;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:02
 */
@Service
public interface KeyAbilityScoreService extends IService<KeyAbilityScore> {
    /**
     * 查询所有基本信息
     *
     * @return 基本信息的集合
     */
    List<KeyAbilityScore> getList();

    /**
     * 查询所有基本信息
     *
     * @param
     * @return 基本信息的集合
     */
    List<KeyAbilityScore> getListByName(String fullName,String department);

    /**
     * 查询所有基本信息
     *
     * @param
     * @return 基本信息的集合
     */
    List<KeyAbilityScore> getListById(int eiId);

    /**
     * 查询平均值
     *
     * @return 基本信息的集合
     */
    List<KeyAbilityScore> getAverage();

    /**
     * 添加基本信息
     *
     * @param keyabilityscore 添加的对象
     * @return 是否添加成功
     */
    boolean add(KeyAbilityScore keyabilityscore);

    /**
     * 修改
     *
     * @return 是否修改成功
     */
    void update(int id, int eiId, String D, String E, String F, String G, String H, String I, String J, String K, String L, String M, String N, String O, String P, String Q, String R);

    /**
     * 删除
     *
     * @param id 根据id删除
     * @return 是否删除成功
     */
    boolean delete(int id);

    /**
     * 批量删除
     *
     * @param idList id集合
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

    List<KeyAbilityScore> getAverageByDepartment();
}
