
var dev = 'http://192.168.1.11:8899';       //闫世峰*/
var test = "https://wms.ebiaoji.com";           //线上
//var dev = "http://yecl.lxcyhd.com";           //春玲姐
//var dev  = "http://192.168.1.41:8899";
// var dev = 'http://192.168.1.77:8899';          //吴剑*/

var ip = dev;

var api = {
    rkgd: {
        findPageApi: ip + '/api/pda/storageWorkOrderMain/findPageApi',     // 入库工单列表
        findDetail: ip + '/api/pda/storageWorkOrderMain/findDetail',     // 入库工单详情
    },
    rksqT: {
        findPageApi: ip + '/api/pda/storageFactoryApplyMain/findPageApi',     // 入库申请单列表
        findApplyMainDetail: ip + '/api/pda/storageFactoryApplyMain/findApplyMainDetail',     // 入库申请单详情
        saveStorageFactoryApplyMain: ip + '/api/pda/storageFactoryApplyMain/saveStorageFactoryApplyMain',     // 入库申请单保存
        saveStorageFactoryWaybillMain: ip + '/api/pda/storageFactoryApplyMain/saveStorageFactoryWaybillMain',     // 入库运单保存
        editStorageFactoryApplyMain: ip + '/api/pda/storageFactoryApplyMain/editStorageFactoryApplyMain',     // 入库申请单编辑
        addApplyByForecasts: ip + '/api/pda/storageFactoryApplyMain/addApplyByForecasts',     // 新增入库申请多个预报
        editApplyByForecasts: ip + '/api/pda/storageFactoryApplyMain/editApplyByForecasts',     // 编辑入库申请多个预报
    },
    rksqS: {
        findPageApi: ip + '/api/pda/storageWarehouseApplyMain/findPageApi',     // 入库申请单列表
        findApplyMainDetail: ip + '/api/pda/storageWarehouseApplyMain/findApplyMainDetail',     // 入库申请单详情
        saveApplyMain: ip + '/api/pda/storageWarehouseApplyMain/saveApplyMain',     // 入库申请单保存
        saveWaybillMain: ip + '/api/pda/storageWarehouseApplyMain/saveWaybillMain',     // 入库运单保存
        editApplyMain: ip + '/api/pda/storageWarehouseApplyMain/editApplyMain',     // 入库申请单编辑
    },
    rkydS: {
        findPageApi: ip + '/api/pda/storageWarehouseWaybillMain/findPageApi',     // 入库运单列表
        findDetail: ip + '/api/pda/storageWarehouseWaybillMain/findDetail',     // 入库运单申请详情
        saveStorage: ip + '/api/pda/storageWarehouseWaybillMain/saveStorage',     // 入库运单生成工单
        complete: ip + '/api/pda/storageWarehouseWaybillMain/complete',     // 入库确认完成
        saveWaybillMain: ip + '/api/pda/storageWarehouseWaybillMain/saveWaybillMain',     // 入库运单修改保存
    },
    rkydT: {
        findPageApi: ip + '/api/pda/storageFactoryWaybillMain/findPageApi',     // 入库运单列表
        saveStorage: ip + '/api/pda/storageFactoryWaybillMain/saveStorage',    //入库运单生成工单
        complete: ip + '/api/pda/storageFactoryWaybillMain/complete',    //入库运单确认完成
        findDetail: ip + '/api/pda/storageFactoryWaybillMain/findDetail',     // 入库运单申请详情
        saveStorageFactoryWaybillMain: ip + '/api/pda/storageFactoryWaybillMain/saveStorageFactoryWaybillMain',     // 入库运单修改保存
    },
    rkybS: {
        findPageApi: ip + '/api/pda/storageWarehouseForecastMain/findPageApi',     // 入库预报列表
        findApplyMainDetail: ip + '/api/pda/storageWarehouseForecastMain/findApplyMainDetail',     // 入库申请详情
        saveWarehouseApplyMain: ip + '/api/pda/storageWarehouseForecastMain/saveWarehouseApplyMain',     // 新增入库单保存
        findDetailById: ip + '/api/pda/storageWarehouseForecastMain/findDetailById',     // 新增入库申请预报明细接口
        forecastFinish: ip + '/api/pda/storageWarehouseForecastMain/forecastFinish',   //入库预报保存确认完成
    },
    rkybT: {
        findPageApi: ip + '/api/pda/storageFactoryForecastMain/findPageApi',     // 入库预报列表
        findApplyMainDetail: ip + '/api/pda/storageFactoryForecastMain/findApplyMainDetail',     // 入库申请详情
        saveStorageFactoryApplyMain: ip + '/api/pda/storageFactoryForecastMain/saveStorageFactoryApplyMain',     // 新增入库单保存
        findDetailById: ip + '/api/pda/storageFactoryForecastMain/findDetailById',     // 新增入库申请预报明细接口
        forecastFinish: ip + '/api/pda/storageFactoryForecastMain/forecastFinish',   //入库预报保存确认完成
    },
    ckgd: {
        findPageApi: ip + '/api/pda/outWorkOrderMain/findPageApi',     // 出库工单列表
        findOutWorkOrderDetail: ip + '/api/pda/outWorkOrderMain/findOutWorkOrderDetail',     // 出库工单详情
        addOutWorkOrderMain: ip + '/api/pda/outWorkOrderMain/addOutWorkOrderMain',     // 新增出库工单
    },
    cksq: {
        findPageApi: ip + '/api/pda/outApplyMain/findPageApi',     // 出库申请列表
        findApplyMainDetail: ip + '/api/pda/outApplyMain/findApplyMainDetail',     // 出库申请详情
    },
    ckyd: {
        findPageApi: ip + '/api/pda/outWaybillMain/findPageApi',     // 出库运单列表
        findWaybillDetail: ip + '/api/pda/outWaybillMain/findWaybillDetail',     // 出库运单详情
        addOutWaybillMain: ip + '/api/pda/outWaybillMain/addOutWaybillMain',     // 生成出库运单接口
		saveOutWaybill: ip + '/api/pda/outWaybillMain/saveOutWaybill',     // 点击确认完成按钮
    },
    sp: {
        findList: ip + '/api/pda/baseZhaji/findList',     // 产品榨季列表
        findList2: ip + '/api/pda/baseProductLevel/findList',     // 产品等级列表
        findPageApi: ip + '/api/pda/baseProduct/findPageApi',     // 商品列表查询
        findById: ip + '/api/pda/baseProduct/findById',     // 商品明细查询
    },
    yq: {
        findList: ip + '/api/pda/baseWarehouse/findList',     // 仓库
        index: '/pda/park/index',     // 园区排队信息总览
        findList2: ip + '/api/pda/basePark/findList',     // 查询园区
        findList3: ip + '/api/pda/baseWarehouseArea/findList',     // 查询库区
        findPageApi: ip + '/api/pda/baseServiceTeam/findPageApi',     // 查询装卸队伍
        findDict:ip + '/api/pda/baseServiceTeam/findDict', //查询作业方式,
        findParkQueue:ip + '/api/pda/parkQueue/findParkQueue', //统计园区
        getQueueEvolutionList:ip + '/wap/gatekeeper/getQueueEvolutionList', //获取园区排队信息实况
        letPass:ip + '/wap/gatekeeper/letPass', //放行
        getHistoryQueueRecord:ip + '/wap/gatekeeper/getHistoryQueueRecord', //历史排队纪录
        getQueueDetailById:ip + '/wap/driver/getQueueDetailById', //根据排队记录id，获取排队详情
        getBillDetail:ip + '/wap/driver/getBillDetail', //获取(出库/出库申请)运单详情
        getBillItemLi:ip + '/wap/driver/getBillItemLi', //获取单据Item列表
        getCode:ip + '/wap/gatekeeper/getCode', //获取二维码
        getAutoNo:ip + '/api/pda/baseMethod/getAutoNo', //自动生成单号
        findShiftWorkList:ip + '/api/pda/baseMethod/findShiftWorkList', //工作班次
        
    },
    ht: {
        findPageApi: ip + '/api/pda/baseContract/findPageApi',     // 查询合同列表
    },
	kcjs:{
		findPageApi: ip + '/api/pda/stockUnlockMain/findPageApi',     // 库存解锁列表
		findStockUnlockDetail: ip + '/api/pda/stockUnlockMain/findStockUnlockDetail',     //库存解锁详情
		addStockUnlockMain: ip + '/api/pda/stockUnlockMain/addStockUnlockMain'     // 库存解锁新增
	},
	kcsd:{
		getStockList: ip + '/api/stocklock/getStockList',     // 库存锁定列表
		getStockDetail: ip + '/api/stocklock/getStockDetail',     //库存锁定详情
	},
	knyk:{
		getAreaAdjustList: ip + '/api/stockAreaAdjust/getAreaAdjustList',     //库内移库列表
		getAreaAdjustDetail: ip + '/api/stockAreaAdjust/getAreaAdjustDetail',     //库内移库详情
	}
};