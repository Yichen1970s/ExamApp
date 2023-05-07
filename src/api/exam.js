import http from '../utils/http'
function ExamPaging(data){
    return http.post('exam/api/exam/exam/paging',data)
}
function ExamDetail(data){
    return http.post('exam/api/exam/exam/detail',data)
}

//创建试卷
function createExam(data){
    return http.post('exam/api/paper/paper/create-paper',data)
}

//试卷详情

function ExamStartDetail(data){
    return http.post('exam/api/paper/paper/paper-detail',data)
}
//题目详情
function TimuDetail(data){
    return http.post('exam/api/paper/paper/qu-detail',data)
}
//回答
function AnswerContent(data){
    return http.post('exam/api/paper/paper/fill-answer',data)
}
//交卷
function submitExam(data){
    return http.post('exam/api/paper/paper/hand-exam',data)
}
//获取考试结果
function ExamScore(data){
    return http.post('exam/api/paper/paper/paper-result',data)
}
//检测是否有正在进行的考试
function CheckExaming(data){
    return http.post('exam/api/paper/paper/check-process',data)
}


export {
    ExamPaging,
    ExamDetail,
    createExam,
    ExamStartDetail,
    TimuDetail,
    AnswerContent,
    submitExam,
    ExamScore,
    CheckExaming
}