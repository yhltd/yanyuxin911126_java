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
        var eiId=0;
        let rows = getTableSelection("#show-table-essential");
        if (rows.length == 1) {
            $.each(rows, function (index, row) {
                eiId=row.data.id;
            })
            //关键绩效
            $ajax({
                type: 'post',
                url: '/essential_info/performance',
                data:{
                    eiId:eiId
                }
            }, false, '', function (res) {
                var average=0;
                var count=0;
                if (res.code == 200) {
                    for (var i = 0; i < res.data.length; i++) {
                        if(i==0){
                            $("#nian1").text(res.data[i].nian);
                            $("#score1").text(res.data[i].score);
                            average=average+res.data[i].score;
                            count=count+1;
                        }
                        if(i==1){
                            $("#nian2").text(res.data[i].nian);
                            $("#score2").text(res.data[i].score);
                            average=average+res.data[i].score;
                            count=count+1;
                        }
                        if(i==2){
                            $("#nian3").text(res.data[i].nian);
                            $("#score3").text(res.data[i].score);
                            average=average+res.data[i].score;
                            count=count+1;
                        }
                        if(count!=0){
                            $("#average").text((average/count).toFixed(2));
                        }
                        $("#ranking2").text(res.data[i].ranking+"/"+res.data[i].renshuSum);
                    }

                    $('#show-essential-modal').modal('hide');
                }
                console.log(res)
            })
            //关键能力
            $ajax({
                type: 'post',
                url: '/essential_info/keyAbilityScore',
                data:{
                    eiId:eiId
                }
            }, false, '', function (res) {
                if (res.code == 200) {
                    var sum=0;
                    var count=0;
                    if(res.data.length>0){
                        if (res.data[0].d!=null&&res.data[0].d!=''){
                            $('#d').text(res.data[0].d);
                            sum=sum+parseFloat(res.data[0].d);
                            count=count+1
                        }
                        if (res.data[0].e!=null&&res.data[0].e!=''){
                            $('#e').text(res.data[0].e);
                            sum=sum+parseFloat(res.data[0].e);
                            count=count+1
                        }
                        if (res.data[0].f!=null&&res.data[0].f!=''){
                            $('#f').text(res.data[0].f);
                            sum=sum+parseFloat(res.data[0].f);
                            count=count+1
                        }
                        if (res.data[0].g!=null&&res.data[0].g!=''){
                            $('#g').text(res.data[0].g);
                            sum=sum+parseFloat(res.data[0].g);
                            count=count+1
                        }
                        if (res.data[0].h!=null&&res.data[0].h!=''){
                            $('#h').text(res.data[0].h);
                            sum=sum+parseFloat(res.data[0].h);
                            count=count+1
                        }
                        if (res.data[0].i!=null&&res.data[0].i!=''){
                            $('#i').text(res.data[0].i);
                            sum=sum+parseFloat(res.data[0].i);
                            count=count+1
                        }
                        if (res.data[0].j!=null&&res.data[0].j!=''){
                            $('#j').text(res.data[0].j);
                            sum=sum+parseFloat(res.data[0].j);
                            count=count+1
                        }
                        if (res.data[0].k!=null&&res.data[0].k!=''){
                            $('#k').text(res.data[0].k);
                            sum=sum+parseFloat(res.data[0].k);
                            count=count+1
                        }
                        if (res.data[0].l!=null&&res.data[0].l!=''){
                            $('#l').text(res.data[0].l);
                            sum=sum+parseFloat(res.data[0].l);
                            count=count+1
                        }
                        if (res.data[0].m!=null&&res.data[0].m!=''){
                            $('#m').text(res.data[0].m);
                            sum=sum+parseFloat(res.data[0].m);
                            count=count+1
                        }
                        if (res.data[0].n!=null&&res.data[0].n!=''){
                            $('#n').text(res.data[0].n);
                            sum=sum+parseFloat(res.data[0].n);
                            count=count+1
                        }
                        if (res.data[0].o!=null&&res.data[0].o!=''){
                            $('#o').text(res.data[0].o);
                            sum=sum+parseFloat(res.data[0].o);
                            count=count+1
                        }
                        if (res.data[0].p!=null&&res.data[0].p!=''){
                            $('#p').text(res.data[0].p);
                            sum=sum+parseFloat(res.data[0].p);
                            count=count+1
                        }
                        if (res.data[0].q!=null&&res.data[0].q!=''){
                            $('#q').text(res.data[0].q);
                            sum=sum+parseFloat(res.data[0].q);
                            count=count+1
                        }
                        if (res.data[0].r!=null&&res.data[0].r!=''){
                            $('#r').text(res.data[0].r);
                            sum=sum+parseFloat(res.data[0].r);
                            count=count+1
                        }
                    }
                    $('#show-essential-modal').modal('hide');
                    if (count!=0){
                        $('#average2').text(sum/count)
                    }
                }
                console.log(res)
            })

            //关键能力均分
            $ajax({
                type: 'post',
                url: '/essential_info/getAverage',
            }, false, '', function (res) {
                if(res.data.length>0 && res.code == 200){
                    var d=res.data[0].d;
                    $('#dd').text(parseFloat(res.data[0].d).toFixed(2));
                    $('#ee').text(parseFloat(res.data[0].e).toFixed(2));
                    $('#ff').text(parseFloat(res.data[0].f).toFixed(2));
                    $('#gg').text(parseFloat(res.data[0].g).toFixed(2));
                    $('#hh').text(parseFloat(res.data[0].h).toFixed(2));
                    $('#ii').text(parseFloat(res.data[0].i).toFixed(2));
                    $('#jj').text(parseFloat(res.data[0].j).toFixed(2));
                    $('#kk').text(parseFloat(res.data[0].k).toFixed(2));
                    $('#ll').text(parseFloat(res.data[0].l).toFixed(2));
                    $('#mm').text(parseFloat(res.data[0].m).toFixed(2));
                    $('#nn').text(parseFloat(res.data[0].n).toFixed(2));
                    $('#oo').text(parseFloat(res.data[0].o).toFixed(2));
                    $('#pp').text(parseFloat(res.data[0].p).toFixed(2));
                    $('#qq').text(parseFloat(res.data[0].q).toFixed(2));
                    $('#rr').text(parseFloat(res.data[0].r).toFixed(2));
                }
            })

            //关键专业
            $ajax({
                type: 'post',
                url: '/essential_info/keyMajor',
                data:{
                    eiId:eiId
                }
            }, false, '', function (res) {
                if(res.data.length>0 && res.code == 200){
                    var zy="";
                    if(res.data[0].a!=null){
                        zy=zy+res.data[0].a+" ";
                    }
                    if(res.data[0].b!=null){
                        zy=zy+res.data[0].b+" ";
                    }
                    if(res.data[0].c!=null){
                        zy=zy+res.data[0].c+" ";
                    }
                    if(res.data[0].d!=null){
                        zy=zy+res.data[0].d+" ";
                    }
                    if(res.data[0].e!=null){
                        zy=zy+res.data[0].e+" ";
                    }
                    if(res.data[0].f!=null){
                        zy=zy+res.data[0].f+" ";
                    }
                    if(res.data[0].g!=null){
                        zy=zy+res.data[0].g+" ";
                    }
                    if(res.data[0].h!=null){
                        zy=zy+res.data[0].h+" ";
                    }
                    if(res.data[0].i!=null){
                        zy=zy+res.data[0].i+" ";
                    }
                    if(res.data[0].j!=null){
                        zy=zy+res.data[0].j+" ";
                    }
                    $('#keyMajor').text(zy)
                }
            })
            //关键经历满分
            var scondaryUnit="";
            var department1="";
            var eiId=0;
            $.each(rows, function (index, row) {
                scondaryUnit=row.data.secondaryUnit
                department1=row.data.department1
            })
            $ajax({
                type: 'post',
                url: '/essential_info/getFullMark',
                data:{
                    department1:scondaryUnit+department1
                }
            }, false, '', function (res) {
                if(res.data.length>0 && res.code==200){
                    $('#fullMark').text(res.data[0].fullMark);
                }
            })
            //关键经历得分
            $ajax({
                type: 'post',
                url: '/essential_info/calculation',
            }, false, '', function (res) {
                if(res.code==200){
                    var sum=0;
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].eiId==eiId){
                            sum=sum+res.data[i].score
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
                riqi=parseInt(riqi-Date.parse(new Date(row.data.riqi)))/(1000 * 60 * 60 * 24)/365
                $("#riqi").text(riqi.toFixed(2));
                $("#education").text(row.data.education);
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