package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.KeyExperienceScore;
import com.yhltd.pro.mapper.KeyExperienceScoreMapper;
import com.yhltd.pro.service.KeyExperienceScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/10 11:01
 */
@Service
public class KeyExperienceScoreServiceImpl extends ServiceImpl<KeyExperienceScoreMapper, KeyExperienceScore> implements KeyExperienceScoreService {
    @Autowired
    private KeyExperienceScoreMapper keyExperienceScoreMapper;

    @Override
    public List<KeyExperienceScore> getList() {
        return keyExperienceScoreMapper.getList();
    }

    @Override
    public List<KeyExperienceScore> getListByName(String fullName, String secondaryUnit) {
        return keyExperienceScoreMapper.getListByName(fullName,secondaryUnit);
    }

    @Override
    public boolean add(KeyExperienceScore keyExperienceScore) {
        return this.save(keyExperienceScore);
    }

    @Override
    public void update(int id, int eiId, String ksDate, String jsDate, String age, String experienceStage, String job, String experience,String unitName) {
        keyExperienceScoreMapper.update(id, eiId, ksDate, jsDate, age, experienceStage, job, experience,unitName);
    }

    @Override
    public boolean delete(int id) {
        return removeById(id);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
