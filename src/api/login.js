import http from '../utils/http'
function Login(data){
    return http.post('/exam/api/sys/user/login',data)
}
function test(data){
    return http.post('/exam/api/exam/exam/online-paging',data)
}

export {
Login,
test
}