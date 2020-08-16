import ins from './index'
import md5 from 'blueimp-md5'
//注册时 验证 字段是否有效
export function feildCheck(feild, value) {
    return ins.get('/user/feildcheck', {
        params: {
            feild,
            value
        }
    })
}

//用户登录
export function loginReq({ email, password }) {
    return ins.post('/user/login', {
        email,
        password: md5(password)
    })
}
//用户注册
export function registerReq({
    email, password, nickname, bio, gender, birthday
}) {
    return ins.post('/user/register', {
        email, password: md5(password), nickname, bio, gender, birthday
    })
}

//获取用户信息 
export function getUserInfo() {
    return ins.get('/user/info', {
        params: {
            email: localStorage.getItem('email')
        }
    })
}

//更新用户信息
export function updateUser(info) {
    return ins.post('/user/update', info)
}

//上传头像
export function updateAvatar(formData) {
    return ins.post('/user/updateAvatar', formData)
}


export function updatePass(password) {
    return ins.post('/user/updatepass', { password, email: localStorage.getItem('email') }
    )
}

export function cancelUser() {
    return ins.delete('/user/cancel', {
        params: {
            email: localStorage.getItem('email')
        }
    })
}