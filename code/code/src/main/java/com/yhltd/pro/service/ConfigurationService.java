package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.Configuration;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/07 12:23
 */
@Service
public interface ConfigurationService extends IService<Configuration> {
    /**
     * 查询所有基本信息
     *
     * @return 基本信息的集合
     */
    List<Configuration> getList();

    /**
     * 查询所有基本信息
     *
     * @param
     * @return 基本信息的集合
     */
    List<Configuration> getListByName(String department);

    /**
     * 添加基本信息
     *
     * @param configuration 添加的对象
     * @return 是否添加成功
     */
    boolean add(Configuration configuration);

    /**
     * 修改
     *
     * @param configuration 修改的对象
     * @return 是否修改成功
     */
    boolean update(Configuration configuration);

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

    /**
     * 查询所有部门
     *
     * @return 基本信息的集合
     */
    List<Configuration> getDepartment();

    /**
     * 查询所有关键业务
     *
     * @return 基本信息的集合
     */
    List<Configuration> getSecondaryMenu(String department);
}
