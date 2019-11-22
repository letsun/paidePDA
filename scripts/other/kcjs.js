var scrollWra = new BScroll('#scrollWra', {
	scrollbar: {
		fade: true
	},
	click: true,
	pullUpLoad: {
		threshold: 0
	}
});
var applyNo = '';

var totalPage = ""; // 总页数;
var page = 1; // 第一页;
var html = '';

var accountId = Global.getUrlParam('accountId');

getData('GET', api.kcjs.findPageApi, {
	accountId: accountId,
	pageNo: page,
	pageSize: 10,
}, function(res) {
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

scrollWra.on('pullingUp', function() {
	if (totalPage == page) {
		$('.loadText').text('没有更多数据了');
		return false;
	}

	page++;
	getData('GET', api.kcjs.findPageApi, {
		accountId: accountId,
		pageNo: page,
		pageSize: 10,
	}, function(res) {
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
	Global.requestTempByAjax('../temp/kcjs/list.html', {
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
	getData('GET', api.kcjs.findPageApi, {
		accountId: accountId,
		pageNo: page,
		pageSize: 10,
	}, function(res) {
		if (res.code == 200) {
			if (res.data.list.length > 0) {
				totalPage = res.data.totalPage;
				var data = res.data.list;
				renderData(data);
			} else {
				$('.loadText').text('暂无数据');
			}

			// if (res.data.pageNo == res.data.totalPage) {
			//     $('.loadText').text('没有更多数据了');
			// }
		}
	});
});


//点击进入详情
$('.container').on('click', '.content-item', function() {
	var id = $(this).attr('data-id');
	window.location.href = './kcjsDetail.html?id=' + id + '&accountId=' + accountId;
});

// 点击进入添加运单
// $('.container').on('click', '.btn1', function(e) {
// 	e.stopPropagation();
// 	var id = $(this).parents('.content-item').attr('data-id');
// 	window.location.href = './ckydAdd.html?id=' + id + '&accountId=' + accountId;
// });
