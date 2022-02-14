


package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.KeyAbilityScore;
import com.yhltd.pro.entity.Performance;
import com.yhltd.pro.mapper.KeyAbilityScoreMapper;
import com.yhltd.pro.mapper.PerformanceMapper;
import com.yhltd.pro.service.KeyAbilityScoreService;
import com.yhltd.pro.service.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:15
 */
@Service
public class KeyAbilityScoreServiceImpl extends ServiceImpl<KeyAbilityScoreMapper, KeyAbilityScore> implements KeyAbilityScoreService {

    @Autowired
    private KeyAbilityScoreMapper keyAbilityScoreMapper;

    @Override
    public List<KeyAbilityScore> getList() {
        return keyAbilityScoreMapper.getList();
    }

    @Override
    public List<KeyAbilityScore> getListByName(String fullName) {
        return keyAbilityScoreMapper.getListByName(fullName);
    }

    @Override
    public List<KeyAbilityScore> getListById(int eiId) {
        return keyAbilityScoreMapper.getListById(eiId);
    }

    @Override
    public List<KeyAbilityScore> getAverage() {
        return keyAbilityScoreMapper.getAverage();
    }

    @Override
    public boolean add(KeyAbilityScore keyabilityscore) {
        return this.save(keyabilityscore);
    }



    @Override
    public void update(int id, int eiId, String D, String E, String F, String G, String H, String I, String J, String K, String L, String M, String N, String O, String P, String Q, String R) {
        keyAbilityScoreMapper.update(id,eiId,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R);
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
    public List<KeyAbilityScore> getAverageByDepartment() {
        return keyAbilityScoreMapper.getAverageByDepartment();
    }

//    @Override
//    public List<KeyAbilityScore> getList() {
//        return keyAbilityScoreMapper.getList();
//    }
//
//    @Override
//    public List<Performance> getListByName(String fullName) {
//        return performanceMapper.getListByName(fullName);
//    }
//
//    @Override
//    public boolean add(Performance performance) {
//        return this.save(performance);
//    }
//
//    @Override
//    public boolean update(Performance performance) {
//        return this.updateById(performance);
//    }
//
//    @Override
//    public void update(int id, String nian, int eiId, double score) {
//        performanceMapper.update(id,nian,eiId,score);
//    }
//
//
//    @Override
//    public boolean delete(int id) {
//        return this.removeById(id);
//    }
//
//    @Override
//    public boolean delete(List<Integer> idList) {
//        return this.removeByIds(idList);
//    }
}
