$(function () {
    var id = Global.getUrlParam('id');
    var stackCode = Global.getUrlParam('stackCode');


    getData('GET',api.jc.rfidQuery,{
        accountId: accountId,
        stackCode: stackCode,
    },function (res) {
        if (res.code == 200) {
            var html = '';
            var data = res.data;
            $('#stackCode').html(data.stackCode);
            $('#productName').html(data.productName);
            $('#batchNo').html(data.batchNo);
            $('#produceTime').html(data.produceTime);
            $('#specification').html(data.specification);
            $('#unit').html(data.unit);
            $('#level').html(data.level);
            $('#zhaji').html(data.zhaji);
            $('#type').html(data.type);
            $('#brand').html(data.brand);
            $('#weight').html(data.weight);
            $('#quality').html(data.quality);

            for (var i = 0; i < data.code.length; i++) {
                html += '<div class="item">' + data.code[i] + '</div>';
            }
            $('.list').html(html);
        }
    });
})