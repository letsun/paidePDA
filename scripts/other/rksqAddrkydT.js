$(function () {
    var id = Global.getUrlParam('id');
    var accountId = Global.getUrlParam('accountId');

    var applicationId = 0;

    var storageFactoryWaybillItemList = [];

    var allWarehouseArea = [];      // 已选库区



    Global.requestTempByAjax('../temp/loading/loading.html', {
    }, function (template) {
        $('.container').append(template);
    });

    getData('GET',api.rksqT.findApplyMainDetail,{
        accountId: accountId,
        id: id,
    },function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#applyNo').html(res.data.applyNo);
            $('#storageNo').html(res.data.autoFactoryWaybillNo);
            if (res.data.list.length > 0) {
                Global.requestTempByAjax('../temp/rkyd/rkydsqdmxT.html', {list:res.data.list}, function(template) {
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
        }

    });

    getData('GET',api.sp.findList2,{
        accountId: accountId,
    },function (res) {
        if (res.code == 200) {
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].open = true;
            }
            if (res.data.length > 0) {
                var setting = {
                    view: {
                        dblClickExpand: false,
                        showLine: true,
                        selectedMulti: false
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "parentId",
                            rootPId: ""
                        }
                    },
                    callback: {
                        onClick : function (e,treeId, treeNode) {
                            e.stopPropagation();
                            if (treeNode.isParent) {
                                return;
                            }
                            $('.productLevel').html(treeNode.name).attr('data-productLevelId',treeNode.id);
                            $('.mask-con8').hide();
                            $('.mask').hide();
                        }
                    }
                };

                var zNodes = res.data;

                $.fn.zTree.init($("#tree"), setting, zNodes);
            }
        }

    });



    // 点击生产批次
    $('.container').on('click','.productLevel',function () {
        // if ($(this).html() == '') {
        //     $('.maskcon8').show();
        //     $('.mask').show();
        // }

        $('.maskcon8').show();
        $('.mask').show();
    });

	// 点击显示费率列表
	$('#fl').on('click', function () {
		$('.maskcon').hide();
		$('.maskcon7').show();
		$('.mask').show();

		getData('GET', api.yq.findDict, {
			parameter: 'billing_type',
		}, function (res) {

			if (res.code == 200) {
				var html_fl = '';
				var data = res.data;
				for (var i in data) {
					html_fl += '<div class="maskcon-item" data-value = "' + data[i].value + '"> ' + data[i].label + '</div>';
				}

				$('.maskcon7').html(html_fl)
			}

		})
	});


	// 选择费率
	$('.maskcon7').on('click', '.maskcon-item', function (e) {
		// $(this).addClass('after').siblings().removeClass('after');
		var workType = $(this).html();
		var workTypeText = $(this).html();
		var value = $(this).attr('data-value');
		$('#fl').html(workTypeText);
		$('#fl').attr('data-value', value)
	});


    // 点击显示作业方式列表
    $('#showWorkType').on('click',function () {
        $('.maskcon').hide();
        $('.maskcon5').show();
        $('.mask').show();

        getData('GET',api.yq.findDict,{
            parameter:'work_type', 
        },function(res){

            if(res.code == 200) {
                var html_zy = '';
                var data = res.data;
                for (var i in data) {
                    html_zy += '<div class="maskcon-item" data-value = "'+data[i].value+'"> '+data[i].label+'</div>';
                }

                $('.maskcon5').html(html_zy)
            }

        })
    });

    // 选择作业方式
    $('.maskcon5').on('click','.maskcon-item',function (e) {
        // $(this).addClass('after').siblings().removeClass('after');
        var workType = $(this).html();
        var workTypeText = $(this).html();
        var value = $(this).attr('data-value');
        $('.forklift').html(workTypeText);
        $('.forklift').attr('data-value',value)
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
        html += '<div class="gd-list gd-list-item" data-applicationId="' + applicationId + '" data-itemId="">';
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
        html += '<div class="gd-val focusFlagText"></div>';
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
        var rentStartTime = $('#date').html();
        var serviceTeamId = $('#serviceTeamText').attr('data-serviceTeamId');
        var storageNo = $('#storageNo').html();
        var storageType = $('#storageType').html();
        var workType = $('#workType').attr('data-value');
        var warehouseOrderNo = $('#warehouseOrderNo').val();
        var billingType = $(('#fl')).attr('data-value');

        $('.gd-list-item').each(function (i,item) {
            var obj = {};
            obj.factoryApplyId = id;
            obj.factoryApplyItemId = $(item).attr('data-applyItemId');
            obj.focusFlag = $(item).find('.focusFlagText').html();
            obj.parkId = $(item).find('.parkText').attr('data-parkId');
            obj.produceBatchId = $(item).attr('data-produceBatchId');
            obj.productId = $(item).parents('.yd-item').find('.productName').attr('data-productId');
            /*obj.quantity = $(item).find('.quantity').val();*/
            obj.warehouseAreaId = $(item).find('.reservoirAreaText').attr('data-warehouseareaId');
            obj.warehouseId = $(item).find('.storeroomText').attr('data-warehouseId');
            obj.weight = $(item).find('.weight').val();
            obj.productLevelId = $(item).parents('.yd-item').find('.productLevel').attr('data-productLevelId');
            storageFactoryWaybillItemList.push(obj);
        });

        var data2 = {
            billingType:billingType,
            warehouseOrderNo:warehouseOrderNo,
            applyNo: applyNo,
            factoryApplyId: id,
            remarks: remarks,
            rentStartTime: rentStartTime,
            serviceTeamId: serviceTeamId,
            storageNo: storageNo,
            storageType: '6',
            workType: workType,
            storageFactoryWaybillItemList: storageFactoryWaybillItemList,
        };

        console.log(data2);
        $('#loadingWrapper').show();
        // 提交数据
        getData('POST',api.rkydT.saveStorageFactoryWaybillMain,{
            accountId: accountId,
            jsonData: JSON.stringify(data2),
        },function (res) {
            if (res.code == 200) {
                $('#loadingWrapper').hide();

                storageFactoryWaybillItemList = [];
                common.alert({
                    mask: true,
                    content: '提交成功',
                    ok:function () {
                        // location.reload();
                        window.location.href ="./rkydListT.html?accountId="+accountId;
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


    // 实例化装卸队伍
    var scrollWra = new BScroll('#scrollWra', {
        scrollbar: {
            fade: true
        },
        click: true,
        pullUpLoad: {
            threshold: 0
        }
    });

    var name = '';

    var totalPage = 1;     // 总页数;
    var page = 1;          // 第一页;
    var html = '';

    getData('GET', api.yq.findPageApi, {
        accountId: accountId,
        pageNo: page,
        pageSize: 10,
        name: name,
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
        getData('GET', api.yq.findPageApi, {
            accountId: accountId,
            pageNo: page,
            pageSize: 10,
            name: name,
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

    // 跳转到选择队伍页面
    $('#goTeam').on('click',function () {
        $('.maskcon9').show();
        $('.mask').fadeIn(function(){
            scrollWra.finishPullUp();
            scrollWra.refresh();
        });
    });

    function renderData(data) {
        $('.loadText').text('正在加载中...');
        Global.requestTempByAjax('../temp/rkyd/zxdw.html', {
            list: data,
            id: id,
            type: 'tc',
            func: 'add',
            accountId:accountId,

        }, function (template) {
            $('#dwlist').append(template);
            scrollWra.finishPullUp();
            scrollWra.refresh();
            $('.loadText').text('上滑加载更多...');
        });
    }

    $('#name').on('click',function (e) {
        e.stopPropagation();
    });


    // 点击搜索
    $('#scarchBtn').on('click', function (e) {
        e.stopPropagation();
        page = 1;
        $('#list').html('');
        name = $('#name').val();
        getData('GET', api.yq.findPageApi, {
            accountId: accountId,
            pageNo: page,
            pageSize: 10,
            name: name,
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

    // 点击装卸队伍
    $('.maskcon9').on('click','.content-item',function (e) {
        e.stopPropagation();
        var zxdwId = $(this).attr('data-zxdwId');
        var serviceTeamText = $(this).find('.content-item-header').html();
        $('#serviceTeamText').attr('data-serviceTeamId', zxdwId);
        $('#serviceTeamText').html(serviceTeamText);
        $('.maskcon').hide();
        $('.mask').fadeOut();
    });
});