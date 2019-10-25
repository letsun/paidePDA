$(function () {
    var id = Global.getUrlParam('id');

    // 显示隐藏运单列表
    $('.gd-dec').on('click',function () {
        $(this).removeClass('active').siblings().addClass('active');
        $('#list').toggle();
    });


    // 点击查看大图
    $('#preview-btn').on('click',function () {
        $('#preview-win').fadeIn();
    });

    // 点击关闭大图
    $('#preview-win').on('click',function () {
        $('#preview-win').fadeOut();
    });

    // 获取产品信息
    getData('GET',api.rksqS.findApplyMainDetail,{
        accountId: accountId,
        id: id,
    },function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#applyNo').html(res.data.applyNo);
            $('#contractNo').html(res.data.contractNo);
            $('#applyTime').html(res.data.applyTime);
            $('#remarks').html(res.data.remarks);
            $('#head-state').html(res.data.status);

            if (res.data.actList.length > 0) {
                Global.requestTempByAjax('../temp/rkyd/auditRecord.html', {actList:res.data.actList}, function(template) {
                    $('#review-list').append(template);
                });
            }
            if (res.data.list.length > 0) {
                Global.requestTempByAjax('../temp/rksq/sqdmxS.html', {list:res.data.list}, function(template) {
                    $('#list').append(template);
                });
            }
        }

    });

});