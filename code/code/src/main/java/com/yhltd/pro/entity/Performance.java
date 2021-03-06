package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/01/28 11:58
 */
@Data
@TableName("performance")
public class Performance {
    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    /**
     * 年
     */
    private String nian;
    /**
     * 基本信息id
     */
    private int eiId;

    /**
     * 总分
     */
    private double score;

    /**
     * 姓名
     */
    private String fullName;

    /**
     * 二级单位
     */
    private String secondaryUnit;

    /**
     * 绩效评级
     */
    private String grade;

}
