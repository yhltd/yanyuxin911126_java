package com.yhltd.pro.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhltd.pro.entity.KeyExperienceConfig;
import com.yhltd.pro.entity.KeyExperienceScore;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/10 10:58
 */
@Service
public interface KeyExperienceScoreService extends IService<KeyExperienceScore> {
    /**
     * 查询
     *
     * @return 基本信息的集合
     */
    List<KeyExperienceScore> getList();

    /**
     * 添加
     *
     * @param keyExperienceScore 添加的对象
     * @return 是否添加成功
     */
    boolean add(KeyExperienceScore keyExperienceScore);

    /**
     * 修改
     *
     * @return 是否修改成功
     */
    void update(int id,int eiId,String ksDate,String jsDate,String age,String experienceStage,String job,String experience);

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
