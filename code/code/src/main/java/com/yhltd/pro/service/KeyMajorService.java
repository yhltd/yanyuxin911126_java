package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.KeyMajor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/07 14:38
 */
@Service
public interface KeyMajorService extends IService<KeyMajor> {
    /**
     * 查询所有基本信息
     *
     * @return 基本信息的集合
     */
    List<KeyMajor> getList();

    /**
     * 查询所有基本信息
     * @param
     * @return 基本信息的集合
     */
    List<KeyMajor> getListByName(String fullName);

    /**
     * 根据id查询
     * @param eiId eiId
     * @return 基本信息的集合
     */
    List<KeyMajor> getListById(int eiId);

    /**
     * 根据部门计算均值
     * @param
     * @return 基本信息的集合
     */
    List<KeyMajor>getAverageByDepartment();

    /**
     * 添加
     *
     * @param keyMajor 添加的对象
     * @return 是否添加成功
     */
    boolean add(KeyMajor keyMajor);

    /**
     * 修改
     *
     * @param
     */
    void update(int id,int eiId,String department,String A,String B,String C,String D,String E,String F,String G,String H,String I,String J);

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
