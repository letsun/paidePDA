$(function () {
    var id = Global.getUrlParam('id');
    var parkId = Global.getUrlParam('parkId');


    getData('GET',api.jc.parkStatisticsView,{
        accountId: accountId,
        parkId: parkId,
    },function (res) {
        if (res.code == 200) {
            var list = res.data;
            Global.requestTempByAjax('../temp/jc/kfksh.html',{list:list},function (template) {
                $('.content').append(template);
            });
        }
    });
});