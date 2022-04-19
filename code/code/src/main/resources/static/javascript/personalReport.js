function getEssentialList() {
    $ajax({
        type: 'post',
        url: '/essential_info/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setShowEssentialTable(res.data);
            $('#show-essential-modal').modal('show');
        }
        console.log(res)
    })
}

function uniq(array) {
    let temp = []; //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i].id) == -1) {
            temp.push(array[i]);
        }
    }
    return temp;
}

function uniq_2(array) {
    let temp = []; //一个新的临时数组
    for (var i = 0; i < array.length-1; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i].id == array[j].id){
                array.splice(j,1);
                j--;
            }
        }
    }
    return array;
}

$(function () {
    //点击选择基本信息按钮
    $('#refresh-btn').click(function () {
        getEssentialList();
    })

    //基本信息关闭按钮
    $("#essential-close-btn").click(function () {
        $('#show-essential-modal').modal('hide');
    })

    //基本信息确定按钮
    $("#essential-submit-btn").click(function () {
        $('#fullName').text("");
        $('#secondaryUnit').text("");
        $('#post').text("");
        $('#department1').text("");
        $('#riqi').text("");
        $('#education').text("");
        $('#nian1').text("");
        $('#nian2').text("");
        $('#nian3').text("");
        $('#score1').text("");
        $('#score2').text("");
        $('#score3').text("");
        $('#average').text("");
        $('#ranking').text("");
        $('#ranking2').text("");
        $('#d').text("");
        $('#dd').text("");
        $('#e').text("");
        $('#ee').text("");
        $('#f').text("");
        $('#ff').text("");
        $('#g').text("");
        $('#gg').text("");
        $('#h').text("");
        $('#hh').text("");
        $('#i').text("");
        $('#ii').text("");
        $('#j').text("");
        $('#jj').text("");
        $('#k').text("");
        $('#kk').text("");
        $('#l').text("");
        $('#ll').text("");
        $('#m').text("");
        $('#mm').text("");
        $('#n').text("");
        $('#nn').text("");
        $('#o').text("");
        $('#oo').text("");
        $('#p').text("");
        $('#pp').text("");
        $('#q').text("");
        $('#qq').text("");
        $('#r').text("");
        $('#rr').text("");
        $('#average2').text("");
        $('#paiming').text("");
        $('#keyMajor').text("");
        $('#fullMark').text("");
        $('#keyExperienceScore').text("");


        let eiId = 0;
        let rows = getTableSelection("#show-table-essential");
        if (rows.length == 1) {
            $.each(rows, function (index, row) {
                eiId = row.data.id;
            })
            //关键绩效
            $ajax({
                type: 'post',
                url: '/keyperformance/getList',
            }, false, '', function (res) {
                var average = 0;
                var count = 0;
                if (res.code == 200) {
                    for (var i = 0; i < res.data.length; i++) {
                        //排名位置计算
                        var this_paiming = res.data[i].ranking / res.data[i].renshuSum
                        this_paiming = (Math.round(this_paiming * 10000) / 100).toFixed(0) + '%'
                        res.data[i].paiming = this_paiming

                        //档位计算
                        var this_renshu_sum = res.data[i].renshuSum
                        if (this_renshu_sum >= 10) {
                            if (Number(this_paiming.replace("%", "")) <= 10) {
                                res.data[i].dangwei = 1
                            } else if (Number(this_paiming.replace("%", "")) <= 20) {
                                res.data[i].dangwei = 2
                            } else if (Number(this_paiming.replace("%", "")) <= 80) {
                                res.data[i].dangwei = 3
                            } else if (Number(this_paiming.replace("%", "")) <= 90) {
                                res.data[i].dangwei = 4
                            } else {
                                res.data[i].dangwei = 5
                            }
                        } else if (this_renshu_sum == 8) {
                            if (Number(this_paiming.replace("%", "")) == 100) {
                                res.data[i].dangwei = 1
                            } else if (Number(this_paiming.replace("%", "")) == 200) {
                                res.data[i].dangwei = 2
                            } else if (Number(this_paiming.replace("%", "")) == 300 || Number(this_paiming.replace("%", "")) == 400) {
                                res.data[i].dangwei = 3
                            } else if (Number(this_paiming.replace("%", "")) == 500 || Number(this_paiming.replace("%", "")) == 600) {
                                res.data[i].dangwei = 4
                            } else {
                                res.data[i].dangwei = 5
                            }
                        } else if (this_renshu_sum == 7) {
                            if (Number(this_paiming.replace("%", "")) == 100) {
                                res.data[i].dangwei = 1
                            } else if (Number(this_paiming.replace("%", "")) == 200) {
                                res.data[i].dangwei = 2
                            } else if (Number(this_paiming.replace("%", "")) == 300) {
                                res.data[i].dangwei = 3
                            } else if (Number(this_paiming.replace("%", "")) == 400 || Number(this_paiming.replace("%", "")) == 500) {
                                res.data[i].dangwei = 4
                            } else {
                                res.data[i].dangwei = 5
                            }
                        } else if (this_renshu_sum == 6) {
                            if (Number(this_paiming.replace("%", "")) == 100) {
                                res.data[i].dangwei = 1
                            } else if (Number(this_paiming.replace("%", "")) == 200) {
                                res.data[i].dangwei = 2
                            } else if (Number(this_paiming.replace("%", "")) == 300) {
                                res.data[i].dangwei = 3
                            } else if (Number(this_paiming.replace("%", "")) == 400) {
                                res.data[i].dangwei = 4
                            } else {
                                res.data[i].dangwei = 5
                            }
                        } else if (this_renshu_sum == 5) {
                            if (Number(this_paiming.replace("%", "")) == 100) {
                                res.data[i].dangwei = 1
                            } else if (Number(this_paiming.replace("%", "")) == 200) {
                                res.data[i].dangwei = 2
                            } else if (Number(this_paiming.replace("%", "")) == 300) {
                                res.data[i].dangwei = 3
                            } else if (Number(this_paiming.replace("%", "")) == 400) {
                                res.data[i].dangwei = 4
                            } else {
                                res.data[i].dangwei = 5
                            }
                        } else if (this_renshu_sum == 4) {
                            if (Number(this_paiming.replace("%", "")) == 100) {
                                res.data[i].dangwei = 1
                            } else if (Number(this_paiming.replace("%", "")) == 200) {
                                res.data[i].dangwei = 2
                            } else if (Number(this_paiming.replace("%", "")) == 300) {
                                res.data[i].dangwei = 3
                            } else {
                                res.data[i].dangwei = 4
                            }
                        } else if (this_renshu_sum == 3) {
                            if (Number(this_paiming.replace("%", "")) == 100) {
                                res.data[i].dangwei = 1
                            } else if (Number(this_paiming.replace("%", "")) == 200) {
                                res.data[i].dangwei = 2
                            } else {
                                res.data[i].dangwei = 3
                            }
                        } else if (this_renshu_sum == 2) {
                            if (Number(this_paiming.replace("%", "")) == 100) {
                                res.data[i].dangwei = 1
                            } else {
                                res.data[i].dangwei = 2
                            }
                        } else if (this_renshu_sum == 1) {
                            if (Number(this_paiming.replace("%", "")) == 100) {
                                res.data[i].dangwei = 1
                            }
                        } else {
                            res.data[i].dangwei = ''
                        }

                        //绩效赋分计算
                        var this_dangwei = res.data[i].dangwei
                        if (this_dangwei == 1) {
                            res.data[i].jixiao = 100
                        } else if (this_dangwei == 2) {
                            res.data[i].jixiao = 90
                        } else if (this_dangwei == 3) {
                            res.data[i].jixiao = 80
                        } else if (this_dangwei == 4) {
                            res.data[i].jixiao = 70
                        } else if (this_dangwei == 5) {
                            res.data[i].jixiao = 60
                        } else {
                            res.data[i].jixiao = ''
                        }

                    }
                    for (var i = 0; i < res.data.length; i++) {
                        var this_renyuan_name = res.data[i].fullName
                        var this_guanjianjixiao = 0
                        var this_num = 0
                        for (var j = 0; j < res.data.length; j++) {
                            if (res.data[j].fullName == this_renyuan_name) {
                                this_guanjianjixiao = this_guanjianjixiao + res.data[j].jixiao
                                this_num = this_num + 1
                            }
                        }
                        if (this_num == 0) {
                            this_guanjianjixiao = ''
                            res.data[i].guanjianjixiao = this_guanjianjixiao
                        } else {
                            res.data[i].guanjianjixiao = this_guanjianjixiao / this_num
                        }

                    }
                    var arr = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].id == eiId) {
                            if ($('#nian1').text() == "") {
                                $("#nian1").text(res.data[i].nian);
                                $("#score1").text(res.data[i].jixiao);
                                average = average + res.data[i].jixiao;
                                count = count + 1;
                            } else if ($('#nian2').text() == "") {
                                $("#nian2").text(res.data[i].nian);
                                $("#score2").text(res.data[i].jixiao);
                                average = average + res.data[i].jixiao;
                                count = count + 1;
                            } else if ($('#nian3').text() == "") {
                                $("#nian3").text(res.data[i].nian);
                                $("#score3").text(res.data[i].jixiao);
                                average = average + res.data[i].jixiao;
                                count = count + 1;
                            }
                        }
                        if (arr.indexOf(res.data[i].id) == -1 && res.data[i].id != eiId) {
                            arr.push(res.data[i])
                        }
                    }
                    if (count != 0) {
                        $("#average").text((average / count).toFixed(2));
                    }
                    var junfen = (average / count).toFixed(2);
                    var ranking2 = 1;
                    count = 1;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].jixiao > junfen && arr[i].department1 == $('#department1').text()) {
                            ranking2 = ranking2 + 1;
                        }
                        if (arr[i].department1 == $('#department1').text()) {
                            count = count + 1
                        }
                    }
                    $("#ranking2").text(ranking2 + "/" + count);

                    var count = 0;
                    var renshu = 0;
                    console.log("a")
                    console.log(uniq(res.data))
                    for (var i = 0; i < uniq(res.data).length; i++) {
                        if (parseFloat($('#average').text()) < uniq(res.data)[i].jixiao) {
                            count = count + 1
                        }
                        renshu = renshu + 1
                    }

                    var renshu_list = uniq_2(res.data)
                    console.log(renshu_list)
                    $('#ranking').text(count + 1 + "/" + uniq_2(res.data).length);
                    $('#show-essential-modal').modal('hide');
                }
                console.log(res)
            })

            //关键绩效排名
            // $ajax({
            //     type: 'post',
            //     url: '/keyperformance/getScore',
            //     data: {
            //         eiId: eiId
            //     }
            // }, false, '', function (res) {
            //     if (res.code == 200) {
            //         console.log(parseFloat($('#average').text()));
            //         var count = 0;
            //         var renshu = 0;
            //         for (var i = 0; i < res.data.length; i++) {
            //             if (parseFloat($('#average').text()) < res.data[i].jixiao) {
            //                 count = count + 1
            //             }
            //             renshu = renshu + 1
            //         }
            //     }
            //     $('#ranking').text(count + 1 + "/" + renshu);
            // })


            //关键能力
            $ajax({
                type: 'post',
                url: '/essential_info/keyAbilityScore',
                data: {
                    eiId: eiId
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    var sum = 0;
                    var count = 0;
                    if (res.data.length > 0) {
                        if (res.data[0].d != null && res.data[0].d != '') {
                            $('#d').text(res.data[0].d);
                            sum = sum + parseFloat(res.data[0].d);
                            count = count + 1
                        }
                        if (res.data[0].e != null && res.data[0].e != '') {
                            $('#e').text(res.data[0].e);
                            sum = sum + parseFloat(res.data[0].e);
                            count = count + 1
                        }
                        if (res.data[0].f != null && res.data[0].f != '') {
                            $('#f').text(res.data[0].f);
                            sum = sum + parseFloat(res.data[0].f);
                            count = count + 1
                        }
                        if (res.data[0].g != null && res.data[0].g != '') {
                            $('#g').text(res.data[0].g);
                            sum = sum + parseFloat(res.data[0].g);
                            count = count + 1
                        }
                        if (res.data[0].h != null && res.data[0].h != '') {
                            $('#h').text(res.data[0].h);
                            sum = sum + parseFloat(res.data[0].h);
                            count = count + 1
                        }
                        if (res.data[0].i != null && res.data[0].i != '') {
                            $('#i').text(res.data[0].i);
                            sum = sum + parseFloat(res.data[0].i);
                            count = count + 1
                        }
                        if (res.data[0].j != null && res.data[0].j != '') {
                            $('#j').text(res.data[0].j);
                            sum = sum + parseFloat(res.data[0].j);
                            count = count + 1
                        }
                        if (res.data[0].k != null && res.data[0].k != '') {
                            $('#k').text(res.data[0].k);
                            sum = sum + parseFloat(res.data[0].k);
                            count = count + 1
                        }
                        if (res.data[0].l != null && res.data[0].l != '') {
                            $('#l').text(res.data[0].l);
                            sum = sum + parseFloat(res.data[0].l);
                            count = count + 1
                        }
                        if (res.data[0].m != null && res.data[0].m != '') {
                            $('#m').text(res.data[0].m);
                            sum = sum + parseFloat(res.data[0].m);
                            count = count + 1
                        }
                        if (res.data[0].n != null && res.data[0].n != '') {
                            $('#n').text(res.data[0].n);
                            sum = sum + parseFloat(res.data[0].n);
                            count = count + 1
                        }
                        if (res.data[0].o != null && res.data[0].o != '') {
                            $('#o').text(res.data[0].o);
                            sum = sum + parseFloat(res.data[0].o);
                            count = count + 1
                        }
                        if (res.data[0].p != null && res.data[0].p != '') {
                            $('#p').text(res.data[0].p);
                            sum = sum + parseFloat(res.data[0].p);
                            count = count + 1
                        }
                        if (res.data[0].q != null && res.data[0].q != '') {
                            $('#q').text(res.data[0].q);
                            sum = sum + parseFloat(res.data[0].q);
                            count = count + 1
                        }
                        if (res.data[0].r != null && res.data[0].r != '') {
                            $('#r').text(res.data[0].r);
                            sum = sum + parseFloat(res.data[0].r);
                            count = count + 1
                        }
                    }
                    $('#show-essential-modal').modal('hide');
                    if (count != 0) {
                        $('#average2').text((sum / count).toFixed(2))
                    }
                }
                console.log(res)
            })

            //关键能力均分
            $ajax({
                type: 'post',
                url: '/essential_info/getAverage',
            }, false, '', function (res) {
                if (res.data.length > 0 && res.code == 200) {
                    var d = res.data[0].d;
                    if (res.data[0].d != null) {
                        $('#dd').text(parseFloat(res.data[0].d).toFixed(2));
                    }
                    if (res.data[0].e != null) {
                        $('#ee').text(parseFloat(res.data[0].e).toFixed(2));
                    }
                    if (res.data[0].f != null) {
                        $('#ff').text(parseFloat(res.data[0].f).toFixed(2));
                    }
                    if (res.data[0].g != null) {
                        $('#gg').text(parseFloat(res.data[0].g).toFixed(2));
                    }
                    if (res.data[0].h != null) {
                        $('#hh').text(parseFloat(res.data[0].h).toFixed(2));
                    }
                    if (res.data[0].i != null) {
                        $('#ii').text(parseFloat(res.data[0].i).toFixed(2));
                    }
                    if (res.data[0].j != null) {
                        $('#jj').text(parseFloat(res.data[0].j).toFixed(2));
                    }
                    if (res.data[0].k != null) {
                        $('#kk').text(parseFloat(res.data[0].k).toFixed(2));
                    }
                    if (res.data[0].l != null) {
                        $('#ll').text(parseFloat(res.data[0].l).toFixed(2));
                    }
                    if (res.data[0].m != null) {
                        $('#mm').text(parseFloat(res.data[0].m).toFixed(2));
                    }
                    if (res.data[0].n != null) {
                        $('#nn').text(parseFloat(res.data[0].n).toFixed(2));
                    }
                    if (res.data[0].o != null) {
                        $('#oo').text(parseFloat(res.data[0].o).toFixed(2));
                    }
                    if (res.data[0].p != null) {
                        $('#pp').text(parseFloat(res.data[0].p).toFixed(2));
                    }
                    if (res.data[0].q != null) {
                        $('#qq').text(parseFloat(res.data[0].q).toFixed(2));
                    }
                    if (res.data[0].r != null) {
                        $('#rr').text(parseFloat(res.data[0].r).toFixed(2));
                    }
                }
            })
            //关键能力均分排名
            $ajax({
                type: 'post',
                url: '/keyabilityscore/getList',
            }, false, '', function (res) {
                if (res.data.length > 0 && res.code == 200) {
                    for (var i = 0; i < res.data.length; i++) {
                        var sum = 0;
                        var count = 0;
                        if (isNaN(parseFloat(res.data[i].d)) == false) {
                            sum = sum + parseFloat(res.data[i].d);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].e)) == false) {
                            sum = sum + parseFloat(res.data[i].e);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].f)) == false) {
                            sum = sum + parseFloat(res.data[i].f);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].g)) == false) {
                            sum = sum + parseFloat(res.data[i].g);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].h)) == false) {
                            sum = sum + parseFloat(res.data[i].h);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].i)) == false) {
                            sum = sum + parseFloat(res.data[i].i);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].j)) == false) {
                            sum = sum + parseFloat(res.data[i].j);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].k)) == false) {
                            sum = sum + parseFloat(res.data[i].k);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].l)) == false) {
                            sum = sum + parseFloat(res.data[i].l);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].m)) == false) {
                            sum = sum + parseFloat(res.data[i].m);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].n)) == false) {
                            sum = sum + parseFloat(res.data[i].n);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].o)) == false) {
                            sum = sum + parseFloat(res.data[i].o);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].p)) == false) {
                            sum = sum + parseFloat(res.data[i].p);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].q)) == false) {
                            sum = sum + parseFloat(res.data[i].q);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].r)) == false) {
                            sum = sum + parseFloat(res.data[i].r);
                            count = count + 1;
                        }
                        if (isNaN(parseFloat(res.data[i].s)) == false) {
                            sum = sum + parseFloat(res.data[i].s);
                            count = count + 1;
                        }
                        if (count != 0) {
                            res.data[i].average = sum / count
                        }
                    }
                    count = 0;
                    console.log($('#average2').text())
                    if ($('#average2').text() != "") {
                        for (var i = 0; i < res.data.length; i++) {
                            if (parseFloat($('#average2').text()) < parseFloat(res.data[i].average) && res.data[i].fullName != $('#fullName') && res.data[i].department1 == $('#department1').text()) {
                                count = count + 1;
                            }
                        }
                        if (count == 0) {
                            $('#paiming').text(count + 1);
                        } else {
                            $('#paiming').text(count);
                        }

                    }
                }
            })

            //关键专业
            $ajax({
                type: 'post',
                url: '/essential_info/keyMajor',
                data: {
                    eiId: eiId
                }
            }, false, '', function (res) {
                if (res.data.length > 0 && res.code == 200) {
                    var zy = "";
                    if (res.data[0].a != null && res.data[0].a != "") {
                        zy = zy + res.data[0].a + "; ";
                    }
                    if (res.data[0].b != null && res.data[0].b !="") {
                        zy = zy + res.data[0].b + "; ";
                    }
                    if (res.data[0].c != null && res.data[0].c !="") {
                        zy = zy + res.data[0].c + "; ";
                    }
                    if (res.data[0].d != null && res.data[0].d !="") {
                        zy = zy + res.data[0].d + "; ";
                    }
                    if (res.data[0].e != null && res.data[0].e !="") {
                        zy = zy + res.data[0].e + "; ";
                    }
                    if (res.data[0].f != null && res.data[0].f !="") {
                        zy = zy + res.data[0].f + "; ";
                    }
                    if (res.data[0].g != null && res.data[0].g !="") {
                        zy = zy + res.data[0].g + "; ";
                    }
                    if (res.data[0].h != null && res.data[0].h !="") {
                        zy = zy + res.data[0].h + "; ";
                    }
                    if (res.data[0].i != null && res.data[0].i !="") {
                        zy = zy + res.data[0].i + "; ";
                    }
                    if (res.data[0].j != null && res.data[0].j !="") {
                        zy = zy + res.data[0].j + "; ";
                    }
                    $('#keyMajor').text(zy)
                }
            })
            //关键经历满分
            var scondaryUnit = "";
            var department1 = "";
            $.each(rows, function (index, row) {
                scondaryUnit = row.data.secondaryUnit
                department1 = row.data.department1
            })
            $ajax({
                type: 'post',
                url: '/essential_info/getFullMark',
                data: {
                    department1: scondaryUnit + department1
                }
            }, false, '', function (res) {
                if (res.data.length > 0 && res.code == 200) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].level == $('#secondaryUnit').text() + $('#department1').text()) {
                            $('#fullMark').text(res.data[i].fullMark);
                        }
                    }
                }
            })
            //关键经历得分
            $ajax({
                type: 'post',
                url: '/key_experience_score/calculation',
            }, false, '', function (res) {
                if (res.code == 200) {
                    var sum = 0;
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].eiId == eiId && res.data[i].score != null) {
                            sum = sum + parseFloat(res.data[i].score)
                        }
                    }
                    $('#keyExperienceScore').text(sum)
                }
            })

            //基本信息
            var riqi = Date.parse(new Date());
            $.each(rows, function (index, row) {
                $("#fullName").text(row.data.fullName);
                $("#secondaryUnit").text(row.data.secondaryUnit);
                $("#post").text(row.data.post);
                $("#department1").text(row.data.department1);
                riqi = parseInt(riqi - Date.parse(new Date(row.data.riqi))) / (1000 * 60 * 60 * 24) / 365
                $("#riqi").text(riqi.toFixed(2));
                $("#education").text(row.data.education);
                $('#cengjipaiming').text(row.data.department1 + "排名");
            })
        } else {
            alert('请选择一条数据');
        }
    })
})


function setShowEssentialTable(data) {
    console.log(data)
    if ($('#show-table-essential').html() != '') {
        $('#show-table-essential').bootstrapTable('load', data);
        return;
    }
    $('#show-table-essential').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        locale: 'zh-CN',
        columns: [
            {
                field: 'id',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'fullName',
                title: '姓名',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'sex',
                title: '性别',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'birthday',
                title: '出生日期',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'age',
                title: '年龄',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'riqi',
                title: '任现职时间',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'education',
                title: '学历',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'post',
                title: '职务',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'department1',
                title: '部门/单位岗位（填写中层正职、党委书记、中层正职、中层副职）',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'level',
                title: '层级',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'secondaryUnit',
                title: '二级单位',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'department2',
                title: '部门/单位',
                align: 'left',
                sortable: true,
                width: 100
            }
        ],
        onClickRow: function (row, el) {
            let isSelect = $(el).hasClass('selected')
            if (isSelect) {
                $(el).removeClass('selected')
            } else {
                $(el).addClass('selected')
            }
        }
    })
}