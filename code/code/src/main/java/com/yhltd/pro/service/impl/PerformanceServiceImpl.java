package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Performance;
import com.yhltd.pro.mapper.PerformanceMapper;
import com.yhltd.pro.service.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:15
 */
@Service
public class PerformanceServiceImpl extends ServiceImpl<PerformanceMapper, Performance> implements PerformanceService {

    @Autowired
    private PerformanceMapper performanceMapper;

    @Override
    public List<Performance> getList() {
        return performanceMapper.getList();
    }

    @Override
    public List<Performance> getListByName(String fullName,String secondaryUnit) {
        return performanceMapper.getListByName(fullName,secondaryUnit);
    }

    @Override
    public boolean add(Performance performance) {
        return this.save(performance);
    }

    @Override
    public boolean update(Performance performance) {
        return this.updateById(performance);
    }

    @Override
    public void update(int id, String nian, int eiId, double score, String grade) {
        performanceMapper.update(id, nian, eiId, score, grade);
    }


    @Override
    public boolean delete(int id) {
        return this.removeById(id);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return this.removeByIds(idList);
    }
}
