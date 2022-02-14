package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.KeyPerformance;
import com.yhltd.pro.entity.Performance;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:02
 */
@Service
public interface KeyPerformanceService extends IService<KeyPerformance> {
    /**
     * 查询所有基本信息
     *
     * @return 基本信息的集合
     */
    List<KeyPerformance> getList();

    /**
     * 查询所有基本信息
     * @param
     * @return 基本信息的集合
     */
    List<KeyPerformance> getListByName(String fullName);

    /**
     * 查询所有基本信息
     * @param   eiId eiId
     * @return 基本信息的集合
     */
    List<KeyPerformance> getListById(int eiId);
}
