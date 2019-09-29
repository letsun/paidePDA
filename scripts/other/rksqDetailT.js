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
    getData('GET',api.rksqT.findApplyMainDetail,{
        accountId: accountId,
        id: id,
    },function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#applyNo').html(res.data.applyNo);
            $('#teamName').html(res.data.teamName);
            $('#applyTime').html(res.data.applyTime);
            $('#remarks').html(res.data.remarks);
            if (res.data.list.length > 0) {
                Global.requestTempByAjax('../temp/rksq/sqdmxT.html', {list:res.data.list}, function(template) {
                    $('#list').append(template);
                });
            }
        }

    });

});