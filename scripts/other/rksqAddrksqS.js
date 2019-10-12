$(function () {
    setDateControl('.produceTime');

    var applicationId = 0;

    var storageWarehouseApplyItemList = [];

    var allWarehouseArea = [];      // 已选库区


    // 获取园区列表
    getData('GET',api.yq.findList2,{
        accountId: accountId,
    },function (res) {
        if (res.code == 200) {
            var list = res.data;
            var html_1 = '';
            for (var i = 0; i < list.length; i++) {
                html_1 += '<div class="maskcon-item" data-id="' + list[i].id + '">' + list[i].name + '</div>';
            }

            $('.maskcon1').html(html_1);
        }
    });


    // 点击显示园区列表
    $('.container').on('click','.showPark',function () {
        $('.maskcon-item').removeClass('after');
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        $('.maskcon1').show();
        $('.mask').show();
    });

    // 选择园区
    $('.maskcon1').on('click','.maskcon-item',function (e) {
        $('.maskcon2').html('');
        $('.maskcon3').html('');
        $(this).addClass('after').siblings().removeClass('after');
        var parkId = $(this).attr('data-id');
        var parkText = $(this).html();
        $('.gd-list-item').each(function (i,item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.parkText').html(parkText).attr('data-parkId',parkId);
                $('.gd-list-item').eq(i).find('.storeroomText').html('').removeAttr('data-warehouseId');
                $('.gd-list-item').eq(i).find('.reservoirAreaText').html('').removeAttr('data-warehouseareaId');
                $('.maskcon').hide();
                $('.mask').hide();
                return;
            }
        });

        e.stopPropagation();
    });

    // 点击显示库房列表
    $('.container').on('click','.showStoreroom',function () {
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        var selfParkId = $(this).parents('.gd-list-item').find('.parkText').attr('data-parkId');
        if ($(this).parents('.gd-list-item').find('.parkText').html() != '') {
            // 获取库房列表
            getData('GET',api.yq.findList,{
                accountId: accountId,
                baseParkId: selfParkId,
            },function (res) {
                if (res.code == 200) {
                    var list = res.data;
                    var html_2 = '';
                    for (var i = 0; i < list.length; i++) {
                        html_2 += '<div class="maskcon-item" data-id="' + list[i].id + '">' + list[i].name + '</div>';
                    }

                    $('.maskcon2').html(html_2);

                    $('.maskcon2').show();
                    $('.mask').show();
                }
            });
        } else {
            common.alert({
                mask: true,
                content: '请先选择园区',
            })
        }
    });

    // 选择库房
    $('.maskcon2').on('click','.maskcon-item',function (e) {
        $('.maskcon3').html('');
        $(this).addClass('after').siblings().removeClass('after');
        var warehouseId = $(this).attr('data-id');
        var warehouseText = $(this).html();
        $('.gd-list-item').each(function (i,item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.storeroomText').html(warehouseText).attr('data-warehouseId',warehouseId);
                $('.gd-list-item').eq(i).find('.reservoirAreaText').html('').removeAttr('data-warehouseAreaId');
                $('.maskcon').hide();
                $('.mask').hide();
                return;
            }
        });

        e.stopPropagation();
    });


    // 点击显示库区列表
    $('.container').on('click','.showReservoirArea',function () {
        $('.maskcon3').html('');
        var selfWarehouseId = $(this).parents('.gd-list-item').find('.storeroomText').attr('data-warehouseId');
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        if ($(this).parents('.gd-list-item').find('.storeroomText').html() != '') {
            // 获取库区列表
            getData('GET',api.yq.findList3,{
                accountId: accountId,
                baseWarehouseId: selfWarehouseId,
            },function (res) {
                if (res.code == 200) {
                    var list = res.data;
                    var html_3 = '';
                    for (var i = 0; i < list.length; i++) {
                        if (allWarehouseArea.length > 0) {
                            for (var j = 0; j < allWarehouseArea.length; j++) {
                                if (list[i].id == allWarehouseArea[j]) {
                                    html_3 += '<div class="maskcon-item disabled" data-id="' + list[i].id + '">' + list[i].name + '</div>';
                                    break;
                                } else {
                                    if (j == allWarehouseArea.length - 1) {
                                        html_3 += '<div class="maskcon-item" data-id="' + list[i].id + '">' + list[i].name + '</div>';
                                    }

                                }
                            }
                        } else {
                            html_3 += '<div class="maskcon-item" data-id="' + list[i].id + '">' + list[i].name + '</div>';
                        }

                    }

                    $('.maskcon3').html(html_3);
                    $('.maskcon3').show();
                    $('.mask').show();
                }
            });
        } else {
            common.alert({
                mask: true,
                content: '请先选择库房',
            })
        }
    });

    // 选择库区
    $('.maskcon3').on('click','.maskcon-item',function (e) {
        if (!$(this).hasClass('disabled')) {
            var self = $(this);
            $(this).addClass('after').siblings().removeClass('after');
            var warehouseAreaId = $(this).attr('data-id');
            var warehouseAreaText = $(this).html();

            $('.gd-list-item').each(function (i,item) {
                var itemId = $(item).attr('data-applicationId');
                if (applicationId == itemId) {
                    if ($(item).attr('data-warehouseAreaId')) {
                        for (var j = 0; j < allWarehouseArea.length; j++) {
                            if ($(item).attr('data-warehouseAreaId') == allWarehouseArea[j]) {
                                allWarehouseArea.splice(j,1);
                            }
                        }
                    }

                    $('.gd-list-item').eq(i).find('.reservoirAreaText').html(warehouseAreaText).attr('data-warehouseAreaId',warehouseAreaId);
                    $('.gd-list-item').eq(i).attr('data-warehouseAreaId',warehouseAreaId);
                    allWarehouseArea.push(warehouseAreaId);
                    $('.maskcon').hide();
                    $('.mask').hide();
                    return;
                }
            });

        } else {
            common.alert({
                mask: true,
                content: '该库区已被占用',
            })
        }

        e.stopPropagation();

    });


    // 点击显示产品等级
    $('.container').on('click','.showProductLevel',function () {
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        // 获取产品等级列表
        getData('GET',api.sp.findList2,{
            accountId: accountId,
        },function (res) {
            if (res.code == 200) {
                var list = res.data;
                var html_5 = '';
                for (var i = 0; i < list.length; i++) {
                    html_5 += '<div class="maskcon-item" data-id="' + list[i].id + '">' + list[i].name + '</div>';
                }

                $('.maskcon5').html(html_5);
                $('.maskcon').hide();
                $('.maskcon5').show();
                $('.mask').show();
            }
        });
    });

    // 选择产品等级
    $('.maskcon5').on('click','.maskcon-item',function () {
        var productLevel = $(this).html();
        var productLevelId = $(this).attr('data-id');
        $('.gd-list-item').each(function (i,item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.productLevel').html(productLevel).attr('data-id',productLevelId);
                $('.maskcon').hide();
                $('.mask').hide();
                return;
            }
        });

    });


    // 点击显示产品榨季
    $('.container').on('click','.showZhaji',function () {
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        // 获取产品等级列表
        getData('GET',api.sp.findList,{
            accountId: accountId,
        },function (res) {
            if (res.code == 200) {
                var list = res.data;
                var html_6 = '';
                for (var i = 0; i < list.length; i++) {
                    html_6 += '<div class="maskcon-item" data-id="' + list[i].id + '">' + list[i].name + '</div>';
                }

                $('.maskcon6').html(html_6);
                $('.maskcon').hide();
                $('.maskcon6').show();
                $('.mask').show();
            }
        });
    });

    // 选择产品榨季
    $('.maskcon6').on('click','.maskcon-item',function () {
        var zhaji = $(this).html();
        var zhajiId = $(this).attr('data-id');
        $('.gd-list-item').each(function (i,item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.zhaji').html(zhaji).attr('data-id',zhajiId);
                $('.maskcon').hide();
                $('.mask').hide();
                return;
            }
        });

    });


    // 点击关闭弹窗
    $('.mask').on('click',function () {
        $('.maskcon').hide();
        $(this).fadeOut();
    });

    // 添加申请记录
    $('.container').on('click','.gd-add-img',function () {
        var html = '';
        applicationId ++;
        
        html += '<div class="gd-list gd-list-item" data-applicationId="' + applicationId + '">';
        html += '<img class="gd-minus" src="../img/1_31.png">';
        html += '<div class="gd-item showProd">';
        html += '<div class="gd-key">产品名称</div>';
        html += '<div class="gd-val productName" data-validateInfor="{strategy:isEmpty,msg:产品名称不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png">';
        html += '</div>';
        html += '<div class="gd-item">';
        html += '<div class="gd-key">生产批次</div>';
        html += '<input type="text" class="gd-val produceBatch" data-validateInfor="{strategy:isEmpty,msg:生产批次不能为空}">';
        html += '</div>';
        html += '<div class="gd-item">';
        html += '<div class="gd-key">生产日期</div>';
        html += '<div class="gd-val produceTime" data-validateInfor="{strategy:isEmpty,msg:生产日期不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png">';
        html += '</div>';
        html += '<div class="gd-item">';
        html += '<div class="gd-key">包装规格</div>';
        html += '<div class="gd-val specificationName"></div>';
        html += '</div>';
        html += '<div class="gd-item">';
        html += '<div class="gd-key">产品单位</div>';
        html += '<div class="gd-val unit"></div>';
        html += '</div>';
        html += '<div class="gd-item showProductLevel">';
        html += '<div class="gd-key">产品等级</div>';
        html += '<div class="gd-val productLevel" data-validateInfor="{strategy:isEmpty,msg:产品等级不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png">';
        html += '</div>';
        html += '<div class="gd-item showZhaji">';
        html += '<div class="gd-key">产品榨季</div>';
        html += '<div class="gd-val zhaji" data-validateInfor="{strategy:isEmpty,msg:产品榨季不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png">';
        html += '</div>';
        html += '<div class="gd-item">';
        html += '<div class="gd-key">产品大类</div>';
        html += '<div class="gd-val productType"></div>';
        html += '</div>';
        html += '<div class="gd-item">';
        html += '<div class="gd-key">产品品牌</div>';
        html += '<div class="gd-val productBrand"></div>';
        html += '</div>';
        html += '<div class="gd-item">';
        html += '<div class="gd-key">申请库存(吨)</div>';
        html += '<input type="text" class="gd-val applyWeight" data-validateInfor="{strategy:isEmpty,msg:申请库存不能为空}|{strategy:isNumber,msg:申请库存需为数字}">';
        html += '</div>';
        html += '<div class="gd-item">';
        html += '<div class="gd-key">质检信息</div>';
        html += '<input type="text" class="gd-val">';
        html += '</div>';
        html += '<div class="gd-item showPark">';
        html += '<div class="gd-key">所属园区</div>';
        html += '<div class="gd-val parkText" data-validateInfor="{strategy:isEmpty,msg:所属园区不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png">';
        html += '</div>';
        html += '<div class="gd-item showStoreroom">';
        html += '<div class="gd-key">所属库房</div>';
        html += '<div class="gd-val storeroomText" data-validateInfor="{strategy:isEmpty,msg:所属库房不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png">';
        html += '</div>';
        html += '<div class="gd-item showReservoirArea">';
        html += '<div class="gd-key">所属库区</div>';
        html += '<div class="gd-val reservoirAreaText" data-validateInfor="{strategy:isEmpty,msg:所属库区不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png">';
        html += '</div>';
        html += '</div>';

        $('.gd-wra').append(html);
    });


    // 点击删除申请记录
    $('.container').on('click','.gd-minus',function () {
        var text = $(this).parents('.gd-list-item').attr('data-warehouseAreaId');
        if (text != '') {
            for (var i = 0; i < allWarehouseArea.length; i++) {
                if (text == allWarehouseArea[i]) {
                    allWarehouseArea.splice(i,1);
                }
            }
        }

        $(this).parents('.gd-list-item').remove();
    });


    // 点击保存
    $('#saveBtn').on('click',function () {
        var flag = Global.initValidate('.container');
        if (!flag) {
            return;
        }

        var applyNo = $('#applyNo').val();
        var images = '';
        var remarks = $('#remarks').val();
        var teamName = $('#teamName').val();

        $('.gd-list-item').each(function (i,item) {
            var obj = {};
            obj.applyWeight = $(item).find('.applyWeight').val();
            obj.parkId = $(item).find('.parkText').attr('data-parkId');
            obj.produceBatch = {};
            obj.produceBatch.produceBatchNo = $(item).find('.produceBatch').val();
            obj.produceBatch.productLevel = {};
            obj.produceBatch.productLevel.id = $(item).find('.productLevel').attr('data-id');
            obj.produceBatch.productLevel.name = $(item).find('.productLevel').html();
            obj.produceBatch.zhaji = $(item).find('.zhaji').html();
            obj.produceBatch.zhajiId = $(item).find('.zhaji').attr('data-id');
            obj.produceTime = $(item).find('.produceTime').html();
            obj.productId = $(item).find('.productName').attr('data-id');
            obj.warehouseAreaId = $(item).find('.reservoirAreaText').attr('data-warehouseareaId');
            obj.warehouseId = $(item).find('.storeroomText').attr('data-warehouseId');
            storageWarehouseApplyItemList.push(obj);
        });

        var data2 = {
            applyNo: applyNo,
            images: images,
            remarks: remarks,
            teamName: teamName,
            storageWarehouseApplyItemList: storageWarehouseApplyItemList,
        };

        console.log(data2);

        // 提交数据
        getData('POST',api.rksqS.saveApplyMain,{
            accountId: accountId,
            jsonData: JSON.stringify(data2),
        },function (res) {
            if (res.code == 200) {
                common.alert({
                    mask: true,
                    content: '提交成功',
                    ok:function () {
                        // location.reload();

                        window.location.href ="./rksqListS.html";
                    }
                })
            } else {
                common.alert({
                    mask: true,
                    content: res.msg,
                })
            }
        });
    })


    var scrollWra = new BScroll('#scrollWra', {
        scrollbar: {
            fade: true
        },
        click: true,
        pullUpLoad: {
            threshold: 0
        }
    });

    var productName = '';
    var totalPage = 1;     // 总页数;
    var page = 1;          // 第一页;

    getData('GET', api.sp.findPageApi, {
        accountId: accountId,
        pageNo: page,
        pageSize: 10,
        productName: productName,
    }, function (res) {
        if (res.code == 200) {
            if (res.data.list.length > 0) {
                totalPage = res.data.totalPage;
                var data = res.data.list;
                renderData(data);
            } else {
                $('.loadText').text('暂无数据');
            }
        }
    });

    scrollWra.on('pullingUp', function () {
        if (totalPage == page) {
            $('.loadText').text('没有更多数据了');
            return false;
        }

        page++;
        getData('GET', api.sp.findPageApi, {
            accountId: accountId,
            pageNo: page,
            pageSize: 10,
            productName: productName,
        }, function (res) {
            if (res.code == 200) {
                if (res.data.list.length > 0) {
                    totalPage = res.data.totalPage;
                    var data = res.data.list;
                    renderData(data);
                } else {
                    $('.loadText').text('暂无数据');
                }
            }
        });

    });


    function renderData(data) {
        $('.loadText').text('正在加载中...');
        Global.requestTempByAjax('../temp/sp/spList.html', {
            list: data,
        }, function (template) {
            $('#list').append(template);
            scrollWra.finishPullUp();
            scrollWra.refresh();
            $('.loadText').text('上滑加载更多...');
        });
    }


    // 点击搜索
    $('#scarchBtn').on('click', function () {
        page = 1;
        $('#list').html('');
        productName = $('#productName').val();
        getData('GET', api.sp.findPageApi, {
            accountId: accountId,
            pageNo: page,
            pageSize: 10,
            productName: productName,
        }, function (res) {
            if (res.code == 200) {
                if (res.data.list.length > 0) {
                    totalPage = res.data.totalPage;
                    var data = res.data.list;
                    renderData(data);
                } else {
                    $('.loadText').text('暂无数据');
                }
            }
        });
    });

    // 点击显示商品弹窗
    $('.container').on('click','.showProd',function () {
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        $('#product-win').fadeIn();
    });
    
    
    // 点击关闭商品弹窗
    $('#product-win').on('click',function () {
        $(this).fadeOut();
    });
    
    
    // 点击选择商品
    $('#list').on('click','.content-item',function () {
        var productId = $(this).attr('data-id');
        if (productId != 'null') {
            getData('GET',api.sp.findById,{
                id: productId,
            },function (res) {
                if (res.code == 200) {
                    var data = res.data.list[0];
                    $('.gd-list-item').each(function (i,item) {
                        var itemId = $(item).attr('data-applicationId');
                        if (applicationId == itemId) {
                            $(item).find('.productName').html(data.productName).attr('data-id',data.id);
                            $(item).find('.specificationName').html(data.specificationName);
                            $(item).find('.unit').html(data.unit);
                            $(item).find('.productType').html(data.productType);
                            $(item).find('.productBrand').html(data.productBrand);
                            $('#product-win').fadeOut();
                        }
                    });
                }
            });
        }
    })
});