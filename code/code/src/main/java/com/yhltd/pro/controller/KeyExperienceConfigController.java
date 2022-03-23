package com.yhltd.pro.controller;

import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.entity.KeyExperienceConfig;
import com.yhltd.pro.service.KeyExperienceConfigService;
import com.yhltd.pro.util.DecodeUtil;
import com.yhltd.pro.util.GsonUtil;
import com.yhltd.pro.util.ResultInfo;
import com.yhltd.pro.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;

/**
 * @author wanghui
 * @date 2022/02/09 14:47
 */
@Slf4j
@RestController
@RequestMapping("/key_experience_config")
public class KeyExperienceConfigController {
    @Autowired
    private KeyExperienceConfigService keyExperienceConfigService;

    /**
     * 查询所有数据
     *
     * @return ResultInfo
     */
    @PostMapping("/getList")
    public ResultInfo getList() {
        try {
            List<KeyExperienceConfig> list = keyExperienceConfigService.getList();
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
     * 查询
     *
     * @return ResultInfo
     */
    @PostMapping("/getListByUnit")
    public ResultInfo getListByUnit(String unit,String experience) {
        try {
            List<KeyExperienceConfig> list = keyExperienceConfigService.getListByUnit(unit,experience);
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

    @PostMapping("/getSelect")
    public ResultInfo getSelect(String unit) {
        try {
            List<KeyExperienceConfig> list = keyExperienceConfigService.getSelect(unit);
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

    @PostMapping("/getSelect2")
    public ResultInfo getSelect2() {
        try {
            List<KeyExperienceConfig> list = keyExperienceConfigService.getSelect2();
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
     * 添加
     *
     * @param map map
     * @return ResultInfo
     */
    @PostMapping("/add")
    public ResultInfo add(@RequestBody HashMap map) {
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            KeyExperienceConfig keyExperienceConfig = gsonUtil.toEntity(gsonUtil.get("keyExperienceConfig"), KeyExperienceConfig.class);
            if (keyExperienceConfigService.add(keyExperienceConfig)) {
                return ResultInfo.success("添加成功", keyExperienceConfig);
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
     * 修改
     *
     * @param keyExperienceConfigJson 要修改的json
     * @return ResultInfo
     */
    @PostMapping("/update")
    public ResultInfo update(@RequestBody String keyExperienceConfigJson) {
        try {
            KeyExperienceConfig keyExperienceConfig = DecodeUtil.decodeToJson(keyExperienceConfigJson, KeyExperienceConfig.class);
            keyExperienceConfigService.update(keyExperienceConfig);
            return ResultInfo.success("修改成功", keyExperienceConfig);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", keyExperienceConfigJson);
            return ResultInfo.error("修改失败");
        }
    }

    /**
     * 删除
     *
     * @param map map
     * @return ResultInfo
     */
    @PostMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map) {
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
            if (keyExperienceConfigService.delete(idList)) {
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

    /**
     * 上传excel
     *
     * @param excel excel
     * @return ResultInfo
     */
    @PostMapping("/upload")
    public ResultInfo upload(String excel) {
        try {
            FileInputStream fis = new FileInputStream(StringUtils.base64ToFile(excel));
            Workbook wb = null;
            //创建2007版本Excel工作簿对象
            wb = new XSSFWorkbook(fis);
            //获取基本信息工作表
            Sheet sheet = wb.getSheet("关键经历积分对应表");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                KeyExperienceConfig keyExperienceConfig = new KeyExperienceConfig();
                //获取第i行
                Row row = sheet.getRow(i);
                //单位
                Cell unit = row.getCell(0);
                if (unit != null) {
                    unit.setCellType(CellType.STRING);
                    keyExperienceConfig.setUnit(unit.getStringCellValue());
                }
                //经历项
                Cell experience = row.getCell(1);
                if (experience != null) {
                    experience.setCellType(CellType.STRING);
                    keyExperienceConfig.setExperience(experience.getStringCellValue());
                }
                //历练时长
                Cell duration = row.getCell(2);
                if (duration != null) {
                    duration.setCellType(CellType.STRING);
                    keyExperienceConfig.setDuration(duration.getStringCellValue());
                }
                //赋分
                Cell score = row.getCell(3);
                if (score != null) {
                    score.setCellType(CellType.STRING);
                    keyExperienceConfig.setScore(score.getStringCellValue());
                }
                //层级
                Cell level = row.getCell(4);
                if (level != null) {
                    level.setCellType(CellType.STRING);
                    keyExperienceConfig.setLevel(level.getStringCellValue());
                }
                //满分
                Cell fullMark = row.getCell(5);
                if (fullMark != null) {
                    fullMark.setCellType(CellType.STRING);
                    keyExperienceConfig.setFullMark(fullMark.getStringCellValue());
                }
                //保存到数据库
                keyExperienceConfigService.add(keyExperienceConfig);
            }
            return ResultInfo.success("上传成功");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败，请查看数据是否正确：{}", e.getMessage());
            log.error("参数：{}", excel);
            return ResultInfo.error("上传失败，请查看数据是否正确");
        }
    }
}
