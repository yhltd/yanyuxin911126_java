var operation = ""

function getList() {
    $ajax({
        type: 'post',
        url: '/key_experience_score/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#keyExperienceScoreTable").bootstrapTable('hideColumn', 'eiId');
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
        getList();
    })

    //点击刷新按钮
    $("#calculation-btn").click(function () {
        $ajax({
            type: 'post',
            url: '/key_experience_score/calculation',
        }, false, '', function (res) {
            alert(res.msg);
            if (res.code == 200) {
                setTable(res.data);
                $("#keyExperienceScoreTable").bootstrapTable('hideColumn', 'eiId');
            }
            console.log(res)
        })
    })

    //点击添加按钮
    $("#add-btn").click(function () {
        $('#add-modal').modal('show');
    })

    //添加窗体中的关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-form')[0].reset();
        $('#add-modal').modal('hide');
        operation = "";
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

    //点击添加窗体提交按钮
    $("#add-submit-btn").click(function () {
        if ($("#add-eiId").val() == '') {
            $("#add-fullName").next().css('display', 'block');
            $("#add-secondaryUnit").next().css('display', 'block')
        } else if ($("#add-ksDate").val() == '') {
            $("#add-ksDate").next().css('display', 'block');
        } else if ($("#add-jsDate").val() == '') {
            $("#add-jsDate").next().css('display', 'block');
        } else {
            let addInfo = formToJson("#add-form")
            $ajax({
                type: 'post',
                url: '/key_experience_score/add',
                data: JSON.stringify({
                    keyExperienceScore: addInfo
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
        let rows = getTableSelection('#keyExperienceScoreTable')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
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
            if ($("#update-eiId").val() == '') {
                $("#update-fullName").next().css('display', 'block');
                $("#update-secondaryUnit").next().css('display', 'block')
            } else if ($("#update-ksDate").val() == '') {
                $("#add-ksDate").next().css('display', 'block');
            } else if ($("#update-jsDate").val() == '') {
                $("#update-jsDate").next().css('display', 'block');
            } else {
                let params = formToJson('#update-form');
                $ajax({
                    type: 'post',
                    url: '/key_experience_score/update',
                    data: {
                        keyExperienceScoreJson: JSON.stringify(params)
                    },
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
                }, false, '', function (res) {
                    alert(res.msg);
                    if (res.code == 200) {
                        $('#update-close-btn').click();
                        let rows = getTableSelection('#keyExperienceScoreTable');
                        $('#keyExperienceScoreTable').bootstrapTable('updateRow', {
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
        let rows = getTableSelection("#keyExperienceScoreTable");
        if (rows.length == 0) {
            alert('请至少选择一条数据删除')
            return;
        }
        $('#delete-modal').modal('show');
    })

    $('#delete-submit-btn').click(function () {
        let rows = getTableSelection("#keyExperienceScoreTable");

        let idList = [];
        $.each(rows, function (index, row) {
            idList.push(row.data.id)
        })
        $ajax({
            type: 'post',
            url: '/key_experience_score/delete',
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
                        url: '/key_experience_score/upload',
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
    if ($('#keyExperienceScoreTable').html != '') {
        $('#keyExperienceScoreTable').bootstrapTable('load', data);
    }

    $('#keyExperienceScoreTable').bootstrapTable({
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
                sortable: true,
                hidden: true,
                width: 100
            }, {
                field: 'fullName',
                title: '姓名',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'ksDate',
                title: '开始时间',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'jsDate',
                title: '结束时间',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'age',
                title: '任职年龄',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'secondaryUnit',
                title: '所在单位',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'job',
                title: '从事工作和职务',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'duration',
                title: '经历时长',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'experienceStage',
                title: '经历阶段',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'experience',
                title: '经历项',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'score',
                title: '经历赋分',
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