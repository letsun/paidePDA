$(function () {
    var id = Global.getUrlParam('id');

    // 显示隐藏运单列表
    $('.gd-dec').on('click', function () {
        $(this).removeClass('active').siblings().addClass('active');
        $('#list').toggle();
    });


    // 点击查看大图
    $('#preview-btn').on('click', function () {
        $('#preview-win').fadeIn();
    });

    // 点击关闭大图
    $('#preview-win').on('click', function () {
        debugger
        $('#preview-win').fadeOut();
    });

    // 获取产品信息
    getData('GET', api.rkybS.findApplyMainDetail, {
        
        accountId: accountId,
        id: id,
    }, function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#forecastNo').html(res.data.forecastNo);
            $('#customerName').html(res.data.customerName);
            $('#driverName').html(res.data.driverName);
            $('#plateNumber').html(res.data.plateNumber);
            $('#contactPhone').html(res.data.contactPhone);
            $('#remarks').html(res.data.remarks);
            $('#warehouseOrderNo').html(res.data.warehouseOrderNo);
            $('#head-state').html(res.data.status);
            if (res.data.list.length > 0) {
                Global.requestTempByAjax('../temp/rkyb/rkybS/sqdmxS.html', { list: res.data.list }, function (template) {
                    $('#list').append(template);
                });
            }
            if (res.data.actList.length > 0) {
                Global.requestTempByAjax('../temp/rkyd/auditRecord.html', { actList: res.data.actList }, function (template) {
                    $('#review-list').append(template);
                });
            }
        }

    });



})