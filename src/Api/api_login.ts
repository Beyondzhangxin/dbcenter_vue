import * as API from './'

export default {
    get_loginStatus:(params:object,header?:object):any =>{
        return API.GET('/login_status/',params)
    },
    get_csrf:(params:object,header?:object):any =>{
        return API.GET('/get_token/',params)
    },
    login:(params:object,header:object,config?:object):any=>{
        return API.POST('/api-token-auth/',params,header);
    },
    get_users:(params:object,header?:object):any=>{
        return API.GET('/rest/users',params);
    }
    
}