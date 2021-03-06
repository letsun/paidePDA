$(function () {
    var id = Global.getUrlParam('id');

    var applicationId = 0;

    var storageWarehouseApplyItemList = [];

    var allWarehouseArea = [];      // 已选库区

    Global.requestTempByAjax('../temp/loading/loading.html', {
    }, function (template) {
        $('.container').append(template);
    });


    var contractCode = Global.getUrlParam('contractCode');
    var contractId = Global.getUrlParam('contractId');
    var accountId = Global.getUrlParam('accountId');



    // 进入合同列表
    $('#goContract').on('click',function () {
        window.location.href = './rkybaddContract.html?id=' + id + '&accountId=' + accountId;
    });

    if (contractId != 'null') {
        $('#goContract').find('.gd-val').attr('data-contractId',contractId).html(contractCode);
    }

    // 获取产品信息
    getData('GET',api.rkybS.findDetailById,{
        id: id,
        accountId:accountId
    },function (res) {
        if (res.code == 200) {
            var data = res.data.list[0];
            $('#produceBatchNo').html(data.produceBatchNo).attr('data-produceBatchId',data.productBatchId);
            $('#produceTime').html(data.produceTime);
            $('#productBrand').html(data.productBrand);
            $('#productLevel').html(data.productLevel).attr("data-id",data.productLevelId);
           
            $('#productName').html(data.productName).attr('data-productId',data.productId);
            $('#productType').html(data.productType);
            $('#specification').html(data.specification);
            $('#quantity').html(data.quantity);
            $('#weight').html(data.weight);
            $('#unit').html(data.unit);
            $('#zhaji').html(data.zhaji);
            $('#checkStatus').html(data.checkStatus);
            $('#itemId').attr('data-itemId',data.itemId)
            $('#applyNo').html(res.data.autoWarehouseApplyNo)

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


    // 点击关闭弹窗
    $('.mask').on('click',function () {
        $('.maskcon').hide();
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
        html += ' <input type="text" class="gd-val inStock" data-validateInfor="{strategy:isEmpty,msg:申请库存不能为空}|{strategy:isNumber,msg:申请库存需为数字}">';


        html += '</div>';
        html += '<div class="gd-item showPark">';
        html += '<div class="gd-key">所属园区</div>';
        html += '<div class="gd-val parkText" data-validateInfor="{strategy:isEmpty,msg:所属园区不能为空}"></div>';

        html += '<img class="gd-img" src="../img/1_34.png" >';
        html += '</div>';
        html += '<div class="gd-item showStoreroom">';
        html += '<div class="gd-key">所属库房</div>';
        html += '<div class="gd-val storeroomText" ></div>';

        html += '<img class="gd-img " src="../img/1_34.png" >';
        html += '</div>';

        html += '<div class="gd-item showReservoirArea">';
        html += '<div class="gd-key">所属库区</div>';
        html += '<div class="gd-val reservoirAreaText"></div>';

        html += '<img class="gd-img" src="../img/1_34.png" >';
        html += '</div>';
        html += '</div>';


        $('#gd-infor').append(html)
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

        var applyNo = $('#applyNo').html();
        var contractId = $('#contractId').attr('data-contractId');
        var teamName = $('#teamName').val();
        var remark = $('#remark').val();
        var warehouseOrderNo = $('#warehouseOrderNo').val();

        $('.gd-list-item').each(function (i,item) {
            var obj = {};
            obj.applyWeight = $(item).find('.inStock').val();
            obj.productId = $('#productName').attr('data-productId');
            obj.produceBatchId = $('#produceBatchNo').attr('data-produceBatchId');
            obj.productLevelId =  $('#productLevel').attr('data-id');
            obj.parkId = $(item).find('.parkText').attr('data-parkId');
            obj.warehouseId = $(item).find('.storeroomText').attr('data-warehouseId');
            obj.warehouseAreaId = $(item).find('.reservoirAreaText').attr('data-warehouseareaId');
            // obj.warehouseForecastItemId = $('#itemId').attr('data-itemId');
            obj.warehouseForecastMainId = id;
            storageWarehouseApplyItemList.push(obj);
            
           
        });

        var data2 = {
            warehouseOrderNo:warehouseOrderNo,
            id: id,
            applyNo: applyNo,
            contractId: contractId,
            remarks: remark,
            teamName: teamName,
            storageWarehouseApplyItemList: storageWarehouseApplyItemList,
        };

        console.log(data2);
        $('#loadingWrapper').show();
        // 提交数据
        getData('POST',api.rkybS.saveWarehouseApplyMain,{
            accountId:accountId,
            jsonData: JSON.stringify(data2),
        },function (res) {
            if (res.code == 200) {
                $('#loadingWrapper').hide();
                common.alert({
                    mask: true,
                    content: '提交成功',
                    ok:function () {
                        // location.reload();
                        window.location.href ="./rkybListS.html?accountId="+accountId;
                    }
                })
            } else {
                $('#loadingWrapper').hide();
                common.alert({
                    mask: true,
                    content: res.msg,
                })
            }
        });
    })
});