package com.yhltd.pro.controller;

import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.entity.Performance;
import com.yhltd.pro.mapper.EssentialInfoMapper;
import com.yhltd.pro.service.EssentialInfoService;
import com.yhltd.pro.service.PerformanceService;
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
 * @date 2022/01/28 12:26
 */

@Slf4j
@RestController
@RequestMapping("/performance")
public class PerformanceController {
    @Autowired
    private PerformanceService performanceService;
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
            List<Performance> list = performanceService.getList();
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
            List<Performance> list = performanceService.getListByName(fullName,secondaryUnit);
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
            Performance performance = gsonUtil.toEntity(gsonUtil.get("performance"), Performance.class);
            if (performanceService.add(performance)) {
                return ResultInfo.success("添加成功", performance);
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
     * @param performanceJson 要修改的json
     * @return ResultInfo
     */
    @PostMapping("/update")
    public ResultInfo update(@RequestBody String performanceJson) {
        try {
            Performance performance = DecodeUtil.decodeToJson(performanceJson, Performance.class);
            int id = performance.getId();
            String nian = performance.getNian();
            int eiId = performance.getEiId();
            double score = performance.getScore();
            String grade = performance.getGrade();
            performanceService.update(id, nian, eiId, score, grade);
            return ResultInfo.success("修改成功", performance);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", performanceJson);
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
            if (performanceService.delete(idList)) {
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
            Sheet sheet = wb.getSheet("绩效数据");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Performance performance = new Performance();
                //获取第i行
                Row row = sheet.getRow(i);
                //年份
                Cell nian = row.getCell(0);
                if (nian != null) {
                    nian.setCellType(CellType.STRING);
                    performance.setNian(nian.getStringCellValue());
                }
                //姓名
                Cell fullName = row.getCell(1);
                //机关
                Cell secondaryUnit = row.getCell(2);
                if (fullName != null && secondaryUnit != null) {
                    fullName.setCellType(CellType.STRING);
                    secondaryUnit.setCellType(CellType.STRING);
                    //查询基本信息id
                    List<EssentialInfo> eiIdList = essentialInfoService.getEiId(fullName.getStringCellValue(), secondaryUnit.getStringCellValue());
                    performance.setEiId(eiIdList.get(0).getId());
                }
                //分数
                Cell score = row.getCell(3);
                if (score != null) {
                    score.setCellType(CellType.NUMERIC);
                    performance.setScore(score.getNumericCellValue());
                }
                Cell grade = row.getCell(4);
                if (grade != null) {
                    grade.setCellType(CellType.STRING);
                    performance.setGrade(grade.getStringCellValue());
                }
                //保存到数据库
                performanceService.add(performance);
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
