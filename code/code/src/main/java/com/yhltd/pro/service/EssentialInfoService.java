package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.EssentialInfo;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/27 12:03
 */
@Service
public interface EssentialInfoService extends IService<EssentialInfo> {
    /**
     * 查询所有基本信息
     *
     * @return 基本信息的集合
     */
    List<EssentialInfo> getList();

    /**
     * 查询所有基本信息
     *
     * @param
     * @return 基本信息的集合
     */
    List<EssentialInfo> getListByName(String fullName,String department);

    /**
     * 添加基本信息
     *
     * @param essentialInfo 添加的对象
     * @return 是否添加成功
     */
    boolean add(EssentialInfo essentialInfo);

    /**
     * 修改
     *
     * @param essentialInfo 修改的对象
     * @return 是否修改成功
     */
    boolean update(EssentialInfo essentialInfo);

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
     * 查询基本信息id
     *
     * @return 基本信息id
     */
    List<EssentialInfo> getEiId(String fullName, String secondaryUnit);

    /**
     * 查询基本信息id
     *
     * @return 基本信息id
     */
    List<EssentialInfo> getEiId2(String fullName, String department2, String department1);

    /**
     * 查询基本信息id
     *
     * @return 基本信息id
     */
    List<EssentialInfo> getEiId3(String fullName, String level);

    /**
     * 查询部门2
     *
     * @return
     */
    List<EssentialInfo> getDepartment2();


}
