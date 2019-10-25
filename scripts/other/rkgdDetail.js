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

    getData('GET',api.rkgd.findDetail,{
        accountId: accountId,
        id: id,
    },function (res) {
        if (res.code == 200) {
            var data = res.data;
            $('#storageWorkNo').html(res.data.storageWorkNo);
            $('#createBy').html(res.data.createBy);
            $('#finishTime').html(res.data.finishTime);
            $('#serviceCompanyName').html(res.data.serviceCompanyName);
            $('#serviceCompanyContacter').html(res.data.serviceCompanyContacter);
            $('#serviceCompanyPhone').html(res.data.serviceCompanyPhone);
            $('#serviceTeamName').html(res.data.serviceTeamName);
            $('#serviceTeamContacter').html(res.data.serviceTeamContacter);
            $('#serviceTeamPhone').html(res.data.serviceTeamPhone);
            $('#remarks').html(res.data.remarks);
            $('#head-state').html(res.data.status)
            if (res.data.list.length > 0) {
                Global.requestTempByAjax('../temp/rkgd/gdmx.html', {list:res.data.list}, function(template) {
                    $('#list').append(template);
                });
            }

            if (res.data.actList.length > 0) {
                Global.requestTempByAjax('../temp/rkyd/auditRecord.html', {actList:res.data.actList}, function(template) {
                    $('#review-list').append(template);
                });
            }
        }

    });
})