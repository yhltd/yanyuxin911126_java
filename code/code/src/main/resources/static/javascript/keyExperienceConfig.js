function getList() {
    $ajax({
        type: 'post',
        url: '/key_experience_config/getList',
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
        $("#unit").val("");
        getList();
    })

    //点击查询按钮
    $("#query_button").click(function () {
        var unit = $("#unit").val();
        if (unit == "") {
            alert("请输入要查询的单位/部门")
        } else {
            $ajax({
                type: 'post',
                url: '/key_experience_config/getListByUnit',
                data: {
                    unit: unit
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
        $('#add-modal').modal('show');
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
            url: '/key_experience_config/add',
            data: JSON.stringify({
                keyExperienceConfig: addInfo
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
        let rows = getTableSelection('#keyExperienceConfigTable')
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
            let params = formToJson('#update-form');
            $ajax({
                type: 'post',
                url: '/key_experience_config/update',
                data: {
                    keyExperienceConfigJson: JSON.stringify(params)
                },
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg);
                if (res.code == 200) {
                    $('#update-close-btn').click();
                    let rows = getTableSelection('#keyExperienceConfigTable');
                    $('#keyExperienceConfigTable').bootstrapTable('updateRow', {
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
        let rows = getTableSelection("#keyExperienceConfigTable");
        if (rows.length == 0) {
            alert('请至少选择一条数据删除')
            return;
        }
        $('#delete-modal').modal('show');
    })

    $('#delete-submit-btn').click(function () {
        let rows = getTableSelection("#keyExperienceConfigTable");
        let idList = [];
        $.each(rows, function (index, row) {
            idList.push(row.data.id)
        })
        $ajax({
            type: 'post',
            url: '/key_experience_config/delete',
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
                        url: '/key_experience_config/upload',
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
    if ($('#keyExperienceConfigTable').html != '') {
        $('#keyExperienceConfigTable').bootstrapTable('load', data);
    }

    $('#keyExperienceConfigTable').bootstrapTable({
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
                field: 'unit',
                title: '单位',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'experience',
                title: '经历项',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'duration',
                title: '历练时长',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'score',
                title: '赋分',
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
                field: 'fullMark',
                title: '满分',
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