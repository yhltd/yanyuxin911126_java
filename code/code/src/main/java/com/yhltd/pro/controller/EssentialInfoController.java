package com.yhltd.pro.controller;

import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.service.EssentialInfoService;
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
 * @date 2022/01/27 13:32
 */
@Slf4j
@RestController
@RequestMapping("/essential_info")
public class EssentialInfoController {
    @Autowired
    private EssentialInfoService essentialInfoService;

    /**
     * 查询基本信息
     *
     * @return ResultInfo
     */
    @PostMapping("/getList")
    public ResultInfo getList() {
        try {
            List<EssentialInfo> list = essentialInfoService.getList();
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
    public ResultInfo getListByName(String fullName) {
        try {
            List<EssentialInfo> list = essentialInfoService.getListByName(fullName);
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
     * 添加基本信息
     *
     * @param map map
     * @return ResultInfo
     */
    @PostMapping("/add")
    public ResultInfo add(@RequestBody HashMap map) {
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            EssentialInfo essentialInfo = gsonUtil.toEntity(gsonUtil.get("essentialInfo"), EssentialInfo.class);
            if (essentialInfoService.add(essentialInfo)) {
                return ResultInfo.success("添加成功", essentialInfo);
            } else {
                return ResultInfo.success("添加失败", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            log.error("参数：{}", map);
            return ResultInfo.error("添加失败");
        }
    }

    /**
     * 修改基本信息
     *
     * @param essentialInfoJson 要修改的json
     * @return ResultInfo
     */
    @PostMapping("/update")
    public ResultInfo update(@RequestBody String essentialInfoJson) {
        try {
            EssentialInfo essentialInfo = DecodeUtil.decodeToJson(essentialInfoJson, EssentialInfo.class);
            if (essentialInfoService.update(essentialInfo)) {
                return ResultInfo.success("修改成功", essentialInfo);
            } else {
                return ResultInfo.success("未修改", essentialInfo);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", essentialInfoJson);
            return ResultInfo.error("修改失败");
        }
    }

    /**
     * 删除基本信息
     *
     * @param map map
     * @return ResultInfo
     */
    @PostMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map) {
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
            if (essentialInfoService.delete(idList)) {
                return ResultInfo.success("删除成功");
            } else {
                return ResultInfo.success("删除失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("删除失败：{}", e.getMessage());
            log.error("参数：{}", map);
            return ResultInfo.error("删除失败");
        }
    }
}
