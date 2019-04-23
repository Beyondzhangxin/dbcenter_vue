import * as API from './';

export default {
    getWeatherData: (params: object, header?: object): any => {
        return API.GET('/rest/weather_data/', params)
    },
    postWeatherData: (params: object, header: object, config?: object): any => {
        return API.POST('/rest/weather_data/', params, header);
    },
    postDBdata: (params: object, header: object, config?: object): any => {
    return API.db_POST('/clickhouse/doDataImport', params, header);
},
    getGmmModelList: (params: object, header?: object): any => {
        return API.GET('/GMM/getAllDistributionConfigs', params)
    },
    postGmmModelData: (params: object, header?: object): any => {
        return API.POST('/GMM/model/distribution/', params, header);
    },
    deleteGmmModel: (params: object): any => {
        return  API.GET('/GMM/del', params);
    },
    gmmTraining:(params: object, header?: object):any=>{
        return API.POST('/GMM/testGMM',params,header)
    },
    getPowerStations:(params:object, header?: object):any=>{
        return API.GET('/system/powerStations',params)
    },
    getVariableList:(params:object, header?: object):any=>{
        return API.GET('/system/getAllParamsBySystemType',params)
    } ,
    getFileList:(params:object, header?: object):any=>{
        return API.db_GET('/clickhouse/getIndex',params)
    },
    getVariables:(params:object, header?: object):any=>{
        return API.db_GET('/clickhouse/getTable',params)
    },
    getSpaceInfo:(params:object,header?:object):any=>{
        return API.db_GET('/clickhouse/userSpace',params)
    },
    getFile:(params:object,header?:object):any=>{
        return API.db_GET('/clickhouse/getTable',params)
    },

    deleteDBfile:(params:object,header?:object):any=>{
        return API.db_GET('/clickhouse/deleteTable',params)
    },
    //电磁暂态数据接口
    electri_Tables:(params:object,header?:object):any=>{
        return API.db_GET('/clickhouse/electri_tr/tables',params)
    },
    electri_channels:(params:object,header?:object):any=>{
        return API.db_GET('/clickhouse/electri_tr/channels',params)
    },
    electri_idChannelData:(params:object,header?:object):any=>{
        return API.db_GET('/clickhouse/electri_tr/idChannelData',params)
    },
    electri_channelIdCount:(params:object,header?:object):any=>{
        return API.db_GET('/clickhouse/electri_tr/channelIdCount',params)
    },
    electri_delTable:(params:object,header?:object):any=>{
        return API.db_GET('/clickhouse/electri_tr/delTable',params)
    },
    electri_getTable:(params:object,header?:object):any=>{
        return API.db_GET('/clickhouse/electri_tr/channelData',params)
    },


}


