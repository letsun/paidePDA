$(function () {
    var id = Global.getUrlParam('id');
    var serviceTeamId = Global.getUrlParam('zxdwId');
    var serviceTeamText = decodeURI(decodeURIComponent(Global.getUrlParam('zxdwText')));


    Global.requestTempByAjax('../temp/loading/loading.html', {
    }, function (template) {
        $('.container').append(template);
    });

    // 显示隐藏运单列表
    $('.gd-dec').on('click', function () {
        $(this).removeClass('active').siblings().addClass('active');
        $('#list').toggle();
    });


    // 点击查看大图
    $('#preview-btn').on('click', function () {
        $('#preview-win').fadeIn();
    });

    var applicationId = 0;

    var storageWarehouseWaybillItemList = [];

    var allWarehouseArea = [];      // 已选库区



    // 点击关闭弹窗
    $('.mask').on('click', function () {
        $('.maskcon').hide();
        $(this).fadeOut();
    });


    // 获取产品信息
    getData('GET', api.rkydS.findDetail, {
        accountId: accountId,
        id: id,
    }, function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#applyNo').html(res.data.applyNo);
            $('#storageNo').val(res.data.storageNo);
            $('#rentStartTime').html(res.data.rentStartTime);
            $('#serviceTeamName').html(res.data.serviceTeamName).attr('data-serviceTeamId',res.data.serviceTeamId);
            if (serviceTeamId && serviceTeamId != 'null') {
                $('#serviceTeamName').attr('data-serviceTeamId',serviceTeamId);
                $('#serviceTeamName').html(serviceTeamText);
            }
            $('#workType').html(res.data.workType);
            $('#storageType').html(res.data.storageType);
            $('#remarks').html(res.data.remarks);
            if (res.data.list.length > 0) {
                Global.requestTempByAjax('../temp/rkyd/rkydEditSqdmxT.html', {
                    list: res.data.list,
                    type: 'edit',
                }, function (template) {
                    $('#list').append(template);
                    $('.gd-list-item').each(function (i,item) {
                        $(item).attr('data-applicationId',applicationId);
                        applicationId++;
                        if ($(item).attr('data-warehouseareaId')) {
                            allWarehouseArea.push($(item).attr('data-warehouseareaId'));
                        }
                    })
                });
            }

            if (res.data.actList.length > 0) {
                Global.requestTempByAjax('../temp/rkyd/auditRecord.html', { actList: res.data.actList }, function (template) {
                    $('#review-list').append(template);
                });
            }
        }
    });


    // 跳转到选择队伍页面
    $('#goTeam').on('click',function () {
        window.location.href = './rksqListaddForklift.html?type=ck&func=edit&id=' + id;
    });


    // 点击显示作业方式列表
    $('.forklift').on('click',function () {
        $('.maskcon').hide();
        $('.maskcon5').show();
        $('.mask').show();
    });

    // 选择作业方式
    $('.maskcon5').on('click','.maskcon-item',function (e) {
        $(this).addClass('after').siblings().removeClass('after');
        var workType = $(this).html();
        var workTypeText = $(this).html();
        $('.forklift').html(workTypeText);
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


    // 点击显示特别关注列表
    $('.container').on('click','.showFocusFlag',function () {
        $(this).addClass('after').siblings().removeClass('after');
        applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
        $('.maskcon').hide();
        $('.maskcon6').show();
        $('.mask').show();
    });

    // 选择特别关注
    $('.maskcon6').on('click','.maskcon-item',function (e) {
        var focusFlagText = $(this).html();
        $('.gd-list-item').each(function (i,item) {
            var itemId = $(item).attr('data-applicationId');
            if (applicationId == itemId) {
                $('.gd-list-item').eq(i).find('.focusFlagText').html(focusFlagText);
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
        html += '<div class="gd-list gd-list-item" data-itemId="" data-applicationId="' + applicationId + '">';
        html += '<img class="gd-minus" src="../img/1_31.png">';
        /*html += '<div class="gd-item">';
        html += '<div class="gd-key">入库数量</div>';
        html += '<input type="text" class="gd-val quantity" data-validateInfor="{strategy:isEmpty,msg:入库数量不能为空}|{strategy:isNumber,msg:入库数量需为数字}">';
        html += '</div>';*/

        html += '<div class="gd-item">';
        html += '<div class="gd-key">入库重量(吨)</div>';
        html += '<input type="text" class="gd-val weight" data-validateInfor="{strategy:isEmpty,msg:入库重量不能为空}|{strategy:isNumber,msg:入库重量需为数字}">';
        html += '</div>';

        html += '<div class="gd-item showPark">';
        html += '<div class="gd-key">所属园区</div>';
        html += '<div class="gd-val parkText" data-validateInfor="{strategy:isEmpty,msg:所属园区不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png">';
        html += '</div>';

        html += '<div class="gd-item showStoreroom">';
        html += '<div class="gd-key">所属库房</div>';
        html += '<div class="gd-val storeroomText" data-validateInfor="{strategy:isEmpty,msg:所属库房不能为空}"></div>';
        html += '<img class="gd-img " src="../img/1_34.png" >';
        html += '</div>';

        html += '<div class="gd-item showReservoirArea">';
        html += '<div class="gd-key">入库库区</div>';
        html += '<div class="gd-val reservoirAreaText" data-validateInfor="{strategy:isEmpty,msg:入库库区不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png" >';
        html += '</div>';

        html += '<div class="gd-item showFocusFlag">';
        html += '<div class="gd-key">特别关注</div>';
        html += '<div class="gd-val focusFlagText" data-validateInfor="{strategy:isEmpty,msg:特别关注不能为空}"></div>';
        html += '<img class="gd-img" src="../img/1_34.png" >';
        html += '</div>';
        html += '</div>';

        $(this).parents('.yd-item').find('.gd-infor').append(html);
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
        var remarks = $('#remarks').val();
        var rentStartTime = $('#rentStartTime').html();
        var serviceTeamId = $('#serviceTeamName').attr('data-serviceTeamId');
        var storageNo = $('#storageNo').val();
        var storageType = $('#storageType').html();
        var workType = $('#workType').html();

        $('.gd-list-item').each(function (i,item) {
            var obj = {};
            obj.factoryApplyId = $(item).attr('data-factoryApplyId');
            obj.factoryApplyItemId = $(item).attr('data-applyItemId');
            obj.focusFlag = $(item).find('.focusFlagText').html();
            obj.id = $(item).attr('data-itemId');
            obj.parkId = $(item).find('.parkText').attr('data-parkId');
            obj.produceBatchId = $(item).parents('.yd-item').find('.produceBatch').attr('data-produceBatchId');
            obj.productId = $(item).parents('.yd-item').find('.productName').attr('data-productId');
            obj.warehouseAreaId = $(item).find('.reservoirAreaText').attr('data-warehouseareaId');
            obj.warehouseId = $(item).find('.storeroomText').attr('data-warehouseId');
            obj.weight = $(item).find('.weight').val();
            storageWarehouseWaybillItemList.push(obj);
        });


        var applyId = $('.gd-list-item').attr('data-factoryApplyId')
        var data2 = {
            id:id,
            applyNo: applyNo,
            applyId: applyId,
            remarks: remarks,
            rentStartTime: rentStartTime,
            serviceTeamId: serviceTeamId,
            storageNo: storageNo,
            storageType: storageType,
            workType: workType,
            storageWarehouseWaybillItemList: storageWarehouseWaybillItemList,
        };

        console.log(data2);
        $('#loadingWrapper').show()
        // 提交数据
        getData('POST',api.rkydS.saveWaybillMain,{
            accountId: accountId,
            jsonData: JSON.stringify(data2),
        },function (res) {
            if (res.code == 200) {
                $('#loadingWrapper').hide()
                storageWarehouseWaybillItemList = [];
                common.alert({
                    mask: true,
                    content: '提交成功',
                    ok:function () {
                        // location.reload();
                        window.location.href ="./rkydListS.html";
                    }
                })
            } else {
                $('#loadingWrapper').hide()
                common.alert({
                    mask: true,
                    content: res.msg,
                })
            }
        });
    })

})