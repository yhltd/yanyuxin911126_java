package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/02/07 14:24
 */
@Data
@TableName("key_major")
public class KeyMajor {
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
     * 单位
     */
    private String department;
    /**
     * 当前主管业务1
     */
    private String A;
    /**
     * 当前主管业务2
     */
    private String B;
    /**
     * 当前主管业务3
     */
    private String C;
    /**
     * 当前主管业务4
     */
    private String D;
    /**
     * 当前主管业务5
     */
    private String E;
    /**
     * 当前主管业务6
     */
    private String F;
    /**
     * 当前主管业务7
     */
    private String G;
    /**
     * 当前主管业务8
     */
    private String H;
    /**
     * 当前主管业务9
     */
    private String I;
    /**
     * 当前主管业务10
     */
    private String J;
    /**
     * 姓名
     */
    private String fullName;
    /**
     * 层级
     */
    private String level;
}
