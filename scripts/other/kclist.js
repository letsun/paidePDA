$(function () {

    var scrollWra = new BScroll('#scrollWra', {
        scrollbar: {
            fade: true
        },
        click: true,
        pullUpLoad: {
            threshold: 0
        }
    });

    var accountId = Global.getUrlParam('accountId');
    var traceGroupId = Global.getUrlParam('traceGroupId'); //集团id
    var traceCompanyId = Global.getUrlParam('traceCompanyId');//企业id
    var totalPage = 1;     // 总页数;
    var page = 1;          // 第一页;
    var parkId = '';
    var productId = '';
    var productName = '';
    var warehouseAreaId = '';
    var warehouseId = '';
    var companyId = '';
    var customerId ='';
    // 根据溯源系统查询wms系统id
    if (traceGroupId != null || traceCompanyId != null) {
        getData('GET', api.kc.getByTraceId, {
            traceGroupId: traceGroupId,
            traceCompanyId: traceCompanyId
        }, function (res) {

            console.log(res)
            if (res.code == 200) {
                if (res.data.showSelect == 1) {
                    $('.content').css('top', '460px');

                    var html = '';
                    for (var i = 0; i < res.data.companyList.length; i++) {
                        html += '<option value="' + res.data.companyList[i].id + '">' + res.data.companyList[i].name + '</option>';
                    }
                    $("#nav").html(html);
                    $('.nav').show();


                } else {
                    $('.content').css('top', '390px');
                    $('.nav').hide();

                    console.log(companyId)

                }
                companyId = res.data.companyId;
                yq();//查询园区
                findPageApi();//查询产品
                findCustomerList();//货主查询
                search();
            }
        })

        console.log('111')
    } else {
        yq();//查询园区
        search();
        findPageApi();//查询产品
        findCustomerList();//货主查询
    }


    //选择企业获取园区

    $('#nav').change(function () {
        companyId = $('#nav').val();


        parkId = '';
        warehouseId = '';
        warehouseAreaId = '';
        productId = '';

        $('#select1').val('');
        $('#select2').val('');
        $('#select3').val('');
        $('#select4').val('');
        yq()
        search();
    })


    // getData('POST', api.kc.search, {
    //     accountId: accountId,	//pda账号id	string	
    //     pageNo: page,	//当前页	number	
    //     pageSize: 10,	//每页条数	number	
    //     parkId: parkId,	//园区id	string	
    //     productId: productId,	//产品id	string	
    //     productName: productName,	//产品名称	string	
    //     traceCompanyId: traceCompanyId,//溯源系统企业id	number	
    //     traceGroupId: traceGroupId,	//溯源系统集团id	number	
    //     warehouseAreaId: warehouseAreaId,	//库区id	string	
    //     warehouseId: warehouseId,  //库房id

    // }, function (res) {
    //     if (res.code == 200) {
    //         if (res.data.records.length > 0) {
    //             totalPage = res.data.totalPage;
    //             var data = res.data.records;
    //             renderData(data);

    //         } else {
    //             $('.loadText').text('暂无数据');
    //         }
    //     }
    // });

    scrollWra.on('pullingUp', function () {
        if (totalPage == page) {
            $('.loadText').text('没有更多数据了');
            return false;
        }

        page++;
        getData('POST', api.kc.search, {
            accountId: accountId,	//pda账号id	string	
            pageNo: page,	//当前页	number	
            pageSize: 10,	//每页条数	number	
            parkId: parkId,	//园区id	string	
            productId: productId,	//产品id	string	
            productName: productName,	//产品名称	string	
            traceCompanyId: traceCompanyId,//溯源系统企业id	number	
            traceGroupId: traceGroupId,	//溯源系统集团id	number	
            warehouseAreaId: warehouseAreaId,	//库区id	string	
            warehouseId: warehouseId,  //库房id
        }, function (res) {
            if (res.code == 200) {
                if (res.data.records.length > 0) {
                    totalPage = res.data.totalPage;
                    var data = res.data.records;
                    renderData(data);
                } else {
                    $('.loadText').text('暂无数据');
                }
            }
        });

    });


    function renderData(data) {
        $('.loadText').text('正在加载中...');
        Global.requestTempByAjax('../temp/kc/list.html', { list: data }, function (template) {

            $('#list').append(template);
            scrollWra.finishPullUp();
            scrollWra.refresh();
            $('.loadText').text('上滑加载更多...');
        });
    }


    $('#productName').on('input', function () {
        productName = $('#productName').val();
    })


    // 点击搜索
    $('#scarchBtn').on('click', function () {
        search();
    });

    //园区

    function yq() {
        getData('get', api.yq.findList2, {
            accountId: accountId,
            companyId: companyId,
        }, function (res) {
            var html = '';

            html += '<option value="">全部</option>';
            for (var i = 0; i < res.data.length; i++) {
                html += '<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>';
            }
            $("#select1").html(html)
        })
    }



    //选择园区查询库房
    $("#select1").change(function () {
        parkId = $("#select1").val();
        warehouseId = '';
        warehouseAreaId = '';
        productId = '';

        $('#select2').val('');
        $('#select3').val('');
        $('#select4').val('');
        getData('get', api.yq.findList, {
            accountId: accountId,
            baseParkId: parkId,
            companyId: companyId,
        }, function (res) {
            var html = '';
            html += '<option value="">全部</option>';
            for (var i = 0; i < res.data.length; i++) {
                html += '<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>';
            }
            $("#select2").html(html);
            search();
        })

    })

    //选择库房查询库区
    $("#select2").change(function () {
        warehouseId = $("#select2").val();
        warehouseAreaId = '';
        productId = '';
        $('#select3').val('');
        $('#select4').val('')
        getData('get', api.yq.findList3, {
            accountId: accountId,
            baseWarehouseId: warehouseId,
            companyId: companyId
        }, function (res) {
            var html = '';
            html += '<option value="">全部</option>';
            for (var i = 0; i < res.data.length; i++) {
                html += '<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>';
            }
            $("#select3").html(html)

            search();
        })
    })



    //商品查询
    function findPageApi() {
        getData('get', api.sp.findPageApi, {
            accountId: accountId,
            baseWarehouseId: warehouseId,
            companyId: companyId
        }, function (res) {
            console.log(res)
            var html = '';
            html += '<option value="">全部</option>';
            for (var i = 0; i < res.data.list.length; i++) {
                html += '<option value="' + res.data.list[i].id + '">' + res.data.list[i].productName + '</option>';
            }
            $("#select4").html(html)


        })
    }


    //货主查询
    function findCustomerList() {
        getData('get', api.yq.findCustomerList, {
            accountId: accountId,

            companyId: companyId
        }, function (res) {
            console.log(res)
            var html = '';
            html += '<option value="">全部</option>';
            for (var i = 0; i < res.data.customerList.length; i++) {
                html += '<option value="' + res.data.customerList[i].id + '">' + res.data.customerList[i].name + '</option>';
            }
            $("#nav1").html(html)

  
        })
    }

    $('#nav1').change(function(){
        customerId = $('#nav1').val();
        search();
    })



    //选择库区查询产品
    $("#select3").change(function () {
        warehouseAreaId = $("#select3").val();
        productId = '';
        $('#select4').val('');
        search();
    })

    //选择产品
    $("#select4").change(function () {
        productId = $("#select4").val();
        search();
    })

    function search() {
        page = 1;
        $('#list').html('');
        getData('POST', api.kc.search, {
            accountId: accountId,	//pda账号id	string	
            companyId: companyId,
            pageNo: page,	//当前页	number	
            pageSize: 10,	//每页条数	number	
            parkId: parkId,	//园区id	string	
            productId: productId,	//产品id	string	
            productName: productName,	//产品名称	string	
            traceCompanyId: traceCompanyId,//溯源系统企业id	number	
            traceGroupId: traceGroupId,	//溯源系统集团id	number	
            warehouseAreaId: warehouseAreaId,	//库区id	string	
            warehouseId: warehouseId,  //库房id
            customerId:customerId, //货主id
        }, function (res) {
            if (res.code == 200) {
                if (res.data.records.length > 0) {
                    totalPage = res.data.totalPage;
                    var data = res.data.records;

                    $('#totalInventory').html(res.data.totalInventory+'吨');
                    $('#totalRealInventory').html(res.data.totalRealInventory+'吨')
                    renderData(data);
                } else {
                    $('.loadText').text('暂无数据');
                }

                if (res.data.pageNo == res.data.totalPage) {
                    $('.loadText').text('没有更多数据了');
                }
            }
        });
    }


})