var operation = ""

function getList() {
    $ajax({
        type: 'post',
        url: '/keyabilityscore/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            console.log(res.data)

            for(var i=0;i<res.data.length;i++){
                var sum = 0
                var count = 0
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
                if(count > 0){
                    res.data[i].average = sum / count
                }else{
                    res.data[i].average = 0
                }


            }
            $("#keyAbilityScoreTable").bootstrapTable('hideColumn', 'eiId');
            console.log(res.data)
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

            for(var i=0;i<res.data.length;i++){
                var sum = 0
                var count = 0
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
                if(count > 0){
                    res.data[i].average = sum / count
                }else{
                    res.data[i].average = 0
                }


            }

            setShowEssentialTable(res.data);
            $('#show-essential-modal').modal('show');
        }
        console.log(res)
    })
}

$(function () {
    //??????????????????
    getList();

    //??????????????????
    $("#refresh-btn").click(function () {
        $("#fullName").val("");
        $("#department").val("");
        getList();
    })

    //??????????????????
    $("#query_button").click(function () {
        var fullName = $("#fullName").val();
        var department = $("#department").val();
        $ajax({
            type: 'post',
            url: '/keyabilityscore/getListByName',
            data: {
                fullName: fullName,
                department:department,
            }
        }, false, '', function (res) {
            if (res.code == 200) {

                for(var i=0;i<res.data.length;i++){
                    var sum = 0
                    var count = 0
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
                    if(count > 0){
                        res.data[i].average = sum / count
                    }else{
                        res.data[i].average = 0
                    }


                }

                setTable(res.data)
                $("#keyAbilityScoreTable").bootstrapTable('hideColumn', 'eiId');
            }
        })
    })

    //??????????????????????????????????????????
    $("#add-essential-show").click(function () {
        operation = "??????";
        getEssentialList();
    })

    //??????????????????????????????????????????
    $("#update-essential-show").click(function () {
        operation = "??????";
        getEssentialList();
    })

    //????????????????????????
    $("#essential-close-btn").click(function () {
        $('#show-essential-modal').modal('hide');
    })

    //????????????????????????
    $("#essential-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-essential");
        if (operation == "??????") {
            if (rows.length != 1) {
                alert('?????????????????????');
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
        } else if (operation == "??????") {
            if (rows.length != 1) {
                alert('?????????????????????');
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

    //??????????????????
    $("#add-btn").click(function () {
        $('#add-modal').modal('show');
    })

    //??????????????????????????????
    $('#add-close-btn').click(function () {
        $('#add-form')[0].reset();
        $('#add-modal').modal('hide');
    })

    //??????????????????????????????
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

    //??????????????????
    $('#update-btn').click(function () {
        let rows = getTableSelection('#keyAbilityScoreTable')
        if (rows.length > 1 || rows.length == 0) {
            alert('???????????????????????????');
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

    //??????????????????????????????
    $('#close-form-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    })

    //??????????????????????????????
    $('#update-form-btn').click(function () {
        var msg = confirm("?????????????????????")
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

    //????????????????????????
    $('#delete-btn').click(function () {
        let rows = getTableSelection("#keyAbilityScoreTable");
        if (rows.length == 0) {
            alert('?????????????????????????????????')
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

    //??????excel
    $('#upload-btn').click(function () {
        $('#file').trigger('click');

    })

    //?????????????????????
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
                alert("??????????????????Excel?????????")
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
                title: '??????',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'eiId',
                title: '????????????id',
                align: 'left',
                width: 100
            }, {
                field: 'fullName',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'department2',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'department1',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'd',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'e',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'f',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'g',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'h',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'i',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'j',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'k',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'l',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'm',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'n',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'o',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'p',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'q',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'r',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'average',
                title: '??????',
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
                title: '??????',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'fullName',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'sex',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'birthday',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'age',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'riqi',
                title: '???????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'education',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'post',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'department1',
                title: '??????/?????????????????????????????????????????????????????????????????????????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'level',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'secondaryUnit',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100
            }, {
                field: 'department2',
                title: '??????/??????',
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