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
        $('#preview-win').fadeOut();
    });

    // 获取产品信息
    getData('GET', api.rkydT.findDetail, {
        accountId: accountId,
        id: id,
    }, function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#applyNo').html(res.data.applyNo);
            $('#storageNo').html(res.data.storageNo);
            $('#rentStartTime').html(res.data.rentStartTime);
            $('#serviceTeamName').html(res.data.serviceTeamName);
            $('#workType').html(res.data.workType);
            $('#storageType').html(res.data.storageType);
            $('#remarks').html(res.data.remarks);
            $('#warehouseOrderNo').html(res.data.warehouseOrderNo);
            $('#head-state').html(res.data.status);
            $('#billingType').html(res.data.billingType);

            if (res.data.list.length > 0) {
                Global.requestTempByAjax('../temp/rkyd/sqdmxT.html', { list: res.data.list }, function (template) {
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