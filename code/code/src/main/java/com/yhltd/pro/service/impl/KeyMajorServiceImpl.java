package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.KeyMajor;
import com.yhltd.pro.mapper.KeyMajorMapper;
import com.yhltd.pro.service.KeyMajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/07 14:41
 */
@Service
public class KeyMajorServiceImpl extends ServiceImpl<KeyMajorMapper, KeyMajor> implements KeyMajorService {
    @Autowired
    private KeyMajorMapper keyMajorMapper;

    @Override
    public List<KeyMajor> getList() {
        return keyMajorMapper.getList();
    }

    @Override
    public List<KeyMajor> getListByName(String fullName) {
        return keyMajorMapper.getListByName(fullName);
    }

    @Override
    public List<KeyMajor> getListById(int eiId) {
        return keyMajorMapper.getListById(eiId);
    }

    @Override
    public List<KeyMajor> getAverageByDepartment() {
        return keyMajorMapper.getAverageByDepartment();
    }

    @Override
    public boolean add(KeyMajor keyMajor) {
        return this.save(keyMajor);
    }

    @Override
    public void update(int id,int eiId,String department,String A,String B,String C,String D,String E,String F,String G,String H,String I,String J) {
        keyMajorMapper.update(id,eiId,department,A,B,C,D,E,F,G,H,I,J);
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
