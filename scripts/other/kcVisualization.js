$(function () {
    getData('GET',api.jc.kcksh,{
        accountId: accountId,
    },function (res) {
        if (res.code == 200) {
            var list = res.data;
            Global.requestTempByAjax('../temp/jc/kcksh.html',{list:list},function (template) {
                $('.content').append(template);
                $('.canvas-wra').each(function (i,item) {
                    var rk = $(this).attr('data-rk');
                    var ck = $(this).attr('data-ck');
                    var id = $(this).attr('id');
                    var data = [
                        {
                            value: rk,
                            name: '今日入库量',
                        },
                        {
                            value: ck,
                            name: '今日出库量',
                        },
                    ];

                    getEchartsData(id,data);

                })
            });
        }
    });

    function getEchartsData(id,data) {
        var option = {
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
                top: 'bottom',
                data: ['今日入库量', '今日出库量']
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: data,
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

        var myChart = echarts.init(document.getElementById(id));
        myChart.setOption(option);
    }


    // 点击园区
    $('.container').on('click','.park-item',function () {
        var parkId = $(this).attr('data-id');
        window.location.href = './kfVisualization.html?accountId=' + accountId + '&parkId=' + parkId;
    })
})