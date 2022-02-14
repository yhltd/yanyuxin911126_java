package com.yhltd.pro.controller;

import com.yhltd.pro.entity.Configuration;
import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.service.ConfigurationService;
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
 * @date 2022/02/07 12:39
 */
@Slf4j
@RestController
@RequestMapping("/configuration")
public class ConfigurationController {
    @Autowired
    private ConfigurationService configurationService;

    /**
     * 查询所有数据
     *
     * @return ResultInfo
     */
    @PostMapping("/getList")
    public ResultInfo getList() {
        try {
            List<Configuration> list = configurationService.getList();
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
     * 根据单位/部门查询所有数据
     *
     * @param department 单位/部门
     * @return ResultInfo
     */
    @PostMapping("/getListByName")
    public ResultInfo getListByName(String department) {
        try {
            List<Configuration> list = configurationService.getListByName(department);
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
            Configuration configuration = gsonUtil.toEntity(gsonUtil.get("configuration"), Configuration.class);
            if (configurationService.add(configuration)) {
                return ResultInfo.success("添加成功", configuration);
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
     * @param configurationJson 要修改的json
     * @return ResultInfo
     */
    @PostMapping("/update")
    public ResultInfo update(@RequestBody String configurationJson) {
        try {
            Configuration configuration = DecodeUtil.decodeToJson(configurationJson, Configuration.class);
            configurationService.update(configuration);
            return ResultInfo.success("修改成功", configuration);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", configurationJson);
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
            if (configurationService.delete(idList)) {
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
            Sheet sheet = wb.getSheet("配置表");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Configuration configuration = new Configuration();
                //获取第i行
                Row row = sheet.getRow(i);
                //部门/单位
                Cell department = row.getCell(0);
                if (department != null) {
                    department.setCellType(CellType.STRING);
                    configuration.setDepartment(department.getStringCellValue());
                }
                //单位属性
                Cell unitAttribute = row.getCell(1);
                if (unitAttribute != null) {
                    unitAttribute.setCellType(CellType.STRING);
                    configuration.setUnitAttribute(unitAttribute.getStringCellValue());
                }
                //关键业务
                Cell keyBusiness = row.getCell(2);
                if (keyBusiness != null) {
                    keyBusiness.setCellType(CellType.STRING);
                    configuration.setKeyBusiness(keyBusiness.getStringCellValue());
                }
                //专长
                Cell expertise = row.getCell(3);
                if (expertise != null) {
                    expertise.setCellType(CellType.STRING);
                    configuration.setExpertise(expertise.getStringCellValue());
                }
                //学历
                Cell isNecessary = row.getCell(4);
                if (isNecessary != null) {
                    isNecessary.setCellType(CellType.STRING);
                    configuration.setIsNecessary(isNecessary.getStringCellValue());
                }
                //保存到数据库
                configurationService.add(configuration);
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
