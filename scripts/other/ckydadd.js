$(function() {

	//转圈圈
	Global.requestTempByAjax('../temp/loading/loading.html', {}, function(template) {
		$('.container').append(template);
	});

	var applyNo = Global.getUrlParam('applyNo');
	var serviceTeamId = Global.getUrlParam('zxdwId');
	var serviceTeamText = decodeURI(decodeURIComponent(Global.getUrlParam('zxdwText')));

	var accountId = Global.getUrlParam('accountId');

	if (serviceTeamId && serviceTeamId != 'null') {
		$('#serviceTeamText').attr('data-serviceTeamId', serviceTeamId);
		$('#serviceTeamText').html(serviceTeamText);
	}

	var applicationId = 0;

	var outWaybillItemList = [];

	var allWarehouseArea = []; // 已选库区


	getData('GET', api.cksq.findApplyMainDetail, {
		accountId: accountId,
		applyNo: applyNo,
	}, function(res) {
		if (res.code == 200) {
			var data = res.data;
			$('#applyNo').html(res.data.applyNo);
			$('#rentalEndTime').html(res.data.rentalEndTime);
			$('#contractId').html(res.data.contractId);
			$('#customerName').html(res.data.customerName);
			$('#driverName').html(res.data.driverName);
			$('#plateNo').html(res.data.plateNo);
			$('#driverPhone').html(res.data.driverPhone);
			$('#idcard').html(res.data.idcard);
			$('#transportFee').html(res.data.transportFee);
			$('#transferGroup').html(res.data.transferGroup);
			$('#transferCompany').html(res.data.transferCompany);
			$('#tmsCarrier').html(res.data.tmsCarrier);
			$('#tmsSite').html(res.data.tmsSite);
			$('#tmsShippingMethod').html(res.data.tmsShippingMethod);
			$('#shippingAddress').html(res.data.shippingAddress);
			$('#applyNo').html(res.data.applyNo);
			$('#applyNo').html(res.data.applyNo);
			$('#applyNo').html(res.data.applyNo);
			if (res.data.productList.length > 0) {
				Global.requestTempByAjax('../temp/ckyd/ckydsqdmxT.html', {
					list: res.data.productList
				}, function(template) {
					$('#list').append(template);
					$('.gd-list-item').each(function(i, item) {
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


	// 跳转到选择队伍页面
	$('#goTeam').on('click', function() {
		window.location.href = './cksqListaddForklift.html?func=add&applyNo=' + applyNo + '&accountId=' + accountId;
	});


	// 点击显示作业方式列表
	$('#showWorkType').on('click', function() {
		$('.maskcon').hide();
		$('.maskcon5').show();
		$('.mask').show();
	});

	// 选择作业方式
	$('.maskcon5').on('click', '.maskcon-item', function(e) {
		$(this).addClass('after').siblings().removeClass('after');
		var workType = $(this).html();
		var workTypeText = $(this).html();
		$('.forklift').html(workTypeText);
	});

	// 获取园区列表
	getData('GET', api.yq.findList2, {
		accountId: accountId,
	}, function(res) {
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
	$('.container').on('click', '.showPark', function() {
		$('.maskcon-item').removeClass('after');
		applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
		$('.maskcon1').show();
		$('.mask').show();
	});

	// 选择园区
	$('.maskcon1').on('click', '.maskcon-item', function(e) {
		$('.maskcon2').html('');
		$('.maskcon3').html('');
		$(this).addClass('after').siblings().removeClass('after');
		var parkId = $(this).attr('data-id');
		var parkText = $(this).html();
		$('.gd-list-item').each(function(i, item) {
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
	$('.container').on('click', '.showStoreroom', function() {
		applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
		var selfParkId = $(this).parents('.gd-list-item').find('.parkText').attr('data-parkId');
		if ($(this).parents('.gd-list-item').find('.parkText').html() != '') {
			// 获取库房列表
			getData('GET', api.yq.findList, {
				accountId: accountId,
				baseParkId: selfParkId,
			}, function(res) {
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
	$('.maskcon2').on('click', '.maskcon-item', function(e) {
		$('.maskcon3').html('');
		$(this).addClass('after').siblings().removeClass('after');
		var warehouseId = $(this).attr('data-id');
		var warehouseText = $(this).html();
		$('.gd-list-item').each(function(i, item) {
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
	$('.container').on('click', '.showReservoirArea', function() {
		$('.maskcon3').html('');
		var selfWarehouseId = $(this).parents('.gd-list-item').find('.storeroomText').attr('data-warehouseId');
		applicationId = $(this).parents('.gd-list-item').attr('data-applicationId');
		if ($(this).parents('.gd-list-item').find('.storeroomText').html() != '') {
			// 获取库区列表
			getData('GET', api.yq.findList3, {
				accountId: accountId,
				baseWarehouseId: selfWarehouseId,
			}, function(res) {
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
	$('.maskcon3').on('click', '.maskcon-item', function(e) {
		if (!$(this).hasClass('disabled')) {
			var self = $(this);
			$(this).addClass('after').siblings().removeClass('after');
			var warehouseAreaId = $(this).attr('data-id');
			var warehouseAreaText = $(this).html();

			$('.gd-list-item').each(function(i, item) {
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
						warehouseAreaId);
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


	// 点击关闭弹窗
	$('.mask').on('click', function() {
		$('.maskcon').hide();
		$(this).fadeOut();
	});

	// 添加申请记录
	$('.container').on('click', '.gd-add-img', function() {
		var html = '';
		applicationId++;
		html += '<div class="gd-list gd-list-item" data-applicationId="' + applicationId + '">';
		html += '<img class="gd-minus" src="../img/1_31.png">';

		html += '<div class="gd-item">';
		html += '<div class="gd-key">入库重量(吨)</div>';
		html +=
			'<input type="text" class="gd-val projectWeight" data-validateInfor="{strategy:isEmpty,msg:入库重量不能为空}|{strategy:isNumber,msg:入库重量需为数字}">';
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
		html += '</div>';

		$(this).parents('.yd-item').find('.gd-infor').append(html);
	});

	// 点击删除申请记录
	$('.container').on('click', '.gd-minus', function() {
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
	$('#saveBtn').on('click', function() {

		var flag = Global.initValidate('.container');
		if (!flag) {
			return;
		}

		var applyNo = $('#applyNo').html();
		var outWaybillNo = $('#outWaybillNo').val();
		var remarks = $('#remarks').val();
		var images = '111';
		var serviceTeamId = $('#serviceTeamText').attr('data-serviceTeamId');
		var workTypeValue = $('#workType').html();
		
		var workType = '';
		if(workTypeValue == "叉车作业"){
			workType = 1;
			//console.log(workType)
		}else if(workTypeValue == "吊带作业"){
			workType = 2;
			//console.log(workType)
		}else if(workTypeValue == "人工作业"){
			workType = 3;
			//console.log(workType)
		}else{
			workType = 4;
			//console.log(workType)
		}

		$('.gd-list-item').each(function(i, item) {
			var obj = {};
			obj.applyItemId = $(item).attr('data-applyItemId');
			obj.specificationValue = $(item).parents('.yd-item').find('.productName').attr('data-specificationValue');
			obj.parkId = $(item).find('.parkText').attr('data-parkId');
			obj.warehouseAreaId = $(item).find('.reservoirAreaText').attr('data-warehouseareaId');
			obj.warehouseId = $(item).find('.storeroomText').attr('data-warehouseId');
			obj.projectWeight = $(item).find('.projectWeight').val();
			outWaybillItemList.push(obj);
		});

		var data2 = {
			accountId: accountId,
			applyNo: applyNo,
			outWaybillNo: outWaybillNo,
			remarks: remarks,
			serviceTeamId: serviceTeamId,
			images: images,
			workType: workType,
			outWaybillItemList: outWaybillItemList,
		};

		//console.log(data2);

		// 提交数据
		/*getData('POST',api.ckyd.addOutWaybillMain,JSON.stringify(data2),function (res) {
		    if (res.code == 200) {
		        outWaybillItemList = [];
		        common.alert({
		            mask: true,
		            content: '提交成功',
		            ok:function () {
		                location.reload();
		            }
		        })
		    } else {
		        common.alert({
		            mask: true,
		            content: res.msg,
		        })
		    }
		});*/
		
		$('#loadingWrapper').show();
		$.ajax({
			type: 'POST',
			contentType: 'application/json;charset=UTF-8',
			url: api.ckyd.addOutWaybillMain,
			data: JSON.stringify(data2),
			header: {
				Authorization: '1111',
			},
			success: function(res) {
				setTimeout(function() {

					$('#loadingWrapper').hide();
					common.alert({
						mask: true,
						content: '提交成功',
						ok: function() {
						
							//window.location.href = './ckydDetail.html?outWaybillNo=' + outWaybillMainNo;
							window.location.href = './cksqList.html?accountId='+accountId;
						}
					})

				}, 1500)

			},
			error: function(res) {
				$('#loadingWrapper').hide();
				common.alert({
					mask: true,
					content: res.msg,
				})
			}
		});
	})
});
