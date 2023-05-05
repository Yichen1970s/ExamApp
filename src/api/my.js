import http from '../utils/http'
function exit(data) {
     return http.post('/exam/api/sys/user/logout', data)
    
}
function departList(data) {
     return http.post('/exam/api/sys/depart/tree', data)
    
}
function updataPassword(data) {
     return http.post('/exam/api/sys/user/save', data)
    
}

export {
     exit,
     departList,
     updataPassword
}