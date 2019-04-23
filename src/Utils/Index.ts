import Cookies from 'js-cookie'
import API from '@/Api/api_login';
interface csrf_res {
    token:string
}
class Utils{
    setCookie(key:string,value:string):string{
        Cookies.set(key,value);
        return value;
    }
    getCookie(key:string):string|undefined{
        return Cookies.get(key);
    }
    setCsrf():void{
        let param:object = {};
        API.get_csrf(param).then((res:csrf_res):any => {
            this.setCookie('csrftoken',res.token);
            console.log(this.getCookie('csrftoken'));
        })
    }
}
export default Utils;