var ip = 'http://192.168.1.20:8888';

var api = {
    rkgd: {
        findPageApi: ip + '/api/pda/storageWorkOrderMain/api/findPageApi',     // 入库工单列表
        findDetail: ip + '/api/pda/storageWorkOrderMain/api/findDetail',     // 入库工单详情
    },
    rksq: {
        findPageApi: ip + '/api/pda/storageFactoryApplyMain/findPageApi',     // 入库申请单列表
        findApplyMainDetail: ip + '/api/pda/storageFactoryApplyMain/api/findApplyMainDetail',     // 入库申请单详情
        saveStorageFactoryApplyMain: ip + '/api/pda/storageFactoryApplyMain/api/saveStorageFactoryApplyMain',     // 入库申请单保存
        saveStorageFactoryWaybillMain: ip + '/api/pda/storageFactoryApplyMain/api/saveStorageFactoryWaybillMain',     // 入库运单保存
    },
    rkyds: {
        findPageApi: ip + '/api/pda/storageFactoryWaybillMain/api/findPageApi',     // 入库运单列表
        findDetail: ip + '/api/pda/storageFactoryWaybillMain/api/findDetail',     // 入库运单申请详情
        saveStorageFactoryWaybillMain: ip + '/api/pda/storageFactoryWaybillMain/api/saveStorageFactoryWaybillMain',     // 入库运单修改保存
    },
    rkybs: {
        findPageApi: ip + '/api/pda/storageFactoryForecastMain/api/findPageApi',     // 入库预报列表
        findApplyMainDetail: ip + '/api/pda/storageFactoryForecastMain/api/findApplyMainDetail',     // 入库申请详情
        saveStorageFactoryApplyMain: ip + '/api/pda/storageFactoryForecastMain/api/saveStorageFactoryApplyMain',     // 新增入库单保存
        findDetailById: ip + '/api/pda/storageFactoryForecastMain/api/findDetailById',     // 新增入库申请预报明细接口
    },
    rkybt: {
        findPageApi: ip + '/api/pda/storageFactoryForecastMain/findPageApi',     // 入库预报列表
        findApplyMainDetail: ip + '/api/pda/storageFactoryForecastMain/findApplyMainDetail',     // 入库申请详情
        saveStorageFactoryApplyMain: ip + '/api/pda/storageFactoryForecastMain/saveStorageFactoryApplyMain',     // 新增入库单保存
        findDetailById: ip + '/api/pda/storageFactoryForecastMain/findDetailById',     // 新增入库申请预报明细接口
    },
    ckgd: {
        findPageApi: ip + '/api/pda/outWorkOrderMain/api/findPageApi',     // 出库工单列表
        findOutWorkOrderDetail: ip + '/api/pda/outWorkOrderMain/api/findOutWorkOrderDetail',     // 出库工单详情
        addOutWorkOrderMain: ip + '/api/pda/outWorkOrderMain/api/addOutWorkOrderMain',     // 新增出库工单
    },
    cksq: {
        findPageApi: ip + '/api/pda/outApplyMain/api/findPageApi',     // 出库申请列表
        findApplyMainDetail: ip + '/api/pda/outApplyMain/api/findApplyMainDetail',     // 出库申请详情
    },
    ckyd: {
        findPageApi: ip + '/api/pda/outWaybillMain/api/findPageApi',     // 出库运单列表
        findWaybillDetail: ip + '/api/pda/outWaybillMain/api/findWaybillDetail',     // 出库运单详情
        addOutWaybillMain: ip + '/api/pda/outWaybillMain/api/addOutWaybillMain',     // 生成出库运单接口
    },
    sp: {
        findList: ip + '/api/pda/baseZhaji/api/findList',     // 产品榨季列表
        findList2: ip + '/api/pda/baseProductLevel/api/findList',     // 产品等级列表
        findPageApi: ip + '/api/pda/baseProduct/api/findPageApi',     // 商品列表查询
    },
    yq: {
        findList: ip + '/api/pda/baseWarehouse/api/findList',     // 仓库
        index: '/pda/park/index',     // 园区排队信息总览
        findList2: ip + '/api/pda/basePark/api/findList',     // 查询园区
        findList3: ip + '/api/pda/baseWarehouseArea/api/findList',     // 查询库区
        findList4: ip + '/api/pda/baseServiceTeam/api/findList',     // 查询装卸队伍
    },
};