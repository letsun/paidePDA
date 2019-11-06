$(function () {
    var parkId = Global.getUrlParam('parkId');

    // 获取数据
    getData('GET', api.yq.getQueueEvolutionList, {
        parkId: parkId,
        queueType: '2',
        status: '0',
    }, function (res) {
        if (res.code == 200) {
            Global.requestTempByAjax('../temp/ckpd/list.html', {list: res.result}, function(template) {
                $('#list1').html(template);
            });
        }
    });

    // 等待放行
    $('.container').on('click','.release-btn',function () {
        var queueCodeRecordId = $(this).attr('data-queueCodeRecordId');
        getData('GET', api.yq.letPass, {
            actionType: '0',
            queueCodeRecordId: queueCodeRecordId,
        }, function (res) {
            if (res.code == 200) {
                getData('GET', api.yq.getQueueEvolutionList, {
                    parkId: parkId,
                    queueType: '1',
                    status: '0',
                }, function (res) {
                    if (res.code == 200) {
                        Global.requestTempByAjax('../temp/ckpd/list.html', {list: res.result}, function(template) {
                            $('#list1').html(template);
                        });
                    }
                });
            } else {
                common.alert({
                    mask: true,
                    content: res.massage
                })
            }
        });
    })

});