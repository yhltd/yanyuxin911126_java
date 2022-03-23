package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Performance;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:02
 */
@Service
public interface PerformanceService extends IService<Performance> {

    /**
     * 查询所有基本信息
     *
     * @return 基本信息的集合
     */
    List<Performance> getList();

    /**
     * 查询所有基本信息
     *
     * @param
     * @return 基本信息的集合
     */
    List<Performance> getListByName(String fullName,String secondaryUnit);


    /**
     * 添加基本信息
     *
     * @param performance 添加的对象
     * @return 是否添加成功
     */
    boolean add(Performance performance);

    /**
     * 修改
     *
     * @param performance 修改的对象
     * @return 是否修改成功
     */
    boolean update(Performance performance);

    /**
     * 修改
     *
     * @return 是否修改成功
     */
    void update(int id, String nian, int eiId, double score);

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
}
