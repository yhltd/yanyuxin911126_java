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
public class Performance extends EssentialInfo{
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
     * 年
     */
    private int eiId;

    /**
     * 总分
     */
    private double score;
}
