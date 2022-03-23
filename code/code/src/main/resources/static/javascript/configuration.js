var pwd = "";

function getList() {
    $ajax({
        type: 'post',
        url: '/configuration/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
        }
        console.log(res)
    })
}

$(function () {
    //显示所有信息
    getList();

    //点击刷新按钮
    $("#refresh-btn").click(function () {
        $("#department").val("");
        getList();
    })

    //点击查询按钮
    $("#query_button").click(function () {
        var department = $("#department").val();
        if (department == "") {
            alert("请输入要查询的单位/部门")
        } else {
            $ajax({
                type: 'post',
                url: '/configuration/getListByName',
                data: {
                    department: department
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    setTable(res.data)
                }
            })
        }
    })

    //点击添加按钮
    $("#add-btn").click(function () {
        pwd = '1';
        $('#check-modal').modal('show');
    })

    //密码文本框点击提交按钮
    $('#check-submit-btn').click(function () {
        if ($('#pwd').val() == "admin") {
            if (pwd == '1') {
                pwd = 'add';
            } else if (pwd == '2') {
                pwd = 'update';
            } else if (pwd == '3') {
                pwd = 'del';
            } else if (pwd = '4') {
                pwd = 'upload';
            }
            $('#check-modal').modal('hide');
            $('#pwd').val('');
        } else {
            $('#pwd').val('');
            pwd = "";
            alert("密码错误！")
        }
        if (pwd == "add") {
            $('#add-modal').modal('show');
            pwd = "";
        }
        if (pwd == "update") {
            let rows = getTableSelection('#configurationTable')
            if (rows.length > 1 || rows.length == 0) {
                alert('请选择一条数据修改');
                return;
            }
            $('#update-modal').modal('show');
            setForm(rows[0].data, '#update-form');
            pwd = "";
        }
        if (pwd == 'del') {
            let rows = getTableSelection("#configurationTable");
            if (rows.length == 0) {
                alert('请至少选择一条数据删除')
                return;
            }
            $('#delete-modal').modal('show');
        }
        if (pwd == 'upload') {
            $('#file').trigger('click');
        }
        pwd = "";
    })

    //密码文本框点击关闭按钮
    $('#check-close-btn').click(function () {
        $('#pwd').val('')
        pwd = "";
        $('#check-modal').modal('hide');
    })

    //添加窗体中的关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-form')[0].reset();
        $('#add-modal').modal('hide');
    })

    //点击添加窗体提交按钮
    $("#add-submit-btn").click(function () {
        let addInfo = formToJson("#add-form")
        $ajax({
            type: 'post',
            url: '/configuration/add',
            data: JSON.stringify({
                configuration: addInfo
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
    })

    //点击修改按钮
    $('#update-btn').click(function () {
        pwd = '2';
        $('#check-modal').modal('show');
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
            let params = formToJson('#update-form');
            $ajax({
                type: 'post',
                url: '/configuration/update',
                data: {
                    configurationJson: JSON.stringify(params)
                },
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg);
                if (res.code == 200) {
                    $('#update-close-btn').click();
                    let rows = getTableSelection('#configurationTable');
                    $('#configurationTable').bootstrapTable('updateRow', {
                        index: rows[0].index,
                        row: res.data
                    })
                    $('#update-modal').modal('hide');
                }
            })
        }
    })


    //点击删除按钮事件
    $('#delete-btn').click(function () {
        pwd = '3';
        $('#check-modal').modal('show');

    })

    $('#delete-submit-btn').click(function () {
        let rows = getTableSelection("#configurationTable");

        let idList = [];
        $.each(rows, function (index, row) {
            idList.push(row.data.id)
        })
        $ajax({
            type: 'post',
            url: '/configuration/delete',
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
        pwd = '4';
        $('#check-modal').modal('show');


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
                        url: '/configuration/upload',
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
    if ($('#configurationTable').html != '') {
        $('#configurationTable').bootstrapTable('load', data);
    }

    $('#configurationTable').bootstrapTable({
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
                field: 'department',
                title: '部门/单位',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'unitAttribute',
                title: '单位属性',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'keyBusiness',
                title: '关键业务',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'expertise',
                title: '关键专业/业务专长',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'isNecessary',
                title: '是否为正职必须具备专业',
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