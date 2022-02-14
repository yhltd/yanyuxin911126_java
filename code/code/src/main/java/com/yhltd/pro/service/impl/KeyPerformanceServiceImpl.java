
package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.KeyAbilityScore;
import com.yhltd.pro.entity.KeyPerformance;
import com.yhltd.pro.mapper.KeyAbilityScoreMapper;
import com.yhltd.pro.mapper.KeyPerformanceMapper;
import com.yhltd.pro.service.KeyAbilityScoreService;
import com.yhltd.pro.service.KeyPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:15
 */
@Service
public class KeyPerformanceServiceImpl extends ServiceImpl<KeyPerformanceMapper, KeyPerformance> implements KeyPerformanceService {
    @Autowired
    private KeyPerformanceMapper keyPerformanceMapper;


    @Override
    public List<KeyPerformance> getList() {
        return keyPerformanceMapper.getList();
    }

    @Override
    public List<KeyPerformance> getListByName(String fullName) {
        return keyPerformanceMapper.getListByName(fullName);
    }

    @Override
    public List<KeyPerformance> getListById(int eiId) {
        return keyPerformanceMapper.getListById(eiId);
    }


//    @Autowired
//    private KeyAbilityScoreMapper keyAbilityScoreMapper;
//
//    @Override
//    public List<KeyAbilityScore> getList() {
//        return keyAbilityScoreMapper.getList();
//    }
//
//    @Override
//    public List<KeyAbilityScore> getListByName(String fullName) {
//        return keyAbilityScoreMapper.getListByName(fullName);
//    }
//
//    @Override
//    public boolean add(KeyAbilityScore keyPerformance) {
//        return this.save(keyPerformance);
//    }
//
//    @Override
//    public boolean update(KeyAbilityScore keyPerformance) {
//        return this.updateById(keyPerformance);
//    }
//
//    @Override
//    public void update(int id, int eiId, String D,String E,String F,String G,String H,String I,String J,String K,String L,String M,String N,String O,String P,String Q,String R) {
//        keyAbilityScoreMapper.update(id,eiId,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R);
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
