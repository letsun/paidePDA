var ip = '';

var api = {
    rkgd: {
        findPageApi: '/admin/storageWorkOrderMain/api/findPageApi',     // 入库工单列表
        findDetail: '/admin/storageWorkOrderMain/api/findDetail',     // 入库工单详情
    },
    rksq: {
        findPageApi: '/admin/storageFactoryApplyMain/api/findPageApi',     // 入库申请单列表
        findApplyMainDetail: '/admin/storageFactoryApplyMain/api/findApplyMainDetail',     // 入库申请单详情
        saveStorageFactoryApplyMain: '/admin/storageFactoryApplyMain/api/saveStorageFactoryApplyMain',     // 入库申请单保存
        saveStorageFactoryWaybillMain: '/admin/storageFactoryApplyMain/api/saveStorageFactoryWaybillMain',     // 入库运单保存
    },
    rkyds: {
        findPageApi: '/admin/storageFactoryWaybillMain/api/findPageApi',     // 入库运单列表
        findDetail: '/admin/storageFactoryWaybillMain/api/findDetail',     // 入库运单申请详情
        saveStorageFactoryWaybillMain: '/admin/storageFactoryWaybillMain/api/saveStorageFactoryWaybillMain',     // 入库运单修改保存
    },
    rkybs: {
        findPageApi: '/admin/storageFactoryForecastMain/api/findPageApi',     // 入库预报列表
        findApplyMainDetail: '/admin/storageFactoryForecastMain/api/findApplyMainDetail',     // 入库申请详情
        saveStorageFactoryApplyMain: '/admin/storageFactoryForecastMain/api/saveStorageFactoryApplyMain',     // 新增入库单保存
        findDetailById: '/admin/storageFactoryForecastMain/api/findDetailById',     // 新增入库申请预报明细接口
    },
    ckgd: {
        findPageApi: '/admin/outWorkOrderMain/api/findPageApi',     // 出库工单列表
        findOutWorkOrderDetail: '/admin/outWorkOrderMain/api/findOutWorkOrderDetail',     // 出库工单详情
        addOutWorkOrderMain: '/admin/outWorkOrderMain/api/addOutWorkOrderMain',     // 新增出库工单
    },
    cksq: {
        findPageApi: '/admin/outApplyMain/api/findPageApi',     // 出库申请列表
        findApplyMainDetail: '/admin/outApplyMain/api/findApplyMainDetail',     // 出库申请详情
    },
    ckyd: {
        findPageApi: '/admin/outWaybillMain/api/findPageApi',     // 出库运单列表
        findWaybillDetail: '/admin/outWaybillMain/api/findWaybillDetail',     // 出库运单详情
        addOutWaybillMain: '/admin/outWaybillMain/api/addOutWaybillMain',     // 生成出库运单接口
    },
    sp: {
        findList: '/admin/baseZhaji/api/findList',     // 产品榨季列表
        findList2: '/admin/baseProductLevel/api/findList',     // 产品等级列表
        findPageApi: '/admin/baseProduct/api/findPageApi',     // 商品列表查询
    },
    yq: {
        findList: '/admin/baseWarehouse/api/findList',     // 仓库
        index: '/pda/park/index',     // 园区排队信息总览
        findList2: '/admin/basePark/api/findList',     // 查询园区
        findList3: '/admin/baseWarehouseArea/api/findList',     // 查询库区
        findList4: '/admin/baseServiceTeam/api/findList',     // 查询装卸队伍
    },
};