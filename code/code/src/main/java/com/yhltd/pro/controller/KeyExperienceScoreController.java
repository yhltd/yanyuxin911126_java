package com.yhltd.pro.controller;

import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.entity.KeyExperienceConfig;
import com.yhltd.pro.entity.KeyExperienceScore;
import com.yhltd.pro.entity.RiskFactor;
import com.yhltd.pro.service.EssentialInfoService;
import com.yhltd.pro.service.KeyExperienceConfigService;
import com.yhltd.pro.service.KeyExperienceScoreService;
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
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author wanghui
 * @date 2022/02/10 11:11
 */
@Slf4j
@RestController
@RequestMapping("/key_experience_score")
public class KeyExperienceScoreController {
    @Autowired
    private KeyExperienceScoreService keyExperienceScoreService;
    @Autowired
    private KeyExperienceConfigService keyExperienceConfigService;
    @Autowired
    private EssentialInfoService essentialInfoService;

    /**
     * 刷新
     *
     * @return ResultInfo
     */
    @PostMapping("/getList")
    public ResultInfo getList() {
        try {
            List<KeyExperienceScore> list = keyExperienceScoreService.getList();
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
    @PostMapping("/getListByName")
    public ResultInfo getListByName(String fullName,String secondaryUnit) {
        try {
            List<KeyExperienceScore> list = keyExperienceScoreService.getListByName(fullName,secondaryUnit);
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
            Set<KeyExperienceScore> set = new TreeSet<KeyExperienceScore>(new Comparator<KeyExperienceScore>() {
                @Override
                public int compare(KeyExperienceScore o1, KeyExperienceScore o2) {
                    int compareToResult = 1;// ==0表示重复
                    if (o1.getExperience().equals(o2.getExperience()) && o1.getEiId() == o2.getEiId()) {
                        compareToResult = 0;
                    }
                    // 字符串则按照asicc码升序排列
                    return compareToResult;
                }
            });
            set.addAll(list);
            List<KeyExperienceScore> newList = new ArrayList<>(set);
            for (int i = 0; i < newList.size(); i++) {
                double duration = 0;
                for (int j = 0; j < list.size(); j++) {
                    if (StringUtils.isNotNull(newList.get(i).getExperience()) && StringUtils.isNotNull(list.get(j).getExperience())) {
                        if (newList.get(i).getExperience().equals(list.get(j).getExperience()) && newList.get(i).getFullName().equals(list.get(j).getFullName())) {
                            duration = duration + Double.parseDouble(list.get(j).getDuration());
                            newList.get(i).setDuration(String.valueOf(duration));
                        }
                    }
                }
            }

            //赋分
            for (int i = 0; i < newList.size(); i++) {
                if (StringUtils.isNotNull(newList.get(i).getExperience()) && StringUtils.isNotNull(newList.get(i).getUnitName())) {
                    for (int j = 0; j < configList.size(); j++) {
                        //判断单位和经历项
                        if (newList.get(i).getUnitName().equals(configList.get(j).getUnit()) && newList.get(i).getExperience().equals(configList.get(j).getExperience())) {
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
                                if (Float.parseFloat(ks) <= Float.parseFloat(newList.get(i).getDuration()) && Float.parseFloat(js) >= Float.parseFloat(newList.get(i).getDuration())) {
                                    newList.get(i).setScore(configList.get(j).getScore());
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            if (StringUtils.isNotNull(newList)) {
                return ResultInfo.success("计算成功", newList);
            } else {
                return ResultInfo.success("计算失败，请检查数据", newList);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("计算失败，请检查数据");
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
            KeyExperienceScore keyExperienceScore = gsonUtil.toEntity(gsonUtil.get("keyExperienceScore"), KeyExperienceScore.class);
            if (keyExperienceScoreService.add(keyExperienceScore)) {
                return ResultInfo.success("添加成功", keyExperienceScore);
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
     * @param keyExperienceScoreJson 要修改的json
     * @return ResultInfo
     */
    @PostMapping("/update")
    public ResultInfo update(@RequestBody String keyExperienceScoreJson) {
        try {
            KeyExperienceScore keyExperienceScore = DecodeUtil.decodeToJson(keyExperienceScoreJson, KeyExperienceScore.class);
            int id = keyExperienceScore.getId();
            int eiId = keyExperienceScore.getEiId();
            String ksDate = keyExperienceScore.getKsDate();
            String jsDate = keyExperienceScore.getJsDate();
            String age = keyExperienceScore.getAge();
            String experienceStage = keyExperienceScore.getExperienceStage();
            String job = keyExperienceScore.getJob();
            String experience = keyExperienceScore.getExperience();
            String unitName = keyExperienceScore.getUnitName();
            keyExperienceScoreService.update(id, eiId, ksDate, jsDate, age, experienceStage, job, experience, unitName);
            return ResultInfo.success("修改成功", keyExperienceScore);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", keyExperienceScoreJson);
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
            if (keyExperienceScoreService.delete(idList)) {
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
            Sheet sheet = wb.getSheet("关键经历得分表");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                KeyExperienceScore keyExperienceScore = new KeyExperienceScore();
                //获取第i行
                Row row = sheet.getRow(i);
                //姓名
                Cell fullName = row.getCell(0);
                //所在单位
                Cell secondaryUnit = row.getCell(4);
                if (fullName != null && secondaryUnit != null) {
                    fullName.setCellType(CellType.STRING);
                    secondaryUnit.setCellType(CellType.STRING);
                    //查询基本信息id
                    List<EssentialInfo> eiIdList = essentialInfoService.getEiId(fullName.getStringCellValue(), secondaryUnit.getStringCellValue());
                    keyExperienceScore.setEiId(eiIdList.get(0).getId());
                }
                //开始时间
                Cell ksDate = row.getCell(1);
                if (ksDate != null) {
                    ksDate.setCellType(CellType.STRING);
                    keyExperienceScore.setKsDate(ksDate.getStringCellValue());
                }
                //结束时间
                Cell jsDate = row.getCell(2);
                if (jsDate != null) {
                    jsDate.setCellType(CellType.STRING);
                    keyExperienceScore.setJsDate(jsDate.getStringCellValue());
                }
                //任职年龄
                Cell age = row.getCell(3);
                if (age != null) {
                    age.setCellType(CellType.STRING);
                    keyExperienceScore.setAge(age.getStringCellValue());
                }
                //从事工作和职务
                Cell job = row.getCell(5);
                if (job != null) {
                    job.setCellType(CellType.STRING);
                    keyExperienceScore.setJob(job.getStringCellValue());
                }
                //经历阶段
                Cell experienceStage = row.getCell(6);
                if (experienceStage != null) {
                    experienceStage.setCellType(CellType.STRING);
                    keyExperienceScore.setExperienceStage(experienceStage.getStringCellValue());
                }
                //经历项
                Cell experience = row.getCell(7);
                if (experience != null) {
                    experience.setCellType(CellType.STRING);
                    keyExperienceScore.setExperience(experience.getStringCellValue());
                }
                //保存到数据库
                keyExperienceScoreService.add(keyExperienceScore);
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
