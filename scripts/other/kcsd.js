var scrollWra = new BScroll('#scrollWra', {
	scrollbar: {
		fade: true
	},
	click: true,
	pullUpLoad: {
		threshold: 0
	}
});

var totalPage = 1; // 总页数;
var page = 1; // 第一页;
var html = '';
var applyNo ='';

getData('POST', api.kcsd.getStockList, {
	accountId: accountId,
	pageNo: page,
	pageSize: 10,
}, function(res) {
	if (res.code == 200) {
		//console.log(res.result.datas)
		if (res.result.datas.length > 0) {
			totalPage = res.result.totalPage;
			var data = res.result.datas;
			renderData(data);
		} else {
			$('.loadText').text('暂无数据');
		}
	}
});

scrollWra.on('pullingUp', function() {
	if (totalPage == page) {
		$('.loadText').text('没有更多数据了');
		return false;
	}

	page++;
	getData('POST', api.kcsd.getStockList, {
		accountId: accountId,
		pageNo: page,
		pageSize: 10,
	}, function(res) {
		if (res.code == 200) {
			//console.log(res.result.datas)
			if (res.result.datas.length > 0) {
				totalPage = res.result.totalPage;
				var data = res.result.datas;
				renderData(data);
			} else {
				$('.loadText').text('暂无数据');
			}
		}
	});

});

function renderData(data) {
	$('.loadText').text('正在加载中...');
	Global.requestTempByAjax('../temp/kcsd/list.html', {
		list: data
	}, function(template) {
		$('#list').append(template);
		scrollWra.finishPullUp();
		scrollWra.refresh();
		$('.loadText').text('上滑加载更多...');
	});
}


// 点击搜索
$('#scarchBtn').on('click', function() {
	page = 1;
	$('#list').html('');
	applyNo = $('#applyNo').val();
	getData('POST', api.kcsd.getStockList, {
		accountId: accountId,
		pageNo: page,
		pageSize: 10,
	}, function(res) {
		if (res.code == 200) {
			//console.log(res.result.datas)
			if (res.result.datas.length > 0) {
				totalPage = res.result.totalPage;
				var data = res.result.datas;
				renderData(data);
			} else {
				$('.loadText').text('暂无数据');
			}
		}
	});
});


// 点击进入详情
$('.container').on('click', '.content-item', function() {
	var id = $(this).attr('data-id');
	window.location.href = './kcsdDetail.html?id=' + id + '&accountId=' + accountId;
});

//点击进入解锁新增页面
$('.container').on('click', '.btn2', function(e) {
	e.stopPropagation();
	var id = $(this).parents('.content-item').attr('data-id'); //库存锁定id
	window.location.href = './kcjsAdd.html?id=' + id + '&accountId=' + accountId;
});
