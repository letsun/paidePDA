var ip = 'http://192.168.1.20:8888';

var api = {
    rkgd: {
        findPageApi: ip + '/api/pda/storageWorkOrderMain/findPageApi',     // 入库工单列表
        findDetail: ip + '/api/pda/storageWorkOrderMain/findDetail',     // 入库工单详情
    },
    rksqT: {
        findPageApi: ip + '/api/pda/storageFactoryApplyMain/findPageApi',     // 入库申请单列表
        findApplyMainDetail: ip + '/api/pda/storageFactoryApplyMain/findApplyMainDetail',     // 入库申请单详情
        saveStorageFactoryApplyMain: ip + '/api/pda/storageWarehouseApplyMain/saveApplyMain',     // 入库申请单保存
        saveStorageFactoryWaybillMain: ip + '/api/pda/storageFactoryApplyMain/saveStorageFactoryWaybillMain',     // 入库运单保存
    },
    rksqS: {
        findPageApi: ip + '/api/pda/storageWarehouseApplyMain/findPageApi',     // 入库申请单列表
        findApplyMainDetail: ip + '/api/pda/storageWarehouseApplyMain/findApplyMainDetail',     // 入库申请单详情
        saveStorageFactoryApplyMain: ip + '/api/pda/storageWarehouseApplyMain/saveApplyMain',     // 入库申请单保存
    },
    rkyds: {
        findPageApi: ip + '/api/pda/storageFactoryWaybillMain/findPageApi',     // 入库运单列表
        findDetail: ip + '/api/pda/storageFactoryWaybillMain/findDetail',     // 入库运单申请详情
        saveStorageFactoryWaybillMain: ip + '/api/pda/storageFactoryWaybillMain/saveStorageFactoryWaybillMain',     // 入库运单修改保存
    },
    rkybs: {
        findPageApi: ip + '/api/pda/storageFactoryForecastMain/findPageApi',     // 入库预报列表
        findApplyMainDetail: ip + '/api/pda/storageFactoryForecastMain/findApplyMainDetail',     // 入库申请详情
        saveStorageFactoryApplyMain: ip + '/api/pda/storageFactoryForecastMain/saveStorageFactoryApplyMain',     // 新增入库单保存
        findDetailById: ip + '/api/pda/storageFactoryForecastMain/findDetailById',     // 新增入库申请预报明细接口
    },
    rkybt: {
        findPageApi: ip + '/api/pda/storageFactoryForecastMain/findPageApi',     // 入库预报列表
        findApplyMainDetail: ip + '/api/pda/storageFactoryForecastMain/findApplyMainDetail',     // 入库申请详情
        saveStorageFactoryApplyMain: ip + '/api/pda/storageFactoryForecastMain/saveStorageFactoryApplyMain',     // 新增入库单保存
        findDetailById: ip + '/api/pda/storageFactoryForecastMain/findDetailById',     // 新增入库申请预报明细接口
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
    },
    sp: {
        findList: ip + '/api/pda/baseZhaji/findList',     // 产品榨季列表
        findList2: ip + '/api/pda/baseProductLevel/findList',     // 产品等级列表
        findPageApi: ip + '/api/pda/baseProduct/findPageApi',     // 商品列表查询
    },
    yq: {
        findList: ip + '/api/pda/baseWarehouse/findList',     // 仓库
        index: '/pda/park/index',     // 园区排队信息总览
        findList2: ip + '/api/pda/basePark/findList',     // 查询园区
        findList3: ip + '/api/pda/baseWarehouseArea/findList',     // 查询库区
        findList4: ip + '/api/pda/baseServiceTeam/findList',     // 查询装卸队伍
    },
};