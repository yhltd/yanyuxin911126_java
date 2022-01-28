package com.yhltd.pro.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.mapper.EssentialInfoMapper;
import com.yhltd.pro.service.EssentialInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/27 12:08
 */
@Service
public class EssentialInfoServiceImpl extends ServiceImpl<EssentialInfoMapper, EssentialInfo> implements EssentialInfoService {
    @Autowired
    private EssentialInfoMapper essentialInfoMapper;

    @Override
    public List<EssentialInfo> getList() {
        return essentialInfoMapper.getList();
    }

    @Override
    public List<EssentialInfo> getListByName(String fullName) {
        return essentialInfoMapper.getListByName(fullName);
    }

    @Override
    public boolean add(EssentialInfo essentialInfo) {
        return this.save(essentialInfo);
    }

    @Override
    public boolean update(EssentialInfo essentialInfo) {
        return this.updateById(essentialInfo);
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