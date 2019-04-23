import store from '../store'
import Utils from '@/Utils/Index'
/**
 * 登出模块清空token
 * 清空token中的值
 * 清空cookie中的值
 */
export default function logout() {
    new Utils().setCookie('TK', '')
    store.commit('cleanUserInfo')
}