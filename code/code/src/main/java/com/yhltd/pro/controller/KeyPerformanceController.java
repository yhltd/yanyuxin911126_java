


package com.yhltd.pro.controller;

import com.yhltd.pro.entity.KeyPerformance;
import com.yhltd.pro.service.KeyPerformanceService;
import com.yhltd.pro.util.DecodeUtil;
import com.yhltd.pro.util.GsonUtil;
import com.yhltd.pro.util.ResultInfo;
import com.yhltd.pro.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

/**
 * @author wanghui
 * @date 2022/01/28 12:26
 */

@Slf4j
@RestController
@RequestMapping("/keyperformance")
public class KeyPerformanceController {
    @Autowired
    private KeyPerformanceService keyPerformanceService;

    /**
     * 查询基本信息
     *
     * @return ResultInfo
     */
    @PostMapping("/getList")
    public ResultInfo getList() {
        try {
            List<KeyPerformance> list = keyPerformanceService.getList();
            if (StringUtils.isNotNull(list)) {
                return ResultInfo.success("获取成功", list);
            } else {
                return ResultInfo.success("获取失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 根据姓名查询基本信息
     *
     * @param fullName 姓名
     * @return ResultInfo
     */
    @PostMapping("/getListByName")
    public ResultInfo getListByName(String fullName,String secondaryUnit) {
        try {
            List<KeyPerformance> list = keyPerformanceService.getListByName(fullName,secondaryUnit);
            if (StringUtils.isNotNull(list)) {
                return ResultInfo.success("获取成功", list);
            } else {
                return ResultInfo.success("获取失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


    @PostMapping("/getScore")
    public ResultInfo getScore() {
        try {
            List<KeyPerformance> list = keyPerformanceService.getScore();
            if (StringUtils.isNotNull(list)) {
                return ResultInfo.success("获取成功", list);
            } else {
                return ResultInfo.success("获取失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }
}
