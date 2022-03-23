package com.yhltd.pro.controller;

import com.yhltd.pro.entity.*;
import com.yhltd.pro.service.*;
import com.yhltd.pro.util.DecodeUtil;
import com.yhltd.pro.util.GsonUtil;
import com.yhltd.pro.util.ResultInfo;
import com.yhltd.pro.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
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
    @Autowired
    private KeyPerformanceService keyPerformanceService;
    @Autowired
    private KeyAbilityScoreService keyAbilityScoreService;
    @Autowired
    private KeyMajorService keyMajorService;
    @Autowired
    private KeyExperienceConfigService keyExperienceConfigService;
    @Autowired
    private KeyExperienceScoreService keyExperienceScoreService;
    @Autowired
    private RiskFactorService riskFactorService;

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
    public ResultInfo getListByName(String fullName,String department) {
        try {
            List<EssentialInfo> list = essentialInfoService.getListByName(fullName,department);
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
            Sheet sheet = wb.getSheet("基本信息");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                EssentialInfo essentialInfo = new EssentialInfo();
                //获取第i行
                Row row = sheet.getRow(i);
                //姓名
                Cell fullName = row.getCell(0);
                if (fullName != null) {
                    fullName.setCellType(CellType.STRING);
                    essentialInfo.setFullName(fullName.getStringCellValue());
                }
                //性别
                Cell sex = row.getCell(1);
                if (sex != null) {
                    sex.setCellType(CellType.STRING);
                    essentialInfo.setSex(sex.getStringCellValue());
                }
                //生日
                Cell birthday = row.getCell(2);
                if (birthday != null) {
                    birthday.setCellType(CellType.STRING);
                    essentialInfo.setBirthday(birthday.getStringCellValue());
                }
                //任现职时间
                Cell riqi = row.getCell(3);
                if (riqi != null) {
                    riqi.setCellType(CellType.STRING);
                    essentialInfo.setRiqi(riqi.getStringCellValue());
                }
                //学历
                Cell education = row.getCell(4);
                if (education != null) {
                    education.setCellType(CellType.STRING);
                    essentialInfo.setEducation(education.getStringCellValue());
                }
                //职务
                Cell post = row.getCell(5);
                if (post != null) {
                    post.setCellType(CellType.STRING);
                    essentialInfo.setPost(post.getStringCellValue());
                }
                //部门/单位岗位
                Cell department1 = row.getCell(6);
                if (department1 != null) {
                    department1.setCellType(CellType.STRING);
                    essentialInfo.setDepartment1(department1.getStringCellValue());
                }
                //层级
                Cell level = row.getCell(7);
                if (level != null) {
                    level.setCellType(CellType.STRING);
                    essentialInfo.setLevel(level.getStringCellValue());
                }
                //二级单位
                Cell secondaryUnit = row.getCell(8);
                if (secondaryUnit != null) {
                    secondaryUnit.setCellType(CellType.STRING);
                    essentialInfo.setSecondaryUnit(secondaryUnit.getStringCellValue());
                }
                //部门/单位
                Cell department2 = row.getCell(9);
                if (department2 != null) {
                    department2.setCellType(CellType.STRING);
                    essentialInfo.setDepartment2(department2.getStringCellValue());
                }
                //保存到数据库
                essentialInfoService.add(essentialInfo);
            }
            return ResultInfo.success("上传成功");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败，请查看数据是否正确：{}", e.getMessage());
            log.error("参数：{}", excel);
            return ResultInfo.error("上传失败，请查看数据是否正确");
        }
    }

    /**
     * 关键绩效
     *
     * @return ResultInfo
     */
    @PostMapping("/performance")
    public ResultInfo performance(int eiId) {
        try {
            List<KeyPerformance> list = keyPerformanceService.getListById(eiId);
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
     * 关键能力
     *
     * @param eiId eiId
     * @return ResultInfo
     */
    @PostMapping("/keyAbilityScore")
    public ResultInfo keyAbilityScore(int eiId) {
        try {
            List<KeyAbilityScore> list = keyAbilityScoreService.getListById(eiId);
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
     * 关键能力平均分
     *
     * @return ResultInfo
     */
    @PostMapping("/getAverage")
    public ResultInfo getAverage() {
        try {
            List<KeyAbilityScore> list = keyAbilityScoreService.getAverage();
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
     * 关键能力平均分
     *
     * @return ResultInfo
     */
    @PostMapping("/keyMajor")
    public ResultInfo keyMajor(int eiId) {
        try {
            List<KeyMajor> list = keyMajorService.getListById(eiId);
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
     * 关键能力平均分
     *
     * @return ResultInfo
     */
    @PostMapping("/getFullMark")
    public ResultInfo getFullMark(String department1) {
        try {
            List<KeyExperienceConfig> list = keyExperienceConfigService.getListByDepartment1(department1);
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
     * 计算
     *
     * @return ResultInfo
     */
    @PostMapping("/calculation")
    public ResultInfo calculation() {
        String ks = "";
        String js = "";
        //正则表达式取出字符串中的数字
        String regEx = "[^0-9]";
        try {
            List<KeyExperienceScore> list = keyExperienceScoreService.getList();
            List<KeyExperienceConfig> configList = keyExperienceConfigService.getList();
            //赋分
            for (int i = 0; i < list.size(); i++) {
                if (StringUtils.isNotNull(list.get(i).getExperience()) && StringUtils.isNotNull(list.get(i).getSecondaryUnit())) {
                    for (int j = 0; j < configList.size(); j++) {
                        //判断单位和经历项
                        if (list.get(i).getSecondaryUnit().equals(configList.get(j).getUnit()) && list.get(i).getExperience().equals(configList.get(j).getExperience())) {
                            //判断经历时长中有没有逗号
                            if (configList.get(j).getDuration().contains(",") || configList.get(j).getDuration().contains("，")) {
                                //取出起始和结束
                                ks = configList.get(j).getDuration().replace(",", "，").split("，")[0].trim();
                                js = configList.get(j).getDuration().replace(",", "，").split("，")[1].trim();
                                ks = ks.substring(1, ks.length());
                                js = js.substring(0, js.length() - 1);
                                if (js.equals("∞")) {
                                    js = "99999";
                                }
                                //判断经历时长是否在区间内
                                if (Float.parseFloat(ks) <= Float.parseFloat(list.get(i).getDuration()) && Float.parseFloat(js) >= Float.parseFloat(list.get(i).getDuration())) {
                                    list.get(i).setScore(configList.get(j).getScore());
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            if (StringUtils.isNotNull(list)) {
                return ResultInfo.success("计算成功", list);
            } else {
                return ResultInfo.success("计算失败，请检查数据", list);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("计算失败，请检查数据");
        }
    }

    /**
     * 部门去重
     *
     * @return ResultInfo
     */
    @PostMapping("/getDepartment2")
    public ResultInfo getDepartment2() {
        try {
            List<EssentialInfo> list = essentialInfoService.getDepartment2();
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
     * 根据部门算均值
     *
     * @return ResultInfo
     */
    @PostMapping("/getAverageDepartment")
    public ResultInfo getAverageDepartment() {
        try {
            List<KeyAbilityScore> list = keyAbilityScoreService.getAverageByDepartment();
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
     * 团队报表风险因素
     */
    @PostMapping("/getListByDepartment")
    public ResultInfo getListByDepartment(String department2) {
        try {
            List<RiskFactor> list = riskFactorService.getListByDepartment(department2);
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
