package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.Configuration;
import com.yhltd.pro.mapper.ConfigurationMapper;
import com.yhltd.pro.service.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/07 12:26
 */
@Service
public class ConfigurationServiceImpl extends ServiceImpl<ConfigurationMapper,Configuration> implements ConfigurationService {
    @Autowired
    private ConfigurationMapper configurationMapper;

    @Override
    public List<Configuration> getList() {
        return this.list();
    }

    @Override
    public List<Configuration> getListByName(String department) {
        QueryWrapper<Configuration> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("department", department);
        return this.list(queryWrapper);
    }

    @Override
    public boolean add(Configuration configuration) {
        return this.save(configuration);
    }

    @Override
    public boolean update(Configuration configuration) {
        return this.updateById(configuration);
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
    public List<Configuration> getDepartment() {
        return configurationMapper.getDepartment();
    }

    @Override
    public List<Configuration> getSecondaryMenu(String department) {
        return configurationMapper.getSecondaryMenu(department);
    }
}
