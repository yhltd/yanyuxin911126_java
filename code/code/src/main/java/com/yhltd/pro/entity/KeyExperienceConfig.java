package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/02/09 14:34
 */
@Data
@TableName("key_experience_config")
public class KeyExperienceConfig {
    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    /**
     * 单位
     */
    private String unit;
    /**
     * 层级
     */
    private String experience;
    /**
     * 经历时长
     */
    private String duration;
    /**
     * 分数
     */
    private String score;
    /**
     * 层级
     */
    private String level;
    /**
     * 满分
     */
    private String fullMark;
}
