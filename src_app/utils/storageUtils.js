/*
进行local数据存储管理的工具模块
 */
import store from 'store'

const USER_KEY = 'user_key'

// eslint-disable-next-line import/no-anonymous-default-export
export default {

    //保存user
    saveUser (user) {
        //localStorage 只能保存string，如果传递的是对象，会自动调用对象等待toString()并保存
        //localStorage.setItem(USER_KEY, JSON.stringify(user)) 保存的必须是对象的json串
        store.set(USER_KEY, user) //内部会自动转换成json再保存
    },

    //读取user
    getUser () {
        //如果存在，需要返回的是对象，如果没有值，返回{}
        //return JSON.parse(localStorage.getItem(USER_KEY) || '{}') => [object, object]
        return store.get(USER_KEY) || {}
    },

    //删除user
    removeUser () {
        //localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}