package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.KeyExperienceConfig;
import com.yhltd.pro.mapper.KeyExperienceConfigMapper;
import com.yhltd.pro.service.KeyExperienceConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/09 14:44
 */
@Service
public class KeyExperienceConfigServiceImpl extends ServiceImpl<KeyExperienceConfigMapper, KeyExperienceConfig> implements KeyExperienceConfigService {
    @Autowired
    private KeyExperienceConfigMapper keyExperienceConfigMapper;

    @Override
    public List<KeyExperienceConfig> getList() {
        return this.list();
    }

    @Override
    public List<KeyExperienceConfig> getListByUnit(String unit) {
        return keyExperienceConfigMapper.getListByUnit(unit);
    }

    @Override
    public List<KeyExperienceConfig> getListByDepartment1(String department1) {
        return keyExperienceConfigMapper.getListByDepartment1(department1);
    }

    @Override
    public boolean add(KeyExperienceConfig keyExperienceConfig) {
        return this.save(keyExperienceConfig);
    }

    @Override
    public boolean update(KeyExperienceConfig keyExperienceConfig) {
        return this.updateById(keyExperienceConfig);
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
