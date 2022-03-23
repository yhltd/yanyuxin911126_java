package com.yhltd.pro.controller;

import com.yhltd.pro.entity.Configuration;
import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.entity.KeyMajor;
import com.yhltd.pro.entity.Performance;
import com.yhltd.pro.service.ConfigurationService;
import com.yhltd.pro.service.EssentialInfoService;
import com.yhltd.pro.service.KeyMajorService;
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
 * @date 2022/02/07 14:56
 */
@Slf4j
@RestController
@RequestMapping("/key_major")
public class KeyMajorController {
    @Autowired
    private KeyMajorService keyMajorService;
    @Autowired
    private ConfigurationService configurationService;
    @Autowired
    private EssentialInfoService essentialInfoService;

    /**
     * 查询所有数据
     *
     * @return ResultInfo
     */
    @PostMapping("/getList")
    public ResultInfo getList() {
        try {
            List<KeyMajor> list = keyMajorService.getList();
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
     * 根据姓名查询所有数据
     *
     * @param fullName 姓名
     * @return ResultInfo
     */
    @PostMapping("/getListByName")
    public ResultInfo getListByName(String fullName,String department) {
        try {
            List<KeyMajor> list = keyMajorService.getListByName(fullName,department);
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
            KeyMajor keyMajor = gsonUtil.toEntity(gsonUtil.get("keyMajor"), KeyMajor.class);
//            keyMajor.setDepartment(keyMajor.getDepartment().trim());
//            keyMajor.setA(keyMajor.getA().trim());
//            keyMajor.setB(keyMajor.getB().trim());
//            keyMajor.setC(keyMajor.getC().trim());
//            keyMajor.setD(keyMajor.getD().trim());
//            keyMajor.setE(keyMajor.getE().trim());
//            keyMajor.setF(keyMajor.getF().trim());
//            keyMajor.setG(keyMajor.getG().trim());
//            keyMajor.setH(keyMajor.getH().trim());
//            keyMajor.setI(keyMajor.getI().trim());
//            keyMajor.setJ(keyMajor.getJ().trim());
            if (keyMajorService.add(keyMajor)) {
                return ResultInfo.success("添加成功", keyMajor);
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
     * @param keyMajorJson 要修改的json
     * @return ResultInfo
     */
    @PostMapping("/update")
    public ResultInfo update(@RequestBody String keyMajorJson) {
        try {
            KeyMajor keyMajor = DecodeUtil.decodeToJson(keyMajorJson, KeyMajor.class);
            int id = keyMajor.getId();
            int eiId = keyMajor.getEiId();
            String department = keyMajor.getDepartment();
            String A = keyMajor.getA();
            String B = keyMajor.getB();
            String C = keyMajor.getC();
            String D = keyMajor.getD();
            String E = keyMajor.getE();
            String F = keyMajor.getF();
            String G = keyMajor.getG();
            String H = keyMajor.getH();
            String I = keyMajor.getI();
            String J = keyMajor.getJ();
            keyMajorService.update(id, eiId, department, A, B, C, D, E, F, G, H, I, J);
            return ResultInfo.success("修改成功", keyMajor);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", keyMajorJson);
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
            if (keyMajorService.delete(idList)) {
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
     * 查询配置表部门
     *
     * @return ResultInfo
     */
    @PostMapping("/getDepartment")
    public ResultInfo getDepartment() {
        try {
            List<Configuration> list = configurationService.getDepartment();
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
     * 查询配置表部门
     *
     * @return ResultInfo
     */
    @PostMapping("/getSecondaryMenu")
    public ResultInfo getSecondaryMenu(String department) {
        try {
            List<Configuration> list = configurationService.getSecondaryMenu(department);
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
            Sheet sheet = wb.getSheet("关键专业");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                KeyMajor keyMajor = new KeyMajor();
                //获取第i行
                Row row = sheet.getRow(i);
                //姓名
                Cell fullName = row.getCell(0);
                //层级
                Cell level = row.getCell(2);
                if (fullName != null && level != null) {
                    fullName.setCellType(CellType.STRING);
                    level.setCellType(CellType.STRING);
                    //查询基本信息id
                    List<EssentialInfo> eiIdList = essentialInfoService.getEiId3(fullName.getStringCellValue(), level.getStringCellValue());
                    keyMajor.setEiId(eiIdList.get(0).getId());
                }
                //单位
                Cell department = row.getCell(1);
                if (department != null) {
                    department.setCellType(CellType.STRING);
                    keyMajor.setDepartment(department.getStringCellValue());
                }
                //A
                Cell A = row.getCell(3);
                if (A != null) {
                    A.setCellType(CellType.STRING);
                    keyMajor.setA(A.getStringCellValue());
                }
                //B
                Cell B = row.getCell(4);
                if (B != null) {
                    B.setCellType(CellType.STRING);
                    keyMajor.setB(B.getStringCellValue());
                }
                //C
                Cell C = row.getCell(5);
                if (C != null) {
                    C.setCellType(CellType.STRING);
                    keyMajor.setC(C.getStringCellValue());
                }
                //D
                Cell D = row.getCell(6);
                if (D != null) {
                    D.setCellType(CellType.STRING);
                    keyMajor.setD(D.getStringCellValue());
                }
                //E
                Cell E = row.getCell(7);
                if (E != null) {
                    E.setCellType(CellType.STRING);
                    keyMajor.setE(E.getStringCellValue());
                }
                //F
                Cell F = row.getCell(8);
                if (F != null) {
                    F.setCellType(CellType.STRING);
                    keyMajor.setF(F.getStringCellValue());
                }
                //G
                Cell G = row.getCell(9);
                if (G != null) {
                    G.setCellType(CellType.STRING);
                    keyMajor.setG(G.getStringCellValue());
                }
                //H
                Cell H = row.getCell(10);
                if (H != null) {
                    H.setCellType(CellType.STRING);
                    keyMajor.setH(H.getStringCellValue());
                }
                //I
                Cell I = row.getCell(11);
                if (I != null) {
                    I.setCellType(CellType.STRING);
                    keyMajor.setI(I.getStringCellValue());
                }
                //J
                Cell J = row.getCell(12);
                if (J != null) {
                    J.setCellType(CellType.STRING);
                    keyMajor.setJ(J.getStringCellValue());
                }
                //保存到数据库
                keyMajorService.add(keyMajor);
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
