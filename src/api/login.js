import http from '../utils/http'
function Login(data){
    return http.post('/exam/api/sys/user/login',data)
}

function info(data){
    return http.post('/exam/api/sys/user/info?token='+data.token)
}

export {
Login,
info
}