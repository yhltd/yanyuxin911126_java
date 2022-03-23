package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.KeyExperienceConfig;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/09 14:41
 */
@Service
public interface KeyExperienceConfigService extends IService<KeyExperienceConfig> {
    /**
     * 查询
     *
     * @return 基本信息的集合
     */
    List<KeyExperienceConfig> getList();

    /**
     * 查询所有基本信息
     * @return 基本信息的集合
     */
    List<KeyExperienceConfig> getListByUnit(String unit,String experience);

    /**
     * 查询
     * @return list
     */
    List<KeyExperienceConfig> getListByDepartment1(String department1);

    /**
     * 添加
     *
     * @param keyExperienceConfig 添加的对象
     * @return 是否添加成功
     */
    boolean add(KeyExperienceConfig keyExperienceConfig);

    /**
     * 修改
     *
     * @param keyExperienceConfig 修改的对象
     * @return 是否修改成功
     */
    boolean update(KeyExperienceConfig keyExperienceConfig);

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

    List<KeyExperienceConfig>getSelect(String secondaryUnit);

    List<KeyExperienceConfig>getSelect2();
}
