$(function () {
    var landmarkCode = Global.getUrlParam('landmarkCode');
    var userId = Global.getUrlParam('userId');
    var warehouseAreaId = Global.getUrlParam('warehouseAreaId');

    getData('GET',api.jc.landmarkQuery,{
        accountId: accountId,
        landmarkCode: landmarkCode,
        userId: userId,
        warehouseAreaId: warehouseAreaId,
    },function (res) {
        if (res.code == 200) {
            var data = res.data;

            Global.requestTempByAjax('../temp/jc/kqcx.html',{data:data},function (template) {
                $('.container').append(template);

                var width = $('.lattice-item').width();
                if (width <= 710) {
                    $('.lattice-item').css({'margin': '0 auto'});
                }

                var echartsData = data.rfidBatchPersentsVos;
                var data1 = [];
                for (var i = 0; i < echartsData.length; i++) {
                    data1.push(echartsData[i].name);
                }
                if (data1.length > 6) {
                    var col = Math.ceil((data1.length - 6) / 3);
                    $('#main').height(700 + col * 50);
                }
                getEchartsData(data1,echartsData);
            });
        }
    });
});

function getEchartsData (data1,data2) {
    var option = {
        title: {
            text: '按生产批次划分',
            left: 'center',
            textStyle: {
                fontSize: 28,
            }
        },
        textStyle: {
            fontSize: 24,
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            top: '580px',
            data: data1,
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['50%', '300px'],
                data: data2,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(option);
}

// 打开扩展信息
$('.container').on('click','#openInfo',function () {
    $('.info-win').fadeIn();
});

// 关闭扩展信息
$('.container').on('click','.info-win',function () {
    $('.info-win').fadeOut();
});