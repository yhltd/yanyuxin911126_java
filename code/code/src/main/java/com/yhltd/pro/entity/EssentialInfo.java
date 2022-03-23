package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


/**
 * @author wanghui
 * @date 2022/01/27 11:46
 */
@Data
@TableName("essential_info")
public class EssentialInfo {
    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private int id;
    /**
     * 姓名
     */
    private String fullName;
    /**
     * 性别
     */
    private String sex;
    /**
     * 生日
     */
    private String birthday;
    /**
     * 年龄
     */
    private String age;
    /**
     * 任现职时间
     */
    private String riqi;
    /**
     * 学历
     */
    private String education;
    /**
     * 职务
     */
    private String post;
    /**
     * 部门/单位岗位（填写中层正职、党委书记、中层正职、中层副职）
     */
    private String department1;
    /**
     * 层级
     */
    private String level;
    /**
     * 二级单位
     */
    private String secondaryUnit;
    /**
     * 部门/单位
     */
    private String department2;

}
