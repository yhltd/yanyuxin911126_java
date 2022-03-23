package com.yhltd.pro.controller;

import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.entity.Performance;
import com.yhltd.pro.entity.RiskFactor;
import com.yhltd.pro.service.EssentialInfoService;
import com.yhltd.pro.service.RiskFactorService;
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
 * @date 2022/02/08 12:32
 */
@Slf4j
@RestController
@RequestMapping("/risk_factor")
public class RiskFactorController {
    @Autowired
    private RiskFactorService riskFactorService;
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
            List<RiskFactor> list = riskFactorService.getList();
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
            List<RiskFactor> list = riskFactorService.getListByName(fullName,department);
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
            RiskFactor riskFactor = gsonUtil.toEntity(gsonUtil.get("riskFactor"), RiskFactor.class);
            if (riskFactorService.add(riskFactor)) {
                return ResultInfo.success("添加成功", riskFactor);
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
     * @param riskFactorJson 要修改的json
     * @return ResultInfo
     */
    @PostMapping("/update")
    public ResultInfo update(@RequestBody String riskFactorJson) {
        try {
            RiskFactor riskFactor = DecodeUtil.decodeToJson(riskFactorJson, RiskFactor.class);
            int id = riskFactor.getId();
            int eiId = riskFactor.getEiId();
            double A = riskFactor.getA();
            double B = riskFactor.getB();
            double C = riskFactor.getC();
            double D = riskFactor.getD();
            double E = riskFactor.getE();
            riskFactorService.update(id, eiId, A, B, C, D, E);
            return ResultInfo.success("修改成功", riskFactor);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", riskFactorJson);
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
            if (riskFactorService.delete(idList)) {
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
            Sheet sheet = wb.getSheet("风险因素");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                RiskFactor riskFactor = new RiskFactor();
                //获取第i行
                Row row = sheet.getRow(i);
                //姓名
                Cell fullName = row.getCell(0);
                //单位
                Cell department2 = row.getCell(1);
                //层级
                Cell department1 = row.getCell(2);
                if (fullName != null && department2 != null && department1 != null) {
                    fullName.setCellType(CellType.STRING);
                    department2.setCellType(CellType.STRING);
                    department1.setCellType(CellType.STRING);
                    //查询基本信息id
                    List<EssentialInfo> eiIdList = essentialInfoService.getEiId2(fullName.getStringCellValue(), department2.getStringCellValue(), department1.getStringCellValue());
                    riskFactor.setEiId(eiIdList.get(0).getId());
                }
                //A
                Cell A = row.getCell(3);
                if (A != null) {
                    A.setCellType(CellType.NUMERIC);
                    riskFactor.setA(A.getNumericCellValue());
                }
                //B
                Cell B = row.getCell(4);
                if (B != null) {
                    B.setCellType(CellType.NUMERIC);
                    riskFactor.setB(B.getNumericCellValue());
                }
                //C
                Cell C = row.getCell(5);
                if (C != null) {
                    C.setCellType(CellType.NUMERIC);
                    riskFactor.setC(C.getNumericCellValue());
                }
                //D
                Cell D = row.getCell(6);
                if (D != null) {
                    D.setCellType(CellType.NUMERIC);
                    riskFactor.setD(D.getNumericCellValue());
                }
                //E
                Cell E = row.getCell(7);
                if (E != null) {
                    E.setCellType(CellType.NUMERIC);
                    riskFactor.setE(E.getNumericCellValue());
                }
                //保存到数据库
                riskFactorService.add(riskFactor);
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
