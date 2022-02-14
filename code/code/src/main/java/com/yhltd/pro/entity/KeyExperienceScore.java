package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/02/10 10:40
 */
@Data
@TableName("key_experience_score")
public class KeyExperienceScore {
    /**
     * 主键
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private int id;
    /**
     * 基本信息id
     */
    private int eiId;
    /**
     * 姓名
     */
    private String fullName;
    /**
     * 起始时间
     */
    private String ksDate;
    /**
     * 终止时间
     */
    private String jsDate;
    /**
     * 任职年龄
     */
    private String age;
    /**
     * 所在单位
     */
    private String secondaryUnit;
    /**
     * 从事工作或职务
     */
    private String job;
    /**
     * 经历时长
     */
    private String duration;
    /**
     * 经历阶段
     */
    private String experienceStage;
    /**
     * 经历项
     */
    private String experience;
    /**
     * 经历赋分
     */
    private String score;
}
