import http from '../utils/http'
function getExampaging(data){
 return http.post('exam/api/user/exam/my-paging',data)
}
function getExamfirstpaging(data){
 return http.post('exam/api/paper/paper/paging',data)
}
function getExamXiangQing(data){
 return http.post('exam/api/paper/paper/paging',data)
}
export {
 getExamfirstpaging,
 getExampaging,
 getExamXiangQing
}