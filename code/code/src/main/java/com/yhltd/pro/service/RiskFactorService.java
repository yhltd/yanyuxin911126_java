package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.RiskFactor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/08 12:24
 */
@Service
public interface RiskFactorService extends IService<RiskFactor> {
    /**
     * 查询
     *
     * @return 基本信息的集合
     */
    List<RiskFactor> getList();

    /**
     * 根据姓名查询
     * @param
     * @return 基本信息的集合
     */
    List<RiskFactor> getListByName(String fullName);

    /**
     * 添加
     *
     * @param riskFactor 添加的对象
     * @return 是否添加成功
     */
    boolean add(RiskFactor riskFactor);

    /**
     * 修改
     *
     * @return 是否修改成功
     */
    void update(int id, int eiId,double A,double B,double C,double D,double E);

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
