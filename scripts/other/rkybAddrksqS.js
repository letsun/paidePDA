$(function () {
    var id = Global.getUrlParam('id');

    var applicationId = 0;

    var parkId = '';
    var parkText = '';

    var warehouseId = '';
    var warehouseText = '';

    var warehouseAreaId = '';
    var warehouseAreaText = '';

    var storageFactoryApplyItemList = [];

    var allWarehouseArea = [];

    // 获取产品信息
    getData('GET',api.rkybt.findDetailById,{
        id: id,
    },function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#produceBatchNo').html(res.data.produceBatchNo);
            $('#produceTime').html(res.data.produceTime);
            $('#productBrand').html(res.data.productBrand);
            $('#productLevel').html(res.data.productLevel);
            $('#productName').html(res.data.productName);
            $('#productType').html(res.data.productType);
            $('#specification').html(res.data.specification);
            $('#totalQuantity').html(res.data.totalQuantity);
            $('#totalWeight').html(res.data.totalWeight);
            $('#unit').html(res.data.unit);
            $('#zhaji').html(res.data.zhaji);
        }
    });

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
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        $('.maskcon1').show();
        $('.mask').show();
    });

    // 选择园区
    $('.maskcon1').on('click','.maskcon-item',function (e) {
        $(this).addClass('after').siblings().removeClass('after');
        parkId = $(this).attr('data-id');
        parkText = $(this).html();
        $('.gd-list-item').each(function (i,item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.parkText').html(parkText).attr('data-parkId',parkId);
                $('.maskcon1').hide();
                $('.mask').hide();
                return;
            }
        });

        e.stopPropagation();
    });

    // 点击显示库房列表
    $('.container').on('click','.showStoreroom',function () {
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');

        // 获取库房列表
        getData('GET',api.yq.findList,{
            accountId: accountId,
            baseParkId: parkId,
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
    });

    // 选择库房
    $('.maskcon2').on('click','.maskcon-item',function (e) {
        $(this).addClass('after').siblings().removeClass('after');
        warehouseId = $(this).attr('data-id');
        warehouseText = $(this).html();
        $('.gd-list-item').each(function (i,item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.storeroomText').html(warehouseText).attr('data-warehouseId',warehouseId);
                $('.maskcon2').hide();
                $('.mask').hide();
                return;
            }
        });

        e.stopPropagation();
    });


    // 点击显示库区列表
    $('.container').on('click','.showReservoirArea',function () {
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');

        // 获取库区列表
        getData('GET',api.yq.findList3,{
            accountId: accountId,
            baseWarehouseId: warehouseId,
        },function (res) {
            if (res.code == 200) {
                var list = res.data;
                var html_3 = '';
                for (var i = 0; i < list.length; i++) {
                    html_3 += '<div class="maskcon-item" data-id="' + list[i].id + '">' + list[i].name + '</div>';
                }

                $('.maskcon3').html(html_3);

                $('.maskcon3').show();
                $('.mask').show();
            }
        });
    });

    // 选择库区
    $('.maskcon3').on('click','.maskcon-item',function (e) {
        $(this).addClass('after').siblings().removeClass('after');
        warehouseAreaId = $(this).attr('data-id');
        warehouseAreaText = $(this).html();
        $('.gd-list-item').each(function (i,item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.reservoirAreaText').html(warehouseAreaText).attr('data-warehouseAreaId',warehouseAreaId);
                allWarehouseArea.push(warehouseAreaText);
                $('.maskcon3').hide();
                $('.mask').hide();
                return;
            }
        });

        e.stopPropagation();
    });


    // 点击关闭弹窗
    $('.mask').on('click',function () {
        $(this).fadeOut();
    });

    // 添加申请记录
    $('.gd-add-img').on('click', function () {
        var html = '';
        applicationId ++;
        html += '<div class="gd-list gd-list-item" data-applicationId="' + applicationId + '">';
        html += '<img class="gd-minus" src="../img/1_31.png">';
        html += '<div class="gd-item">';
        html += ' <div class="gd-key">申请库存(吨)</div>';
        html += ' <input type="text" class="gd-val inStock">';


        html += '</div>';
        html += '<div class="gd-item showPark">';
        html += '<div class="gd-key">所属园区</div>';
        html += '<div class="gd-val parkText"></div>';

        html += '<img class="gd-img" src="../img/1_34.png" >';
        html += '</div>';
        html += '<div class="gd-item storeroomText">';
        html += '<div class="gd-key">所属库房</div>';
        html += '<div class="gd-val"></div>';

        html += '<img class="gd-img showStoreroom" src="../img/1_34.png" >';
        html += '</div>';

        html += '<div class="gd-item reservoirAreaText">';
        html += '<div class="gd-key">所属库区</div>';
        html += '<div class="gd-val"></div>';

        html += '<img class="gd-img showReservoirArea" src="../img/1_34.png" >';
        html += '</div>';
        html += '</div>';


        $('#gd-infor').append(html)
    });


    // 点击删除申请记录
    $('.container').on('click','.gd-minus',function () {
        var text = $(this).aprents('.gd-list-item').find('.reservoirAreaText').html();
        if (text != '') {
            allWarehouseArea.push(warehouseAreaText);
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
        var applyNo = $('#applyNo').val();
        var teamName = $('#teamName').val();
        var remark = $('#remark').val();

        $('.gd-list-item').each(function (i,item) {
            var obj = {};
            obj.applyWeight = $(item).find('.inStock').val();
            obj.parkId = $(item).find('.parkText').attr('data-parkid');
            obj.warehouseId = $(item).find('.storeroomText').attr('data-warehouseid');
            obj.warehouseAreaId = $(item).find('.reservoirAreaText').attr('data-warehouseareaid');
            storageFactoryApplyItemList.push(obj);
        });

        var data2 = {
            id: id,
            applyNo: applyNo,
            remarks: remark,
            teamName: teamName,
            storageFactoryApplyItemList: storageFactoryApplyItemList,
        };

        // 提交数据
        getData('POST',api.rkybt.saveStorageFactoryApplyMain,{
            jsonData: JSON.stringify(data2),
        },function (res) {
            if (res.code == 200) {

            }
        });
    })
});