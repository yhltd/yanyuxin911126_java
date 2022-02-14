package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName("performance")
public class KeyPerformance {
    /**
     * 主键
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private int id;
    /**
     * 年
     */
    private String nian;
    /**
     * 姓名
     */
    private String fullName;

    /**
     * 现职务
     */
    private String post;

    /**
     * 二级单位
     */
    private String secondaryUnit;

    /**
     * 层级
     */
    private String department1;

    /**
     * 绩效得分
     */
    private float score;

    /**
     * 班子总人数
     */
    private int renshuSum;

    /**
     * 排名
     */
    private int ranking;

    /**
     * 排名位置
     */
    private int paiming;

    /**
     * 档位
     */
    private int dangwei;

    /**
     * 绩效
     */
    private int jixiao;

}
