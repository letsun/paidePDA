$(function () {
    var id = Global.getUrlParam('id');

    var applicationId = 0;

    var storageFactoryApplyItemList = [];

    var allWarehouseArea = [];      // 已选库区


    // 获取工作班次
    $('#teamName').on('click', function () {
        getData('GET', api.yq.findShiftWorkList, {
            accountId: accountId,
        }, function (res) {
            if (res.code == 200) {

                var html_4 = '';
                for (var i = 0; i < res.data.shiftWorkList.length; i++) {
                    html_4 += '<div class="maskcon-item" data-id="' + res.data.shiftWorkList[i].id + '">' + res.data.shiftWorkList[i].name + '</div>';
                }
                $('.maskcon4').html(html_4);

                $('.maskcon4').show();
                $('.mask').show();
            }
        });
    })


    $('.maskcon4').on('click','.maskcon-item',function(){
        var teamNameId = $(this).attr('data-id');
        var teamName = $(this).html()
        $('#teamName').attr('data-teamNameId',teamNameId);
        $('#teamName').html(teamName)
    });


    // 获取产品信息
    getData('GET', api.rkybT.findDetailById, {
        id: id,
        accountId: accountId
    }, function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#produceBatchNo').html(res.data.produceBatchNo).attr('data-produceBatchId', res.data.produceBatchId);
            $('#produceTime').html(res.data.produceTime);
            $('#productBrand').html(res.data.productBrand);
            $('#productLevel').html(res.data.productLevel);
            $('#productName').html(res.data.productName).attr('data-productId', res.data.productId);
            $('#productType').html(res.data.productType);
            $('#specification').html(res.data.specification);
            $('#totalQuantity').html(res.data.totalQuantity);
            $('#totalWeight').html(res.data.totalWeight);
            $('#unit').html(res.data.unit);
            $('#zhaji').html(res.data.zhaji);
            $('#checkStatus').html(res.data.checkStatus);

            $('#applyNo').html(res.data.autoFactoryApplyNo)

            // console.log(res.data.autoFactoryApplyNo.length)
        }
    });

    // 获取园区列表
    getData('GET', api.yq.findList2, {
        accountId: accountId,
    }, function (res) {
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
    $('.container').on('click', '.showPark', function () {
        $('.maskcon-item').removeClass('after');
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        $('.maskcon1').show();
        $('.mask').show();
    });

    // 选择园区
    $('.maskcon1').on('click', '.maskcon-item', function (e) {
        $('.maskcon2').html('');
        $('.maskcon3').html('');
        $(this).addClass('after').siblings().removeClass('after');
        var parkId = $(this).attr('data-id');
        var parkText = $(this).html();
        $('.gd-list-item').each(function (i, item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.parkText').html(parkText).attr('data-parkId', parkId);
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
    $('.container').on('click', '.showStoreroom', function () {
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        var selfParkId = $(this).parents('.gd-list-item').find('.parkText').attr('data-parkId');
        if ($(this).parents('.gd-list-item').find('.parkText').html() != '') {
            // 获取库房列表
            getData('GET', api.yq.findList, {
                accountId: accountId,
                baseParkId: selfParkId,
            }, function (res) {
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
    $('.maskcon2').on('click', '.maskcon-item', function (e) {
        $('.maskcon3').html('');
        $(this).addClass('after').siblings().removeClass('after');
        var warehouseId = $(this).attr('data-id');
        var warehouseText = $(this).html();
        $('.gd-list-item').each(function (i, item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.storeroomText').html(warehouseText).attr('data-warehouseId', warehouseId);
                $('.gd-list-item').eq(i).find('.reservoirAreaText').html('').removeAttr('data-warehouseAreaId');
                $('.maskcon').hide();
                $('.mask').hide();
                return;
            }
        });

        e.stopPropagation();
    });


    // 点击显示库区列表
    $('.container').on('click', '.showReservoirArea', function () {
        $('.maskcon3').html('');
        var selfWarehouseId = $(this).parents('.gd-list-item').find('.storeroomText').attr('data-warehouseId');
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        if ($(this).parents('.gd-list-item').find('.storeroomText').html() != '') {
            // 获取库区列表
            getData('GET', api.yq.findList3, {
                accountId: accountId,
                baseWarehouseId: selfWarehouseId,
            }, function (res) {
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
    $('.maskcon3').on('click', '.maskcon-item', function (e) {
        if (!$(this).hasClass('disabled')) {
            var self = $(this);
            $(this).addClass('after').siblings().removeClass('after');
            var warehouseAreaId = $(this).attr('data-id');
            var warehouseAreaText = $(this).html();

            $('.gd-list-item').each(function (i, item) {
                var itemId = $(item).attr('data-applicationId');
                if (applicationId == itemId) {
                    if ($(item).attr('data-warehouseAreaId')) {
                        for (var j = 0; j < allWarehouseArea.length; j++) {
                            if ($(item).attr('data-warehouseAreaId') == allWarehouseArea[j]) {
                                allWarehouseArea.splice(j, 1);
                            }
                        }
                    }

                    $('.gd-list-item').eq(i).find('.reservoirAreaText').html(warehouseAreaText).attr('data-warehouseAreaId', warehouseAreaId);
                    $('.gd-list-item').eq(i).attr('data-warehouseAreaId', warehouseAreaId);
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
    $('.mask').on('click', function () {
        $('.maskcon').hide();
        $(this).fadeOut();
    });

    // 添加申请记录
    $('.gd-add-img').on('click', function () {
        var html = '';
        applicationId++;
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
        html += '<div class="gd-val reservoirAreaText" ></div>';

        html += '<img class="gd-img" src="../img/1_34.png" >';
        html += '</div>';
        html += '</div>';


        $('#gd-infor').append(html)
    });


    // 点击删除申请记录
    $('.container').on('click', '.gd-minus', function () {

        // debugger

        var text = $(this).parents('.gd-list-item').attr('data-warehouseAreaId');
        if (text != '') {
            for (var i = 0; i < allWarehouseArea.length; i++) {
                if (text == allWarehouseArea[i]) {
                    allWarehouseArea.splice(i, 1);
                }

            }
        }

        $(this).parents('.gd-list-item').remove();
    });


    var maskconWra = new BScroll('.maskcon7', {
        scrollbar: {
            fade: true
        },
        click: true,
        pullUpLoad: {
            threshold: 0
        }
    });

    var customerTotalPage = 1;
    // 获取货主列表
    $('.selectCustomer').on('click', function () {
        customerPage = 1;
        $('.maskcon7 .maskcon-wra').html('');
        getData('GET', api.yq.findCustomerList, {
            accountId: accountId,
            pageNo: customerPage,
            pageSize: 20,
        }, function (res) {
            if (res.code == 200) {
                var customerList = res.data.customerList;
                customerTotalPage = res.data.totalPage;
                if (customerList.length > 0) {
                    var html_4 = '';
                    for (var i = 0; i < customerList.length; i++) {
                        html_4 += '<div class="maskcon-item" data-id="' + customerList[i].id + '">' + customerList[i].name + '</div>';
                    }
                    $('.maskcon7 .maskcon-wra').append(html_4);

                    $('.maskcon7').show();
                    $('.mask').show();
                    maskconWra.finishPullUp();
                    maskconWra.refresh();
                } else {
                    $('.loadText').text('暂无数据');
                }
            }
        });

        // $('.maskcon7').show();
        // $('.mask').show();
        // maskconWra.finishPullUp();
        // maskconWra.refresh();
    });

    maskconWra.on('pullingUp', function () {
        if (customerTotalPage == customerPage) {
            $('.loadText').text('没有更多数据了');
            return false;
        }

        customerPage++;
        getData('GET', api.yq.findCustomerList, {
            accountId: accountId,
            pageNo: customerPage,
            pageSize: 20,
        }, function (res) {
            if (res.code == 200) {
                var customerList = res.data.customerList;
                customerTotalPage = res.data.totalPage;
                if (customerList.length > 0) {
                    var html_4 = '';
                    for (var i = 0; i < customerList.length; i++) {
                        html_4 += '<div class="maskcon-item" data-id="' + customerList[i].id + '">' + customerList[i].name + '</div>';
                    }
                    $('.maskcon7 .maskcon-wra').append(html_4);
                    $('.maskcon7').show();
                    $('.mask').show();
                    maskconWra.finishPullUp();
                    maskconWra.refresh();
                } else {
                    $('.loadText').text('暂无数据');
                }
            }
        });

    });


    // 选择货主
    $('.maskcon7').on('click','.maskcon-item',function(){
        var customerId = $(this).attr('data-id');
        var customerName = $(this).html();
        $('#selectCustomer').attr('data-customerId',customerId);
        $('#selectCustomer').html(customerName);
    });


    // 点击保存
    $('#saveBtn').on('click', function () {
        var flag = Global.initValidate('.container');
        if (!flag) {
            return;
        }

        var applyNo = $('#applyNo').html();
        var teamName = $('#teamName').attr('data-teamNameId');
        var customerId = $('#selectCustomer').attr('data-customerId');
        var remark = $('#remark').val();
        var warehouseOrderNo = $('#warehouseOrderNo').val();

        $('.gd-list-item').each(function (i, item) {
            var obj = {};
            obj.applyWeight = $(item).find('.inStock').val();
            obj.parkId = $(item).find('.parkText').attr('data-parkId');
            obj.productId = $('#productName').attr('data-productId');
            obj.produceBatchId = $('#produceBatchNo').attr('data-produceBatchId');
            obj.warehouseId = $(item).find('.storeroomText').attr('data-warehouseId');
            obj.warehouseAreaId = $(item).find('.reservoirAreaText').attr('data-warehouseareaId');
            storageFactoryApplyItemList.push(obj);
        });

        var data2 = {
            warehouseOrderNo: warehouseOrderNo,
            id: id,
            applyNo: applyNo,
            remarks: remark,
            teamName: teamName,
            customerId: customerId,
            storageFactoryApplyItemList: storageFactoryApplyItemList,
        };

        console.log(data2);
        // 提交数据
        getData('POST', api.rkybT.saveStorageFactoryApplyMain, {
            accountId: accountId,
            jsonData: JSON.stringify(data2),
        }, function (res) {
            if (res.code == 200) {
                common.alert({
                    mask: true,
                    content: '提交成功',
                    ok: function () {
                        location.reload();
                        window.location.href = "./rkybListT.html?accountId=" + accountId;
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
});