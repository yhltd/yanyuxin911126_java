function getList() {
    $("#department2").empty();
    $ajax({
        type: 'post',
        url: '/essential_info/getDepartment2',
    }, false, '', function (res) {
        if (res.code == 200) {
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].department2 != '') {
                    $("#department2").append("<option value='" + res.data[i].department2 + "'>" + res.data[i].department2 + "</option>")
                }
            }
        }
        console.log(res)
    })
}

$(function () {
    getList();

    //选择部门
    $("#department2").change(function () {
        $ajax({
            type: 'post',
            url: '/essential_info/getList',
        }, false, '', function (res) {
            if (res.code == 200) {
                var zc_num = 0;
                var fc_num = 0;
                var age = 0;
                var count1 = 0;
                var count2 = 0;
                var count3 = 0;
                var count4 = 0;
                var maxAge = 0;
                var minAge = 0;
                for (var i = 0; i < res.data.length; i++) {
                    //正处和副处人数
                    if (res.data[i].level == '正处级' && res.data[i].department2 == $('#department2').val()) {
                        zc_num = zc_num + 1;
                    } else if (res.data[i].level == '副处级' && res.data[i].department2 == $('#department2').val()) {
                        fc_num = fc_num + 1;
                    }
                    //平均年龄
                    if (res.data[i].age != null && res.data[i].department2 == $('#department2').val()) {
                        age = age + parseFloat(res.data[i].age);
                        count1 = count1 + 1
                    }
                    //50-55年龄占比
                    if (res.data[i].age >= 50 && res.data[i].age <= 55 && res.data[i].department2 == $('#department2').val()) {
                        count2 = count2 + 1
                    }
                    //40-49年龄占比
                    if (res.data[i].age >= 40 && res.data[i].age <= 49 && res.data[i].department2 == $('#department2').val()) {
                        count3 = count3 + 1
                    }
                    //30-39年龄占比
                    if (res.data[i].age >= 30 && res.data[i].age <= 39 && res.data[i].department2 == $('#department2').val()) {
                        count4 = count4 + 1
                    }
                    if (maxAge == 0 && res.data[i].department2 == $('#department2').val()) {
                        maxAge = res.data[i].age;
                    } else if (minAge != 0 && res.data[i].department2 == $('#department2').val()) {
                        if (maxAge < res.data[i].age) {
                            maxAge = res.data[i].age;
                        }
                    }
                    if (minAge == 0 && res.data[i].department2 == $('#department2').val()) {
                        minAge = res.data[i].age;
                    } else if (minAge != 0 && res.data[i].department2 == $('#department2').val()) {
                        if (minAge < res.data[i].age) {
                            minAge = res.data[i].age;
                        }
                    }
                }
                $('#zhengzhi').text(zc_num);
                $('#fuzhi').text(fc_num);
                if (count1 != 0) {
                    $('#averageAge').text((age / count1).toFixed(2));
                    $('#average50_55').text(Number(count2 / count1 * 100).toFixed(2) + "%");
                    $('#average40_49').text(Number(count3 / count1 * 100).toFixed(2) + "%");
                    $('#average30_39').text(Number(count4 / count1 * 100).toFixed(2) + "%");
                    $('#ageRange').text(maxAge - minAge);

                    if (age / count1 > 47) {
                        $('#risk1').text('平均年龄过大')
                    } else if (age / count1 < 43) {
                        $('#risk1').text('平均年龄过小')
                    }

                    if (count2 / count1 > 0.3) {
                        $('#risk2').text("年龄结构不合理，【50,55】年龄段人数过多");
                    }
                    if (count3 / count1 < 0.25) {
                        $('#risk3').text("存在即将退休人员，需考虑人员接替");
                    }
                    if (count4 / count1 < 0.25) {
                        $('#risk4').text("年轻人员过少，需考虑年轻人员储备");
                    }
                    if (maxAge - minAge < 10) {
                        $('#risk5').text("年龄极差过小");
                    }
                }
            }
            //关键专业
            $ajax({
                type: 'post',
                url: '/key_major/getList',
            }, false, '', function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.code == 200) {
                        var zczz = "";
                        var zcfz = "";
                        var dwsj = "";

                        for (var i = 0; i < res.data.length; i++) {
                            if ($('#department2').val() == res.data[i].department) {
                                if (res.data[i].level == "中层正职") {
                                    zczz = zczz + res.data[i].a + res.data[i].b + res.data[i].c + res.data[i].d + res.data[i].e + res.data[i].f + res.data[i].g + res.data[i].h + res.data[i].i + res.data[i].j
                                } else if (res.data[i].level == "中层副职") {
                                    zcfz = zcfz + res.data[i].a + res.data[i].b + res.data[i].c + res.data[i].d + res.data[i].e + res.data[i].f + res.data[i].g + res.data[i].h + res.data[i].i + res.data[i].j
                                } else if (res.data[i].level == "党委书记") {
                                    dwsj = dwsj + res.data[i].a + res.data[i].b + res.data[i].c + res.data[i].d + res.data[i].e + res.data[i].f + res.data[i].g + res.data[i].h + res.data[i].i + res.data[i].j
                                }
                            }
                        }
                        $('#zczz').text(zczz.replace("null", ""))
                        $('#zcfz').text(zcfz.replace("null", ""))
                        $('#dwsj').text(dwsj.replace("null", ""))
                    }

                }
            })
            //关键专业配置表
            $ajax({
                type: 'post',
                url: '/configuration/getList',
            }, false, '', function (res) {
                if (res.code == 200) {
                    for (var i = 0; i < res.data.length; i++) {
                        var keyBusiness = "";
                        var isNecessary = "";
                        for (var i = 0; i < res.data.length; i++) {
                            if ($('#department2').val() == res.data[i].department) {
                                if (res.data[i].keyBusiness != null) {
                                    keyBusiness = keyBusiness + " " + res.data[i].keyBusiness
                                }
                                if (res.data[i].expertise != null) {
                                    isNecessary = isNecessary + " " + res.data[i].expertise
                                }
                            }
                        }
                        $('#keyBusiness').text(keyBusiness)
                        $('#isNecessary').text(isNecessary)
                    }
                }
            })
            //
            $ajax({
                type: 'post',
                url: '/essential_info/getAverageDepartment',
            }, false, '', function (res) {
                if (res.code == 200) {
                    var d = 0;
                    var e = 0;
                    var f = 0;
                    var g = 0;
                    var h = 0;
                    var ii = 0;
                    var j = 0;
                    var k = 0;
                    var l = 0;
                    var m = 0;
                    var n = 0;
                    var o = 0;
                    var p = 0;
                    var q = 0;
                    var r = 0;
                    var count = 0;
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].department2 == $('#department2').val()) {
                            $('#d').text(res.data[i].d);
                            $('#e').text(res.data[i].e);
                            $('#f').text(res.data[i].f);
                            $('#g').text(res.data[i].g);
                            $('#h').text(res.data[i].h);
                            $('#i').text(res.data[i].i);
                            $('#j').text(res.data[i].j);
                            $('#k').text(res.data[i].k);
                            $('#l').text(res.data[i].l);
                            $('#m').text(res.data[i].m);
                            $('#n').text(res.data[i].n);
                            $('#o').text(res.data[i].o);
                            $('#p').text(res.data[i].p);
                            $('#q').text(res.data[i].q);
                            $('#r').text(res.data[i].r);
                        }
                        d = d + parseFloat(res.data[i].d);
                        e = e + parseFloat(res.data[i].e);
                        f = f + parseFloat(res.data[i].f);
                        g = g + parseFloat(res.data[i].g);
                        h = h + parseFloat(res.data[i].h);
                        ii = ii + parseFloat(res.data[i].i);
                        j = j + parseFloat(res.data[i].j);
                        k = k + parseFloat(res.data[i].k);
                        l = l + parseFloat(res.data[i].l);
                        m = m + parseFloat(res.data[i].m);
                        n = n + parseFloat(res.data[i].n);
                        o = o + parseFloat(res.data[i].o);
                        p = p + parseFloat(res.data[i].p);
                        q = q + parseFloat(res.data[i].q);
                        r = r + parseFloat(res.data[i].r);
                        count = count + 1
                    }
                    if(count!=0){
                        if(parseFloat($('#d').text())>(d/count)){
                            $('#ddd').text("◆政治素养")
                        }else if(parseFloat($('#d').text())<d/count){
                            $('#dddd').text("◆政治素养")
                        }
                        if(parseFloat($('#e').text())>e/count){
                            $('#eee').text("◆团队管理")
                        }else if(parseFloat($('#e').text())<e/count){
                            $('#eeee').text("◆团队管理")
                        }
                        if(parseFloat($('#f').text())>f/count){
                            $('#fff').text("◆学习创新")
                        }else if(parseFloat($('#f').text())<f/count){
                            $('#ffff').text("◆学习创新")
                        }
                        if(parseFloat($('#g').text())>g/count){
                            $('#ggg').text("◆攻坚克难")
                        }else if(parseFloat($('#g').text())<g/count){
                            $('#gggg').text("◆攻坚克难")
                        }
                        if(parseFloat($('#h').text())>h/count){
                            $('#hhh').text("◆远见胆识")
                        }else if(parseFloat($('#h').text())<h/count){
                            $('#hhhh').text("◆远见胆识")
                        }
                        if(parseFloat($('#i').text())>ii/count){
                            $('#iii').text("◆经营思维")
                        }else if(parseFloat($('#i').text())<ii/count){
                            $('#iiii').text("◆经营思维")
                        }
                        if(parseFloat($('#j').text())>j/count){
                            $('#jjj').text("◆统筹协调")
                        }else if(parseFloat($('#j').text())<j/count){
                            $('#jjjj').text("◆统筹协调")
                        }
                        if(parseFloat($('#k').text())>k/count){
                            $('#kkk').text("◆推动落实")
                        }else if(parseFloat($('#k').text())<k/count){
                            $('#kkkk').text("◆推动落实")
                        }
                        if(parseFloat($('#l').text())>l/count){
                            $('#lll').text("◆沟通合作")
                        }else if(parseFloat($('#l').text())<l/count){
                            $('#llll').text("◆沟通合作")
                        }
                        if(parseFloat($('#m').text())>m/count){
                            $('#mmm').text("◆人际敏锐")
                        }else if(parseFloat($('#m').text())<m/count){
                            $('#mmmm').text("◆人际敏锐")
                        }
                        if(parseFloat($('#n').text())>n/count){
                            $('#nnn').text("◆政治敏锐")
                        }else if(parseFloat($('#n').text())<n/count){
                            $('#nnnn').text("◆政治敏锐")
                        }
                        if(parseFloat($('#o').text())>o/count){
                            $('#ooo').text("◆精益管理")
                        }else if(parseFloat($('#o').text())<o/count){
                            $('#oooo').text("◆精益管理")
                        }
                        if(parseFloat($('#p').text())>p/count){
                            $('#ppp').text("◆严谨细致")
                        }else if(parseFloat($('#p').text())<p/count){
                            $('#pppp').text("◆严谨细致")
                        }
                        if(parseFloat($('#q').text())>q/count){
                            $('#qqq').text("◆风险防范")
                        }else if(parseFloat($('#q').text())<q/count){
                            $('#qqqq').text("◆风险防范")
                        }
                        if(parseFloat($('#r').text())>r/count){
                            $('#rrr').text("◆专业管理")
                        }else if(parseFloat($('#r').text())<r/count){
                            $('#rrrr').text("◆专业管理")
                        }

                        $('#dd').text((d/count).toFixed(2));
                        $('#ee').text((e/count).toFixed(2));
                        $('#ff').text((f/count).toFixed(2));
                        $('#gg').text((g/count).toFixed(2));
                        $('#hh').text((h/count).toFixed(2));
                        $('#ii').text((ii/count).toFixed(2));
                        $('#jj').text((j/count).toFixed(2));
                        $('#kk').text((k/count).toFixed(2));
                        $('#ll').text((l/count).toFixed(2));
                        $('#mm').text((m/count).toFixed(2));
                        $('#nn').text((n/count).toFixed(2));
                        $('#oo').text((o/count).toFixed(2));
                        $('#pp').text((p/count).toFixed(2));
                        $('#qq').text((q/count).toFixed(2));
                        $('#rr').text((r/count).toFixed(2));
                    }
                }
            })
        })

    })

})