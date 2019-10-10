$(function () {
    var id = Global.getUrlParam('id');
    console.log(id)

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


    // 点击显示作业方式列表
    $('#workType').on('click', function () {
        $('.maskcon').show();
        $('.mask').show();
    });

    // // 选择作业方式
    $('.maskcon').on('click', '.maskcon-item', function (e) {
        $(this).addClass('after').siblings().removeClass('after');
        var workType = $(this).html();
        var workTypeText = $(this).html();
        $('.forklift').html(workTypeText);
        
    });

        // 点击关闭弹窗
    $('.mask').on('click',function () {
        $('.maskcon').hide();
        $(this).fadeOut();
    });


    // 获取产品信息
    getData('GET', api.rkydT.findDetail, {
        accountId: accountId,
        id: id,
    }, function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#applyNo').html(res.data.applyNo);
            $('#storageNo').val(res.data.storageNo);
            $('#rentStartTime').html(res.data.rentStartTime);
            $('#serviceTeamName').html(res.data.serviceTeamName);
            $('#workType').html(res.data.workType);
            $('#storageType').html(res.data.storageType);
            $('#remarks').html(res.data.remarks);
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