package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.RiskFactor;
import com.yhltd.pro.mapper.RiskFactorMapper;
import com.yhltd.pro.service.RiskFactorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/08 12:27
 */
@Service
public class RiskFactorServiceImpl extends ServiceImpl<RiskFactorMapper, RiskFactor> implements RiskFactorService {
    @Autowired
    private RiskFactorMapper riskFactorMapper;

    @Override
    public List<RiskFactor> getList() {
        return riskFactorMapper.getList();
    }

    @Override
    public List<RiskFactor> getListByName(String fullName,String department) {
        return riskFactorMapper.getListByName(fullName,department);
    }

    @Override
    public boolean add(RiskFactor riskFactor) {
        return this.save(riskFactor);
    }

    @Override
    public void update(int id, int eiId, double A, double B, double C, double D, double E) {
        riskFactorMapper.update(id, eiId, A, B, C, D, E);
    }

    @Override
    public boolean delete(int id) {
        return this.removeById(id);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return this.removeByIds(idList);
    }

    @Override
    public List<RiskFactor> getListByDepartment(String department2) {
        return riskFactorMapper.getListByDepartment(department2);
    }
}
