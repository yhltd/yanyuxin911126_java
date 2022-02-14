


package com.yhltd.pro.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName("key_ability_score")
public class KeyAbilityScore {
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
     * 政治素养
     */
    private String D;

    /**
     * 团队管理
     */
    private String E;

    /**
     * 学习创新
     */
    private String F;

    /**
     * 攻坚克难
     */
    private String G;

    /**
     * 远见胆识
     */
    private String H;

    /**
     * 经营思维
     */
    private String I;

    /**
     * 统筹协调
     */
    private String J;

    /**
     * 推动落实
     */
    private String K;

    /**
     * 沟通合作
     */
    private String L;

    /**
     * 人际敏锐
     */
    private String M;

    /**
     * 政治敏锐
     */
    private String N;

    /**
     * 精益管理
     */
    private String O;

    /**
     * 严谨细致
     */
    private String P;

    /**
     * 风险防范
     */
    private String Q;

    /**
     * 专业管理
     */
    private String R;

    /**
     * 均分
     */
    private String average;

    private String fullName;

    private String department2;

    private String department1;

}
