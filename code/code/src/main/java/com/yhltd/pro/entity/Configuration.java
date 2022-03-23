package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/02/07 11:55
 */
@Data
@TableName("configuration")
public class Configuration {
    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    /**
     * 部门/单位
     */
    private String department;
    /**
     * 单位属性
     */
    private String unitAttribute;
    /**
     * 关键业务
     */
    private String keyBusiness;
    /**
     * 专长
     */
    private String expertise;
    /**
     * 是否必备
     */
    private String isNecessary;
}
