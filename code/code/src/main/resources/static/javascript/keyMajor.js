var operation = ""

function getList() {
    $ajax({
        type: 'post',
        url: '/key_major/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
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
        $("#department").val("");
        getList();
    })

    //点击查询按钮
    $("#query_button").click(function () {
        var fullName = $("#fullName").val();
        var department = $("#department").val();
        $ajax({
            type: 'post',
            url: '/key_major/getListByName',
            data: {
                fullName: fullName,
                department:department,
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                setTable(res.data)
            }
        })
    })

    //点击添加按钮
    $("#add-btn").click(function () {
        $("#add-department").empty();
        $("#add-department").append("<option></option>");
        $("#add-a").empty();
        $("#add-a").append("<option></option>");
        $("#add-b").empty();
        $("#add-b").append("<option></option>");
        $("#add-c").empty();
        $("#add-c").append("<option></option>");
        $("#add-d").empty();
        $("#add-d").append("<option></option>");
        $("#add-e").empty();
        $("#add-e").append("<option></option>");
        $("#add-f").empty();
        $("#add-f").append("<option></option>");
        $("#add-g").empty();
        $("#add-g").append("<option></option>");
        $("#add-h").empty();
        $("#add-h").append("<option></option>");
        $("#add-i").empty();
        $("#add-i").append("<option></option>");
        $("#add-j").empty();
        $("#add-j").append("<option></option>");
        $ajax({
            type: 'post',
            url: '/key_major/getDepartment',
        }, false, '', function (res) {
            if (res.code == 200) {
                for (var i = 0; i < res.data.length; i++) {
                    $("#add-department").append("<option>" + res.data[i].department + "</option>");
                }
                $('#add-modal').modal('show');
            }
            console.log(res)
        })
    })

    //添加窗体部门change事件
    $("#add-department").change(function () {
        $("#add-a").empty();
        $("#add-a").append("<option></option>");
        $("#add-b").empty();
        $("#add-b").append("<option></option>");
        $("#add-c").empty();
        $("#add-c").append("<option></option>");
        $("#add-d").empty();
        $("#add-d").append("<option></option>");
        $("#add-e").empty();
        $("#add-e").append("<option></option>");
        $("#add-f").empty();
        $("#add-f").append("<option></option>");
        $("#add-g").empty();
        $("#add-g").append("<option></option>");
        $("#add-h").empty();
        $("#add-h").append("<option></option>");
        $("#add-i").empty();
        $("#add-i").append("<option></option>");
        $("#add-j").empty();
        $("#add-j").append("<option></option>");
        var department = $("#add-department").find("option:selected").text();
        $ajax({
            type: 'post',
            url: '/key_major/getSecondaryMenu',
            data: {
                department: department
            },
        }, false, '', function (res) {
            if (res.code == 200) {
                for (var i = 0; i < res.data.length; i++) {
                    $("#add-a").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#add-b").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#add-c").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#add-d").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#add-e").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#add-f").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#add-g").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#add-h").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#add-i").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#add-j").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                }
            }
            console.log(res)
        })
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
                    $("#add-level").val(row.data.department1);
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
                    $("#update-level").val(row.data.department1);
                })
                $('#show-essential-modal').modal('hide');
            }
            operation = "";
        }
    })

    //点击添加窗体提交按钮
    $("#add-submit-btn").click(function () {
        if ($("#add-fullName").val() != '' && $("#add-level").val() != '') {
            let addInfo = formToJson("#add-form")
            $ajax({
                type: 'post',
                url: '/key_major/add',
                data: JSON.stringify({
                    keyMajor: addInfo
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
            $("#add-level").next().css('display', 'block')
        }
    })

    //点击修改按钮
    $('#update-btn').click(function () {
        let rows = getTableSelection('#keyMajorTable')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改');
            return;
        }
        $("#update-department").empty();
        $("#update-department").append("<option></option>");
        $ajax({
            type: 'post',
            url: '/key_major/getDepartment',
        }, false, '', function (res) {
            if (res.code == 200) {
                for (var i = 0; i < res.data.length; i++) {
                    $("#update-department").append("<option>" + res.data[i].department + "</option>");
                }
                $('#update-modal').modal('show');
                setForm(rows[0].data, '#update-form');
                console.log(res)
                $("#update-department").find("option[value = '" + rows[0].data.department + "']").attr("selected", "selected");


                $("#update-a").empty();
                $("#update-a").append("<option></option>");
                $("#update-b").empty();
                $("#update-b").append("<option></option>");
                $("#update-c").empty();
                $("#update-c").append("<option></option>");
                $("#update-d").empty();
                $("#update-d").append("<option></option>");
                $("#update-e").empty();
                $("#update-e").append("<option></option>");
                $("#update-f").empty();
                $("#update-f").append("<option></option>");
                $("#update-g").empty();
                $("#update-g").append("<option></option>");
                $("#update-h").empty();
                $("#update-h").append("<option></option>");
                $("#update-i").empty();
                $("#update-i").append("<option></option>");
                $("#update-j").empty();
                $("#update-j").append("<option></option>");
                var department = $("#update-department").find("option:selected").text();
                $ajax({
                    type: 'post',
                    url: '/key_major/getSecondaryMenu',
                    data: {
                        department: department
                    },
                }, false, '', function (res) {
                    if (res.code == 200) {
                        for (var i = 0; i < res.data.length; i++) {
                            $("#update-a").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                            $("#update-b").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                            $("#update-c").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                            $("#update-d").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                            $("#update-e").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                            $("#update-f").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                            $("#update-g").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                            $("#update-h").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                            $("#update-i").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                            $("#update-j").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                        }
                        $("#update-a").find("option[value = '" + rows[0].data.a + "']").attr("selected", "selected");
                        $("#update-b").find("option[value = '" + rows[0].data.b + "']").attr("selected", "selected");
                        $("#update-c").find("option[value = '" + rows[0].data.c + "']").attr("selected", "selected");
                        $("#update-d").find("option[value = '" + rows[0].data.d + "']").attr("selected", "selected");
                        $("#update-e").find("option[value = '" + rows[0].data.e + "']").attr("selected", "selected");
                        $("#update-f").find("option[value = '" + rows[0].data.f + "']").attr("selected", "selected");
                        $("#update-g").find("option[value = '" + rows[0].data.g + "']").attr("selected", "selected");
                        $("#update-h").find("option[value = '" + rows[0].data.h + "']").attr("selected", "selected");
                        $("#update-i").find("option[value = '" + rows[0].data.i + "']").attr("selected", "selected");
                        $("#update-j").find("option[value = '" + rows[0].data.j + "']").attr("selected", "selected");
                    }
                    console.log(res)
                })


            }
        })
    })

    //修改窗体部门change事件
    $("#update-department").change(function () {
        $("#update-a").empty();
        $("#update-a").append("<option></option>");
        $("#update-b").empty();
        $("#update-b").append("<option></option>");
        $("#update-c").empty();
        $("#update-c").append("<option></option>");
        $("#update-d").empty();
        $("#update-d").append("<option></option>");
        $("#update-e").empty();
        $("#update-e").append("<option></option>");
        $("#update-f").empty();
        $("#update-f").append("<option></option>");
        $("#update-g").empty();
        $("#update-g").append("<option></option>");
        $("#update-h").empty();
        $("#update-h").append("<option></option>");
        $("#update-i").empty();
        $("#update-i").append("<option></option>");
        $("#update-j").empty();
        $("#update-j").append("<option></option>");
        var department = $("#update-department").find("option:selected").text();
        $ajax({
            type: 'post',
            url: '/key_major/getSecondaryMenu',
            data: {
                department: department
            },
        }, false, '', function (res) {
            if (res.code == 200) {
                for (var i = 0; i < res.data.length; i++) {
                    $("#update-a").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#update-b").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#update-c").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#update-d").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#update-e").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#update-f").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#update-g").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#update-h").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#update-i").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                    $("#update-j").append("<option value='" + res.data[i].keyBusiness + "'>" + res.data[i].keyBusiness + "</option>");
                }
            }
            console.log(res)
        })
    })

    //修改窗体中的关闭按钮
    $('#close-form-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
        $("#update-department").empty();
        $("#update-department").append("<option></option>");
        $("#update-a").empty();
        $("#update-a").append("<option></option>");
        $("#update-b").empty();
        $("#update-b").append("<option></option>");
        $("#update-c").empty();
        $("#update-c").append("<option></option>");
        $("#update-d").empty();
        $("#update-d").append("<option></option>");
        $("#update-e").empty();
        $("#update-e").append("<option></option>");
        $("#update-f").empty();
        $("#update-f").append("<option></option>");
        $("#update-g").empty();
        $("#update-g").append("<option></option>");
        $("#update-h").empty();
        $("#update-h").append("<option></option>");
        $("#update-i").empty();
        $("#update-i").append("<option></option>");
        $("#update-j").empty();
        $("#update-j").append("<option></option>");
    })

    //点击修改按钮提交事件
    $('#update-form-btn').click(function () {
        var msg = confirm("确认要修改吗？")
        if (msg) {
            let params = formToJson('#update-form');
            $ajax({
                type: 'post',
                url: '/key_major/update',
                data: {
                    keyMajorJson: JSON.stringify(params)
                },
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg);
                if (res.code == 200) {
                    $('#update-close-btn').click();
                    let rows = getTableSelection('#keyMajorTable');
                    $('#keyMajorTable').bootstrapTable('updateRow', {
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
        let rows = getTableSelection("#keyMajorTable");
        if (rows.length == 0) {
            alert('请至少选择一条数据删除')
            return;
        }
        $('#delete-modal').modal('show');
    })

    $('#delete-submit-btn').click(function () {
        let rows = getTableSelection("#keyMajorTable");

        let idList = [];
        $.each(rows, function (index, row) {
            idList.push(row.data.id)
        })
        $ajax({
            type: 'post',
            url: '/key_major/delete',
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
                        url: '/key_major/upload',
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
    if ($('#keyMajorTable').html != '') {
        $('#keyMajorTable').bootstrapTable('load', data);
    }

    $('#keyMajorTable').bootstrapTable({
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
                visible: false,
                width: 100
            }, {
                field: 'fullName',
                title: '姓名',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'department',
                title: '单位',
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
                field: 'a',
                title: '当前主管业务1',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'b',
                title: '当前主管业务2',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'c',
                title: '当前主管业务3',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'd',
                title: '当前主管业务4',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'e',
                title: '当前主管业务5',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'f',
                title: '当前主管业务6',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'g',
                title: '当前主管业务7',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'h',
                title: '当前主管业务8',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'i',
                title: '当前主管业务9',
                align: 'left',
                sortable: true,
                width: 150
            }, {
                field: 'j',
                title: '当前主管业务10',
                align: 'left',
                sortable: true,
                width: 150
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