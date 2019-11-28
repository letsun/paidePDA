var parkId = Global.getUrlParam('parkId');
var status = '1';

var index = '0'

var page = 1; // 第一页;

var hasNext = false;

var queryKey = '';


var date = '';


$(function () {

    getQueueEvolutionList();

    Global.requestTempByAjax('../temp/loading/loading.html', {
    }, function (template) {
        $('.container').append(template);
    });


    // 等待放行
    $('.container').on('click', '.release-btn1', function (e) {
        e.stopPropagation();
        var queueCodeRecordId = $(this).attr('data-queueCodeRecordId');

        common.alert({
            mask: true,
            title: '放行提示',
            content: '即将向司机发送进场通知,确认此操作？',
            dialog: true,
            ok: function () {
                getData('GET', api.yq.letPass, {
                    actionType: '0',
                    queueCodeRecordId: queueCodeRecordId,
                }, function (res) {
                    if (res.code == 200) {

                        getData('GET', api.yq.getQueueEvolutionList, {
                            parkId: parkId,
                            queueType: '1',
                            status: '1',
                        }, function (res) {
                            if (res.code == 200) {
                                Global.requestTempByAjax('../temp/rkpd/list.html', { list: res.result, status: status, index: index }, function (template) {
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
            }

        })

    })

    // 完成作业
    $('.container').on('click', '.release-btn2', function (e) {

        e.stopPropagation();
        var queueCodeRecordId = $(this).attr('data-queueCodeRecordId');

        common.alert({
            mask: true,
            title: '提示',
            content: '是否完成作业,确认此操作？',
            dialog: true,
            ok: function () {
                getData('GET', api.yq.letPass, {
                    actionType: '2',
                    queueCodeRecordId: queueCodeRecordId,
                }, function (res) {
                    if (res.code == 200) {

                        getData('GET', api.yq.getQueueEvolutionList, {
                            parkId: parkId,
                            queueType: '1',
                            status: '2',
                        }, function (res) {
                            if (res.code == 200) {
                                Global.requestTempByAjax('../temp/rkpd/list.html', { list: res.result, status: status, index: index }, function (template) {
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
            }

        })

    })    


    $('.container').on('click', '.nav-item', function () {
        var that = this;

        index = $(that).index();
        $('.content-nav').hide();
        $('.loadText').hide()

        $('.content-item').remove()
        if (index == 0) {
            status = '1';
            index = '0';
            page = 1;
            $('.scroll-wra').css({
                'top': '0px'
            })
            getQueueEvolutionList();
        } else if (index == 1) {

            status = '2';
            index = '1';

            page = 1;
            $('.scroll-wra').css({
                'top': '0px'
            })
            getQueueEvolutionList();
        } else {
            index = '2';
            page = 1;

            $('.scroll-wra').css({
                'top': '100px'
            })
            $('.content-nav').show()

            $('.loadText').show()
            getHistoryQueueRecord();

        }
        $('.nav-item').removeClass('active')
        $(that).addClass('active')

    })


    function getQueueEvolutionList() {
        // 获取数据
        $('#loadingWrapper').show()
        getData('GET', api.yq.getQueueEvolutionList, {
            parkId: parkId,
            queueType: '1',
            status: status,
        }, function (res) {
            if (res.code == 200) {
                Global.requestTempByAjax('../temp/rkpd/list.html', { list: res.result, status: status, index: index }, function (template) {

                    if (index != 2) {
                        $('#list1').html(template);
                    }
                });         
            }
            $('#loadingWrapper').hide()
        });
    }



    $('#queryKey').on('input', function () {

        $('.content-item').remove()
        queryKey = $('#queryKey').val()


        //历史纪录
        getHistoryQueueRecord()

    })




    scrollWra.on('pullingUp', function () {

        scrollWra.finishPullUp();
        // scrollWra.refresh();
        console.log('111')
        if (!hasNext) {
            $('.loadText').text('没有更多数据了');
            return false;
        }

        page++;

        if (index == 2) {
            // getHistoryQueueRecord()
            // debugger
            getData('GET', api.yq.getHistoryQueueRecord, {
                parkId: parkId,
                pageNum: page,
                pageSize: 10,
                queryKey: queryKey,
                queueDate: date,
                codeType: '1',
            }, function (res) {
                if (res.code == 200) {
                    if (index == 2) {
                        var data = res.result;
                        renderData(data)
                        hasNext = res.result.hasNext;

                        if (!res.result.hasNext) {
                            $('.loadText').text('暂无数据');

                        }
                    }

                    $('#loadingWrapper').hide()
                }
            });
        }


    });

    function renderData(data) {
        $('.loadText').text('正在加载中...');
        Global.requestTempByAjax('../temp/rkpd/list.html', {
            list: data, index: index, status: status
        }, function (template) {
            $('#list1').append(template);
            // scrollWra.finishPullUp();
            scrollWra.refresh();
            $('.loadText').text('上滑加载更多...');
        });
    }



    // 查看排队详情
    $('.container').on('click','.content-item',function(){
        var queueCodeRecordId = $(this).attr('data-queueCodeRecordId')
        window.location.href = './rkpdDetail.html?queueCodeRecordId=' + queueCodeRecordId ;
    })

});




function getHistoryQueueRecord() {
    $('.content-item').remove()
    getData('GET', api.yq.getHistoryQueueRecord, {
        parkId: parkId,
        pageNum: page,
        pageSize: '10',
        queryKey: queryKey,
        queueDate: date,
        codeType: '1',
    }, function (res) {
        if (res.code == 200) {

            if (index == 2) {
                var data = res.result;

                curQueueDate  = res.result.curQueueDate
                hasNext = res.result.hasNext;

                $('.loadText').text('正在加载中...');
                Global.requestTempByAjax('../temp/rkpd/list.html', {
                    list: data, index: index, status: status
                }, function (template) {
                    $('.curQueueDate').html(curQueueDate)

                    $('#list1').append(template);
                    scrollWra.refresh();
                    $('.loadText').text('上滑加载更多...');
                });
                if (!res.result.hasNext) {
                    $('.loadText').text('暂无数据');

                }
            }

            $('#loadingWrapper').hide()
        } else {
            $('#loadingWrapper').hide()
        }
    });
}



// 初始化时间
var now = new Date();
var nowYear = now.getFullYear();
var nowMonth = now.getMonth() + 1;
var nowDate = now.getDate();
var nowHour = now.getHours();
var nowMintue = now.getMinutes();
var nowSecond = now.getSeconds();

/**
 * 设置日期控件
 * @param string element 日期控件元素*/
function setDateControl(element) {
    var showDateDom = $(element);
    console.log(element)

    showDateDom.attr('data-year', nowYear);
    showDateDom.attr('data-month', nowMonth);
    showDateDom.attr('data-date', nowDate);


    $('.container').on('click', element, function () {
        var self = $(this);
        var oneLevelId = showDateDom.attr('data-year');
        var twoLevelId = showDateDom.attr('data-month');
        var threeLevelId = showDateDom.attr('data-date');
        var iosSelect = new IosSelect(3, [yearData, monthData, dateData], {
            title: '',
            itemHeight: 77,
            headerHeight: 77,
            itemShowCount: 5,
            oneLevelId: oneLevelId,
            twoLevelId: twoLevelId,
            threeLevelId: threeLevelId,
            showAnimate: true,
            showLoading: true,


            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                date = selectOneObj.id + '-' + FormatDate(selectTwoObj.id) + '-' + FormatDate(selectThreeObj.id);

                // console.log(date)
                getHistoryQueueRecord()
            }
        });
    });


}

function FormatDate(number) {
    var number = parseInt(number);

    return number < 10 ? '0' + number : number;
}

// 数据初始化
function formatYear(nowYear) {
    var arr = [];
    for (var i = nowYear - 35; i <= nowYear + 35; i++) {
        arr.push({
            id: i + '',
            value: i + '年'
        });
    }
    return arr;
}

function formatMonth() {
    var arr = [];
    for (var i = 1; i <= 12; i++) {
        arr.push({
            id: i + '',
            value: i < 10 ? '0' + i + '月' : i + '月'
        });
    }
    return arr;
}

function formatDate(count) {
    var arr = [];
    for (var i = 1; i <= count; i++) {
        arr.push({
            id: i + '',
            value: i < 10 ? '0' + i + '日' : i + '日'
        });
    }
    return arr;
}

function formatHour() {
    var arr = [];
    for (var i = 0; i <= 23; i++) {
        arr.push({
            id: i + '',
            value: i < 10 ? '0' + i + '时' : i + '时'
        });
    }
    return arr;
}

function formatMintue() {
    var arr = [];
    for (var i = 0; i <= 59; i++) {
        arr.push({
            id: i + '',
            value: i < 10 ? '0' + i + '分' : i + '分'
        });
    }
    return arr;
}

function formatSecond() {
    var arr = [];
    for (var i = 0; i <= 59; i++) {
        arr.push({
            id: i + '',
            value: i < 10 ? '0' + i + '秒' : i + '秒'
        });
    }
    return arr;
}

function formatQuarter() {
    var arr = [
        {
            id: 1,
            value: '第一'
        }, {
            id: 2,
            value: '第二'
        }, {
            id: 3,
            value: '第三'
        }, {
            id: 4,
            value: '第四'
        },
    ];

    return arr;
}

var yearData = function (callback) {
    callback(formatYear(nowYear))
};
var monthData = function (year, callback) {
    callback(formatMonth());
};
var dateData = function (year, month, callback) {
    if (/^(1|3|5|7|8|10|12)$/.test(month)) {
        callback(formatDate(31));
    } else if (/^(4|6|9|11)$/.test(month)) {
        callback(formatDate(30));
    } else if (/^2$/.test(month)) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            callback(formatDate(29));
        } else {
            callback(formatDate(28));
        }
    } else {
        throw new Error('month is illegal');
    }
};

var hourData = function (year, month, date, callback) {
    callback(formatHour());
};

var mintueData = function (year, month, date, hour, callback) {
    callback(formatMintue());
};

var secondData = function (year, month, date, hour, mintue, callback) {
    callback(formatSecond());
};





