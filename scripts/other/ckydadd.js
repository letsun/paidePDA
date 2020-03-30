$(function () {
	//转圈圈
	Global.requestTempByAjax('../temp/loading/loading.html', {}, function (template) {
		$('.container').append(template);
	});

	var productList = [];
	var applyNo = Global.getUrlParam('id');

	var applicationId = 0;

	var outWaybillItemList = [];

	var allWarehouseArea = []; // 已选库区


	getData('GET', api.cksq.findApplyMainDetail, {
		accountId: accountId,
		id: applyNo,
	}, function (res) {
		if (res.code == 200) {
			var data = res.data;
			console.log(res.data);
			$('#applyNo').html(res.data.applyNo);
			$('#rentalEndTime').html(res.data.rentalEndTime);
			$('#contractId').html(res.data.contractNo);
			$('#customerName').html(res.data.customerName);
			if (res.data.driverId != null && res.data.driverId != '' && res.data.driverId != 'undefined') {
                $('#driverName').html(res.data.driverName).attr('data-id',res.data.driverId);
			}
			$('#plateNo').html(res.data.plateNo);
			$('#driverPhone').html(res.data.driverPhone);
			$('#idcard').html(res.data.idcard);
			$('#transportFee').val(res.data.transportFee);
			$('#transferGroup').html(res.data.transferGroup);
			$('#transferCompany').html(res.data.transferCompany);
			$('#tmsCarrier').html(res.data.tmsCarrier);
			$('#tmsSite').html(res.data.tmsSite);
			$('#tmsShippingMethod').html(res.data.tmsShippingMethod);
			$('#shippingAddress').val(res.data.shippingAddress);
			$('#applyNo').html(res.data.applyNo);

			$('#outType').attr('data-outTypeValue', res.data.outTypeValue);


			$('#outWaybillNo').html(res.data.autoWaybillNo);
			$('#outType').html(res.data.outType);

			if (res.data.outTypeValue == 1) {
				$('.yc').hide()
			} else {
				$('.yc').show()
			}
			if (res.data.productList.length > 0) {
                productList = res.data.productList;
				Global.requestTempByAjax('../temp/ckyd/ckydsqdmxT.html', {
					list: res.data.productList
				}, function (template) {
					$('#list').append(template);
					$('.gd-list-item').each(function (i, item) {
						$(item).attr('data-applicationId', applicationId);
						applicationId++;
						if ($(item).attr('data-warehouseareaId')) {
							//allWarehouseArea.push($(item).attr('data-warehouseareaId'));
						}
					})
				});
			}
		}

	});

	// 点击显示费率列表
	$('#fl').on('click', function () {
		$('.maskcon').hide();
		$('.maskcon6').show();
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

				$('.maskcon6').html(html_fl)
			}

		})
	});


	// 选择费率
	$('.maskcon6').on('click', '.maskcon-item', function (e) {
		// $(this).addClass('after').siblings().removeClass('after');
		var workType = $(this).html();
		var workTypeText = $(this).html();
		var value = $(this).attr('data-value');
		$('#fl').html(workTypeText);
		$('#fl').attr('data-value', value)
	});



	// 点击显示作业方式列表
	$('#showWorkType').on('click', function () {
		$('.maskcon').hide();
		$('.maskcon5').show();
		$('.mask').show();

		getData('GET', api.yq.findDict, {
			parameter: 'work_type',
		}, function (res) {

			if (res.code == 200) {
				var html_zy = '';
				var data = res.data;
				for (var i in data) {
					html_zy += '<div class="maskcon-item" data-value = "' + data[i].value + '"> ' + data[i].label + '</div>';
				}

				$('.maskcon5').html(html_zy)
			}

		})
	});

	// 选择作业方式
	$('.maskcon5').on('click', '.maskcon-item', function (e) {
		// $(this).addClass('after').siblings().removeClass('after');
		var workType = $(this).html();
		var workTypeText = $(this).html();
		var value = $(this).attr('data-value');
		$('.forklift').html(workTypeText);
		$('.forklift').attr('data-value', value)
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
			getData('GET', api.yq.findWarehouseArea, {
				accountId: accountId,
                applyMainId: applyNo,
                warehouseId: selfWarehouseId,
                productId: $('.productName').attr('data-productId'),
                productLevelId: $('.productLevel').attr('data-productLevelId'),
			}, function (res) {
				if (res.code == 200) {
					var list = res.data;
					var html_3 = '';
					for (var i = 0; i < list.length; i++) {
						if (allWarehouseArea.length > 0) {
							for (var j = 0; j < allWarehouseArea.length; j++) {
								if (list[i].id == allWarehouseArea[j]) {
									html_3 += '<div class="maskcon-item disabled" data-produceBatchId="' + list[i].produceBatchId + '" data-productLevelId="' + list[i].productLevelId + '" data-inventoryItemId="' + list[i].inventoryItemId + '" data-id="' + list[i].id + '">' + list[i].name + ',' + list[i].produceBatchNo + ',' + list[i].realInventory + '</div>';
									break;
								} else {
									if (j == allWarehouseArea.length - 1) {
										html_3 += '<div class="maskcon-item" data-produceBatchId="' + list[i].produceBatchId + '" data-productLevelId="' + list[i].productLevelId + '" data-inventoryItemId="' + list[i].inventoryItemId + '" data-id="' + list[i].id + '">' + list[i].name + ',' + list[i].produceBatchNo + ',' + list[i].realInventory + '</div>';
									}

								}
							}
						} else {
							html_3 += '<div class="maskcon-item" data-produceBatchId="' + list[i].produceBatchId + '" data-productLevelId="' + list[i].productLevelId + '" data-inventoryItemId="' + list[i].inventoryItemId + '" data-id="' + list[i].id + '">' + list[i].name + ',' + list[i].produceBatchNo + ',' + list[i].realInventory + '</div>';
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
			var produceBatchId = $(this).attr('data-produceBatchId');
			var productLevelId = $(this).attr('data-productLevelId');
			var inventoryItemId = $(this).attr('data-inventoryItemId');
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

					$('.gd-list-item').eq(i).find('.reservoirAreaText').html(warehouseAreaText).attr('data-warehouseAreaId',
						warehouseAreaId).attr('data-produceBatchId',produceBatchId).attr('data-productLevelId',productLevelId).attr('data-inventoryItemId',inventoryItemId);
					$('.gd-list-item').eq(i).attr('data-warehouseAreaId', warehouseAreaId);
					//allWarehouseArea.push(warehouseAreaId);
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

	// 添加申请记录
	$('.container').on('click', '.gd-add-img', function () {
		var html = '';
		applicationId++;
		html += '<div class="gd-list gd-list-item" data-applicationId="' + applicationId + '">';
		html += '<img class="gd-minus" src="../img/1_31.png">';

		html += '<div class="gd-item">';
		html += '<div class="gd-key">出库重量(吨)</div>';
		html +=
			'<input type="text" class="gd-val projectWeight" data-validateInfor="{strategy:isEmpty,msg:入库重量不能为空}|{strategy:isNumber,msg:入库重量需为数字}">';
		html += '</div>';

		html += '<div class="gd-item showPark">';
		html += '<div class="gd-key">所属园区</div>';
		html += '<div class="gd-val parkText" data-parkId="'+ productList[0].warehouseList[0].parkId + '" data-validateInfor="{strategy:isEmpty,msg:所属园区不能为空}"> '+ productList[0].warehouseList[0].park + '</div>';
		html += '<img class="gd-img" src="../img/1_34.png">';
		html += '</div>';

		html += '<div class="gd-item showStoreroom">';
		html += '<div class="gd-key">所属库房</div>';
		html += '<div class="gd-val storeroomText" data-warehouseId="'+ productList[0].warehouseList[0].warehouseId + '" data-validateInfor="{strategy:isEmpty,msg:所属库房不能为空}">'+ productList[0].warehouseList[0].warehouse + '</div>';
		html += '<img class="gd-img " src="../img/1_34.png" >';
		html += '</div>';

		html += '<div class="gd-item showReservoirArea">';
		html += '<div class="gd-key">出库库区</div>';
		html += '<div class="gd-val reservoirAreaText" data-validateInfor="{strategy:isEmpty,msg:入库库区不能为空}"></div>';
		html += '<img class="gd-img" src="../img/1_34.png" >';
		html += '</div>';
		html += '</div>';

		$(this).parents('.yd-item').find('.gd-infor').append(html);
	});

	// 点击删除申请记录
	$('.container').on('click', '.gd-minus', function () {
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


	// 点击保存
	$('#saveBtn').on('click', function () {

		var flag = Global.initValidate('.container');
		if (!flag) {
			return;
		}

		// var applyNo = $('#applyNo').html();

		var outWaybillNo = $('#outWaybillNo').html();
		var remarks = $('#remarks').val();
		var serviceTeamId = $('#serviceTeamText').attr('data-serviceTeamId');
		var workType = $('#workType').attr('data-value');
		var billingType = $(('#fl')).attr('data-value');
		var driverId = $('#driverName').attr('data-id');
		var transportFee = $('#transportFee').val();
		var outType = $('#outType').attr('data-outtypevalue');
		var shippingAddress = $('#shippingAddress').val();

		$('.gd-list-item').each(function (i, item) {
			var obj = {};
			obj.applyItemId = $('.gd-list-item').eq(i).attr('data-applyItemId') ? $('.gd-list-item').eq(i).attr('data-applyItemId') : '';
			obj.specificationValue = $(item).parents('.yd-item').find('.productName').attr('data-specificationValue');
			obj.productId = $(item).parents('.yd-item').find('.productName').attr('data-productId');
			obj.parkId = $(item).find('.parkText').attr('data-parkId');
			obj.warehouseAreaId = $(item).find('.reservoirAreaText').attr('data-warehouseareaId');
			obj.inventoryItemId = $(item).find('.reservoirAreaText').attr('data-inventoryItemId') ? obj.inventoryItemId = $(item).find('.reservoirAreaText').attr('data-inventoryItemId') : '';
			obj.produceBatchId = $(item).find('.reservoirAreaText').attr('data-produceBatchId') ? $(item).find('.reservoirAreaText').attr('data-produceBatchId') : '';
			obj.productLevelId = $(item).find('.reservoirAreaText').attr('data-productLevelId') ? $(item).find('.reservoirAreaText').attr('data-productLevelId') : '';
			obj.warehouseId = $(item).find('.storeroomText').attr('data-warehouseId');
			obj.projectWeight = $(item).find('.projectWeight').val();
			outWaybillItemList.push(obj);
		});

		var data2 = {
			billingType:billingType,
			accountId: accountId,
			id: applyNo,
			outWaybillNo: outWaybillNo,
			remarks: remarks,
			serviceTeamId: serviceTeamId,
			workType: workType,
			shippingAddress: shippingAddress,
			outType: outType,
			outWaybillItemList: outWaybillItemList,
            driverId: driverId,
            transportFee: transportFee,
		};

		console.log(data2);
		$('#loadingWrapper').show();
		// 提交数据

		$.ajax({
			type: 'POST',
			contentType: 'application/json;charset=UTF-8',
			url: api.ckyd.addOutWaybillMain,
			data: JSON.stringify(data2),
			header: {
				Authorization: '1111',
			},
			success: function (res) {

				if (res.code == 200) {
					$('#loadingWrapper').hide();
					common.alert({
						mask: true,
						content: '提交成功',
						ok: function () {
							// window.location.href = './ckydDetail.html?outWaybillNo=' + outWaybillMainNo;
							window.location.href = './ckydList.html?accountId=' + accountId;
						}
					})
				} else {
                    outWaybillItemList = [];
					$('#loadingWrapper').hide();
					common.alert({
						mask: true,
						content: res.msg,
					})
				}

			},
			error: function (res) {
                outWaybillItemList = [];
				$('#loadingWrapper').hide();
				common.alert({
					mask: true,
					content: res.msg,
				})
			}
		});
	})


    var maskconWra = new BScroll('.maskcon7', {
        scrollbar: {
            fade: true
        },
        click: true,
        pullUpLoad: {
            threshold: 0
        },
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV)$/}
    });

    var customerTotalPage = 1;
    var customerPage = 1;
    // 获取运输司机列表
    $('.driverName').on('click', function () {
        customerPage = 1;
        $('.maskcon7 .maskcon-wra').html('');
        getData('GET', api.yq.findDriverList, {
            accountId: accountId,
            pageNo: customerPage,
            pageSize: 20,
        }, function (res) {
            if (res.code == 200) {
                var driverList = res.data.driverList;
                customerTotalPage = res.data.totalPage;
                if (driverList.length > 0) {
                    var html_4 = '';
                    for (var i = 0; i < driverList.length; i++) {
                        html_4 += '<div class="content-item" data-id="' + driverList[i].id + '">';
                        html_4 += '<div class="content-item-header">姓名：<span>' + driverList[i].name + '</span></div>';
                        html_4 += '<div class="content-item-con">';
                        html_4 += '<div class="con-item">';
                        html_4 += '<div class="con-item-left">';
                        html_4 += '<span>身份证号码：</span>';
                        html_4 += '<div class="con-item-val con-item-val1">' + driverList[i].idcard + '</div>';
                        html_4 += '</div>';
                        html_4 += '</div>';
                        html_4 += '<div class="con-item">';
                        html_4 += '<div class="con-item-left">';
                        html_4 += '<span>联系电话：</span>';
                        html_4 += '<div class="con-item-val con-item-val2">' + driverList[i].contactPhone + '</div>';
                        html_4 += '</div>';
                        html_4 += '<div class="con-item-right">';
                        html_4 += '<span>车牌号：</span>';
                        html_4 += '<div class="con-item-val con-item-val3">' + driverList[i].plateNo + '</div>';
                        html_4 += '</div>';
                        html_4 += '</div>';
                        html_4 += '</div>';
                        html_4 += '</div>';
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

    maskconWra.on('pullingUp', function () {
        if (customerTotalPage == customerPage) {
            $('.loadText').text('没有更多数据了');
            return false;
        }

        customerPage++;
        getData('GET', api.yq.findDriverList, {
            accountId: accountId,
            pageNo: customerPage,
            pageSize: 20,
        }, function (res) {
            if (res.code == 200) {
                var driverList = res.data.driverList;
                customerTotalPage = res.data.totalPage;
                if (driverList.length > 0) {
                    var html_4 = '';
                    for (var i = 0; i < driverList.length; i++) {
                        html_4 += '<div class="content-item" data-id="' + driverList[i].id + '">';
                        html_4 += '<div class="content-item-header">姓名：<span>' + driverList[i].name + '</span></div>';
                        html_4 += '<div class="content-item-con">';
                        html_4 += '<div class="con-item">';
                        html_4 += '<div class="con-item-left">';
                        html_4 += '<span>身份证号码：</span>';
                        html_4 += '<div class="con-item-val con-item-val1">' + driverList[i].idcard + '</div>';
                        html_4 += '</div>';
                        html_4 += '</div>';
                        html_4 += '<div class="con-item">';
                        html_4 += '<div class="con-item-left">';
                        html_4 += '<span>联系电话：</span>';
                        html_4 += '<div class="con-item-val con-item-val2">' + driverList[i].contactPhone + '</div>';
                        html_4 += '</div>';
                        html_4 += '<div class="con-item-right">';
                        html_4 += '<span>车牌号：</span>';
                        html_4 += '<div class="con-item-val con-item-val3">' + driverList[i].plateNo + '</div>';
                        html_4 += '</div>';
                        html_4 += '</div>';
                        html_4 += '</div>';
                        html_4 += '</div>';
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

    // 点击选择运输司机
	$('.maskcon7').on('click','.content-item',function (e) {
		e.stopPropagation();
		$('#driverName').html($(this).find('.content-item-header').find('span').html()).attr('data-id',$(this).attr('data-id'));
		$('#plateNo').html($(this).find('.con-item-val3').html());
		$('#driverPhone').html($(this).find('.con-item-val2').html());
		$('#idcard').html($(this).find('.con-item-val1').html());
		$('.maskcon7').hide();
		$('.mask').fadeOut();
    });

    var scrollWra = new BScroll('#scrollWra', {
        scrollbar: {
            fade: true
        },
        click: true,
        pullUpLoad: {
            threshold: 0
        },
    });


    // 跳转到选择队伍页面
    $('#goTeam').on('click', function () {
    	$('.maskcon8').show();
    	$('.mask').fadeIn(function () {
            scrollWra.finishPullUp();
            scrollWra.refresh();
        })
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


    function renderData(data) {
        $('.loadText').text('正在加载中...');
        Global.requestTempByAjax('../temp/ckyd/zxdw.html', {
            list: data,
            id: applyNo,
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
        $('#dwlist').html('');
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
	$('.maskcon8').on('click','.content-item',function (e) {
        e.stopPropagation();
		var zxdwId = $(this).attr('data-zxdwId');
		var serviceTeamText = $(this).find('.content-item-header').html();
        $('#serviceTeamText').attr('data-serviceTeamId', zxdwId);
        $('#serviceTeamText').html(serviceTeamText);
        $('.maskcon').hide();
        $('.mask').fadeOut();
    });

    // 点击关闭弹窗
    $('.mask').on('click', function () {
        $('.maskcon').hide();
        $(this).fadeOut();
    });
});
