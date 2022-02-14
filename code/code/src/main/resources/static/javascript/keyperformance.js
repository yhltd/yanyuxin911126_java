var operation = ""

function getList() {
    $ajax({
        type: 'post',
        url: '/keyperformance/getList',
    }, false, '', function (res) {
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

            setTable(res.data);
            $("#keyperformanceTable").bootstrapTable('hideColumn', 'eiId');
        }
        console.log(res)
    })
}

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

$(function () {
    //显示所有信息
    getList();

    //点击刷新按钮
    $("#refresh-btn").click(function () {
        $("#fullName").val("");
        getList();
    })

    //点击查询按钮
    $("#query_button").click(function () {
        var fullName = $("#fullName").val();
        if (fullName == "") {
            alert("请输入要查询的姓名")
        } else {
            $ajax({
                type: 'post',
                url: '/keyperformance/getListByName',
                data: {
                    fullName: fullName
                }
            }, false, '', function (res) {
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


                    setTable(res.data)
                    $("#keyperformanceTable").bootstrapTable('hideColumn', 'eiId');
                }
            })
        }
    })

    //添加窗体点击选择基本信息按钮
    $("#add-essential-show").click(function () {
        operation = "添加";
        getEssentialList();
    })

    //修改窗体点击选择基本信息按钮
    $("#update-essential-show").click(function () {
        operation = "修改";
        getEssentialList();
    })

    //基本信息关闭按钮
    $("#essential-close-btn").click(function () {
        $('#show-essential-modal').modal('hide');
    })

    //基本信息确定按钮
    $("#essential-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-essential");
        if (operation == "添加") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-essential");
                $.each(rows, function (index, row) {
                    $("#eiId").val(row.data.id);
                    $("#add-fullName").val(row.data.fullName);
                    $("#add-secondaryUnit").val(row.data.secondaryUnit);
                })
                $('#show-essential-modal').modal('hide');
            }
            operation = "";
        } else if (operation == "修改") {
            if (rows.length != 1) {
                alert('请选择一条数据');
                return;
            } else {
                let rows = getTableSelection("#show-table-essential");
                $.each(rows, function (index, row) {
                    $("#update-eiId").val(row.data.id);
                    $("#update-fullName").val(row.data.fullName);
                    $("#update-secondaryUnit").val(row.data.secondaryUnit);
                })
                $('#show-essential-modal').modal('hide');
            }
            operation = "";
        }
    })

    //点击添加按钮
    $("#add-btn").click(function () {
        $('#add-modal').modal('show');
    })

    //添加窗体中的关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-form')[0].reset();
        $('#add-modal').modal('hide');
    })

    //点击添加窗体提交按钮
    $("#add-submit-btn").click(function () {
        if (checkForm("#add-form")) {
            let addInfo = formToJson("#add-form")
            $ajax({
                type: 'post',
                url: '/performance/add',
                data: JSON.stringify({
                    performance: addInfo
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg)
                if (res.code == 200) {
                    $('#add-modal').modal('hide');
                    getList();
                    $('#add-form')[0].reset();
                }
            })
        }
    })

    //点击修改按钮
    $('#update-btn').click(function () {
        let rows = getTableSelection('#keyperformanceTable')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
    })

    //修改窗体中的关闭按钮
    $('#close-essential-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    })

    //点击修改按钮提交事件
    $('#update-essential-btn').click(function () {
        var msg = confirm("确认要修改吗？")
        if (msg) {
            if (checkForm('#update-form')) {
                let params = formToJson('#update-form');
                $ajax({
                    type: 'post',
                    url: '/performance/update',
                    data: {
                        performanceJson: JSON.stringify(params)
                    },
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
                }, false, '', function (res) {
                    alert(res.msg);
                    if (res.code == 200) {
                        $('#update-close-btn').click();
                        let rows = getTableSelection('#keyperformanceTable');
                        $('#keyperformanceTable').bootstrapTable('updateRow', {
                            index: rows[0].index,
                            row: res.data
                        })
                        $('#update-modal').modal('hide');
                    }
                })
            }
        }
    })

    //点击删除按钮事件
    $('#delete-btn').click(function () {
        let rows = getTableSelection("#keyperformanceTable");
        if (rows.length == 0) {
            alert('请至少选择一条数据删除')
            return;
        }
        $('#delete-modal').modal('show');
    })

    $('#delete-submit-btn').click(function () {
        let rows = getTableSelection("#keyperformanceTable");

        let idList = [];
        $.each(rows, function (index, row) {
            idList.push(row.data.id)
        })
        $ajax({
            type: 'post',
            url: '/performance/delete',
            data: JSON.stringify({
                idList: idList
            }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8'
        }, false, '', function (res) {
            alert(res.msg);
            if (res.code == 200) {
                getList();
                $('#delete-close-btn').click();
            }
        })
    })

    $('#delete-close-btn').click(function () {
        $('#delete-modal').modal('hide');
    })
})

function setTable(data) {
    if ($('#keyperformanceTable').html != '') {
        $('#keyperformanceTable').bootstrapTable('load', data);
    }

    $('#keyperformanceTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
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
                field: 'nian',
                title: '年份',
                align: 'left',
                sortable: true,
                hidden: true,
                width: 100
            }, {
                field: 'fullName',
                title: '姓名',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'post',
                title: '现职务',
                align: 'left',
                sortable: true,
                width: 350,
            }, {
                field: 'secondaryUnit',
                title: '二级单位',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'department1',
                title: '层级',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'score',
                title: '绩效得分（原始）',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'renshuSum',
                title: '班子总人数',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'ranking',
                title: '排名',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'paiming',
                title: '排名位置',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'dangwei',
                title: '档位',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'jixiao',
                title: '绩效赋分',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'guanjianjixiao',
                title: '三年绩效均值',
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