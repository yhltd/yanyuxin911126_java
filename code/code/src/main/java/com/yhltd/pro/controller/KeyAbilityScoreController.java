package com.yhltd.pro.controller;

import com.yhltd.pro.entity.EssentialInfo;
import com.yhltd.pro.entity.KeyAbilityScore;
import com.yhltd.pro.entity.Performance;
import com.yhltd.pro.service.EssentialInfoService;
import com.yhltd.pro.service.KeyAbilityScoreService;
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
@RequestMapping("/keyabilityscore")
public class KeyAbilityScoreController {
    @Autowired
    private KeyAbilityScoreService keyAbilityScoreService;
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
            List<KeyAbilityScore> list = keyAbilityScoreService.getList();
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
            List<KeyAbilityScore> list = keyAbilityScoreService.getListByName(fullName,department);
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
            KeyAbilityScore keyAbilityScore = gsonUtil.toEntity(gsonUtil.get("keyAbilityScore"), KeyAbilityScore.class);
            if (keyAbilityScoreService.add(keyAbilityScore)) {
                return ResultInfo.success("添加成功", keyAbilityScore);
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
     * @param keyAbilityScoreJson 要修改的json
     * @return ResultInfo
     */
    @PostMapping("/update")
    public ResultInfo update(@RequestBody String keyAbilityScoreJson) {
        try {
            KeyAbilityScore keyAbilityScore = DecodeUtil.decodeToJson(keyAbilityScoreJson, KeyAbilityScore.class);
            int id = keyAbilityScore.getId();
            int eiId = keyAbilityScore.getEiId();
            String D = keyAbilityScore.getD();
            String E = keyAbilityScore.getE();
            String F = keyAbilityScore.getF();
            String G = keyAbilityScore.getG();
            String H = keyAbilityScore.getH();
            String I = keyAbilityScore.getI();
            String J = keyAbilityScore.getJ();
            String K = keyAbilityScore.getK();
            String L = keyAbilityScore.getL();
            String M = keyAbilityScore.getM();
            String N = keyAbilityScore.getN();
            String O = keyAbilityScore.getO();
            String P = keyAbilityScore.getP();
            String Q = keyAbilityScore.getQ();
            String R = keyAbilityScore.getR();
            keyAbilityScoreService.update(id, eiId, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R);
            return ResultInfo.success("修改成功", keyAbilityScore);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", keyAbilityScoreJson);
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
            if (keyAbilityScoreService.delete(idList)) {
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
            Sheet sheet = wb.getSheet("关键能力得分");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                KeyAbilityScore keyAbilityScore = new KeyAbilityScore();
                //获取第i行
                Row row = sheet.getRow(i);
                //姓名
                Cell fullName = row.getCell(0);
                //department2
                Cell department2 = row.getCell(1);
                //department1
                Cell department1 = row.getCell(2);
                //查询基本信息id
                if (fullName != null && department2 != null && department1 != null) {
                    fullName.setCellType(CellType.STRING);
                    department2.setCellType(CellType.STRING);
                    department1.setCellType(CellType.STRING);
                    List<EssentialInfo> eiIdList = essentialInfoService.getEiId2(fullName.getStringCellValue(), department2.getStringCellValue(), department1.getStringCellValue());
                    keyAbilityScore.setEiId(eiIdList.get(0).getId());
                }
                //D
                Cell D = row.getCell(3);
                if (D != null) {
                    D.setCellType(CellType.STRING);
                    keyAbilityScore.setD(D.getStringCellValue());
                }
                //E
                Cell E = row.getCell(4);
                if (E != null) {
                    E.setCellType(CellType.STRING);
                    keyAbilityScore.setE(E.getStringCellValue());
                }
                //F
                Cell F = row.getCell(5);
                if (F != null) {
                    F.setCellType(CellType.STRING);
                    keyAbilityScore.setF(F.getStringCellValue());
                }
                //G
                Cell G = row.getCell(6);
                if (G != null) {
                    G.setCellType(CellType.STRING);
                    keyAbilityScore.setG(G.getStringCellValue());
                }
                //H
                Cell H = row.getCell(7);
                if (H != null) {
                    H.setCellType(CellType.STRING);
                    keyAbilityScore.setH(H.getStringCellValue());
                }

                //I
                Cell I = row.getCell(8);
                if (I != null) {
                    I.setCellType(CellType.STRING);
                    keyAbilityScore.setI(I.getStringCellValue());
                }
                //J
                Cell J = row.getCell(9);
                if (J != null) {
                    J.setCellType(CellType.STRING);
                    keyAbilityScore.setJ(J.getStringCellValue());
                }
                //K
                Cell K = row.getCell(10);
                if (K != null) {
                    K.setCellType(CellType.STRING);
                    keyAbilityScore.setD(K.getStringCellValue());
                }
                //L
                Cell L = row.getCell(11);
                if (L != null) {
                    L.setCellType(CellType.STRING);
                    keyAbilityScore.setL(L.getStringCellValue());
                }
                //M
                Cell M = row.getCell(12);
                if (M != null) {
                    M.setCellType(CellType.STRING);
                    keyAbilityScore.setM(M.getStringCellValue());
                }
                //N
                Cell N = row.getCell(13);
                if (N != null) {
                    N.setCellType(CellType.STRING);
                    keyAbilityScore.setN(N.getStringCellValue());
                }
                //O
                Cell O = row.getCell(14);
                if (O != null) {
                    O.setCellType(CellType.STRING);
                    keyAbilityScore.setO(O.getStringCellValue());
                }
                //P
                Cell P = row.getCell(15);
                if (P != null) {
                    P.setCellType(CellType.STRING);
                    keyAbilityScore.setP(P.getStringCellValue());
                }
                //Q
                Cell Q = row.getCell(16);
                if (Q != null) {
                    Q.setCellType(CellType.STRING);
                    keyAbilityScore.setQ(Q.getStringCellValue());
                }
                //R
                Cell R = row.getCell(17);
                if (R != null) {
                    R.setCellType(CellType.STRING);
                    keyAbilityScore.setR(R.getStringCellValue());
                }
                //保存到数据库
                keyAbilityScoreService.add(keyAbilityScore);
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
