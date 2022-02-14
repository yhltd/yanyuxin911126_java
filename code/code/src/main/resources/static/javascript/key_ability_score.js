var operation = ""

function getList() {
    $ajax({
        type: 'post',
        url: '/keyabilityscore/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#keyAbilityScoreTable").bootstrapTable('hideColumn', 'eiId');
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
                url: '/keyabilityscore/getListByName',
                data: {
                    fullName: fullName
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data)
                    $("#keyAbilityScoreTable").bootstrapTable('hideColumn', 'eiId');
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
                    $("#add-eiId").val(row.data.id);
                    $("#add-fullName").val(row.data.fullName);
                    $("#add-department2").val(row.data.department2);
                    $("#add-department1").val(row.data.department1);
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
                    $("#update-department2").val(row.data.department2);
                    $("#update-department1").val(row.data.department1);
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
        if ($('#add-eiId').val() != '') {
            let addInfo = formToJson("#add-form")
            $ajax({
                type: 'post',
                url: '/keyabilityscore/add',
                data: JSON.stringify({
                    keyAbilityScore: addInfo
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
        } else {
            $("#add-fullName").next().css('display', 'block');
            $("#add-department2").next().css('display', 'block');
            $("#add-department1").next().css('display', 'block');
        }
    })

    //点击修改按钮
    $('#update-btn').click(function () {
        let rows = getTableSelection('#keyAbilityScoreTable')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
        $('#update-d').val(rows[0].data.d);
        $('#update-e').val(rows[0].data.e);
        $('#update-f').val(rows[0].data.f);
        $('#update-g').val(rows[0].data.g);
        $('#update-h').val(rows[0].data.h);
        $('#update-i').val(rows[0].data.i);
        $('#update-j').val(rows[0].data.j);
        $('#update-k').val(rows[0].data.k);
        $('#update-l').val(rows[0].data.l);
        $('#update-m').val(rows[0].data.m);
        $('#update-n').val(rows[0].data.n);
        $('#update-o').val(rows[0].data.o);
        $('#update-p').val(rows[0].data.p);
        $('#update-q').val(rows[0].data.q);
        $('#update-r').val(rows[0].data.r);
    })

    //修改窗体中的关闭按钮
    $('#close-form-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    })

    //点击修改按钮提交事件
    $('#update-form-btn').click(function () {
        var msg = confirm("确认要修改吗？")
        if (msg) {
            if ($('#update-eiId').val() != '') {
                let params = formToJson('#update-form');
                $ajax({
                    type: 'post',
                    url: '/keyabilityscore/update',
                    data: {
                        keyAbilityScoreJson: JSON.stringify(params)
                    },
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
                }, false, '', function (res) {
                    alert(res.msg);
                    if (res.code == 200) {
                        $('#update-close-btn').click();
                        let rows = getTableSelection('#keyAbilityScoreTable');
                        $('#keyAbilityScoreTable').bootstrapTable('updateRow', {
                            index: rows[0].index,
                            row: res.data
                        })
                        $('#update-modal').modal('hide');
                    }
                })
            } else {
                $("#update-fullName").next().css('display', 'block');
                $("#update-department2").next().css('display', 'block');
                $("#update-department1").next().css('display', 'block');
            }
        }
    })

    //点击删除按钮事件
    $('#delete-btn').click(function () {
        let rows = getTableSelection("#keyAbilityScoreTable");
        if (rows.length == 0) {
            alert('请至少选择一条数据删除')
            return;
        }
        $('#delete-modal').modal('show');
    })

    $('#delete-submit-btn').click(function () {
        let rows = getTableSelection("#keyAbilityScoreTable");

        let idList = [];
        $.each(rows, function (index, row) {
            idList.push(row.data.id)
        })
        $ajax({
            type: 'post',
            url: '/keyabilityscore/delete',
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

    //上传excel
    $('#upload-btn').click(function () {
        $('#file').trigger('click');

    })

    //判断文件名改变
    $('#file').change(function () {
        var url = null;
        if ($('#file').val() != '') {
            if ($('#file').val().substr(-5) == '.xlsx') {
                var excel = document.getElementById("file").files[0]
                var oFReader = new FileReader();
                oFReader.readAsDataURL(excel);
                oFReader.onloadend = function (oFRevent) {
                    url = oFRevent.target.result;
                    $ajax({
                        type: 'post',
                        url: '/keyabilityscore/upload',
                        data: {
                            excel: url
                        },
                    }, false, '', function (res) {
                        $('#file').val('');
                        alert(res.msg);
                        if (res.code == 200) {
                            getList();
                        }
                    })
                }
            } else {
                alert("请选择正确的Excel文件！")
                $('#file').val('');
            }
        }
    })

})

function setTable(data) {
    if ($('#keyAbilityScoreTable').html != '') {
        $('#keyAbilityScoreTable').bootstrapTable('load', data);
    }

    $('#keyAbilityScoreTable').bootstrapTable({
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
                field: 'eiId',
                title: '基本信息id',
                align: 'left',
                width: 100
            }, {
                field: 'fullName',
                title: '姓名',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'department2',
                title: '部门',
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
                field: 'd',
                title: '政治素养',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'e',
                title: '团队管理',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'f',
                title: '学习创新',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'g',
                title: '攻坚克难',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'h',
                title: '远见胆识',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'i',
                title: '经营思维',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'j',
                title: '统筹协调',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'k',
                title: '推动落实',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'l',
                title: '沟通合作',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'm',
                title: '人际敏锐',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'n',
                title: '政治敏锐',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'o',
                title: '精益管理',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'p',
                title: '严谨细致',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'q',
                title: '风险防范',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'r',
                title: '专业管理',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'average',
                title: '均分',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    var sum = 0;
                    var count = 0;
                    if (isNaN(parseFloat(row.d)) == false) {
                        sum = sum + parseFloat(row.d);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.e)) == false) {
                        sum = sum + parseFloat(row.e);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.f)) == false) {
                        sum = sum + parseFloat(row.f);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.g)) == false) {
                        sum = sum + parseFloat(row.g);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.h)) == false) {
                        sum = sum + parseFloat(row.h);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.i)) == false) {
                        sum = sum + parseFloat(row.i);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.j)) == false) {
                        sum = sum + parseFloat(row.j);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.k)) == false) {
                        sum = sum + parseFloat(row.k);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.l)) == false) {
                        sum = sum + parseFloat(row.l);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.m)) == false) {
                        sum = sum + parseFloat(row.m);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.n)) == false) {
                        sum = sum + parseFloat(row.n);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.o)) == false) {
                        sum = sum + parseFloat(row.o);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.p)) == false) {
                        sum = sum + parseFloat(row.p);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.q)) == false) {
                        sum = sum + parseFloat(row.q);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.r)) == false) {
                        sum = sum + parseFloat(row.r);
                        count = count + 1;
                    }
                    if (isNaN(parseFloat(row.s)) == false) {
                        sum = sum + parseFloat(row.s);
                        count = count + 1;
                    }
                    if (count != 0) {
                        return (sum / count).toFixed(2);
                    } else {
                        return 0;
                    }

                }
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