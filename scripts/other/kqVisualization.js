$(function () {
    var warehouseAreaId = Global.getUrlParam('warehouseAreaId');


    getData('GET',api.jc.kqksh,{
        accountId: accountId,
        warehouseAreaId: warehouseAreaId,
    },function (res) {
        if (res.code == 200) {
            var data = res.data;
            Global.requestTempByAjax('../temp/jc/kqksh.html', {
                data: data
            }, function (template) {
                $('.content').html(template);
                var echartsData = data.diagramDate;
                var data1 = [];
                for (var i = 0; i < echartsData.length; i++) {
                    data1.push(echartsData[i].name);
                }
                getEchartsData(data1,echartsData);
            });
        }
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
                left: 'center',
                top: '560px',
                data: data1,
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '30%'],
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
})