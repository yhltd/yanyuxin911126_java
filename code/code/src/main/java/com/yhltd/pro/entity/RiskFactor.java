package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/02/08 11:52
 */
@Data
@TableName("risk_factor")
public class RiskFactor {
    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    /**
     * 基本信息id
     */
    private int eiId;
    /**
     * 过度掩饰
     */
    private double A;
    /**
     * 强硬专制
     */
    private double B;
    /**
     * 微观管理
     */
    private double C;
    /**
     * 消极抵抗
     */
    private double D;
    /**
     * 自我中心
     */
    private double E;
    /**
     * 姓名
     */
    private String fullName;
    /**
     * 二级单位
     */
    private String department2;
    /**
     * 层级
     */
    private String department1;
}
