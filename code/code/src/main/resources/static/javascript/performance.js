var operation = ""

function getList() {
    $ajax({
        type: 'post',
        url: '/performance/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#performanceTable").bootstrapTable('hideColumn', 'eiId');
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
        $("#secondaryUnit").val("");
        getList();
    })

    //点击查询按钮
    $("#query_button").click(function () {
        var fullName = $("#fullName").val();
        var secondaryUnit = $("#secondaryUnit").val();
        $ajax({
            type: 'post',
            url: '/performance/getListByName',
            data: {
                fullName: fullName,
                secondaryUnit:secondaryUnit
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                setTable(res.data)
                $("#performanceTable").bootstrapTable('hideColumn', 'eiId');
            }
        })
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
        let rows = getTableSelection('#performanceTable')
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

    function checkForm_chongxie(el) {
        let result = true
        $(el + ' input').each(function (index, input) {
            let isRequired = $(input).data('required');
            if (isRequired == "1" || index == 6) {
                return true;
            }
            if ($(input).val() == '' || $(input).val() <= 0) {
                $(input).next().css('display', 'block')
                result = false
            } else {
                $(input).next().css('display', 'none')
            }
        })
        $(el + ' select').each(function (index, select) {
            if ($(select).val() == '' || $(select).val() == undefined) {
                $(select).next().css('display', 'block')
                result = false
            } else {
                $(select).next().css('display', 'none')
            }
        })
        return result;
    }

    //点击修改按钮提交事件
    $('#update-essential-btn').click(function () {
        var msg = confirm("确认要修改吗？")
        if (msg) {
            if (checkForm_chongxie('#update-form')) {
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
                        let rows = getTableSelection('#performanceTable');
                        $('#performanceTable').bootstrapTable('updateRow', {
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
        let rows = getTableSelection("#performanceTable");
        if (rows.length == 0) {
            alert('请至少选择一条数据删除')
            return;
        }
        $('#delete-modal').modal('show');
    })

    $('#delete-submit-btn').click(function () {
        let rows = getTableSelection("#performanceTable");

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
                        url: '/performance/upload',
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
    if ($('#performanceTable').html != '') {
        $('#performanceTable').bootstrapTable('load', data);
    }

    $('#performanceTable').bootstrapTable({
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
                field: 'nian',
                title: '年份',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'fullName',
                title: '姓名',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'secondaryUnit',
                title: '机关',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'score',
                title: '总分',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'grade',
                title: '绩效评级',
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