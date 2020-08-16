import ins from './index'

//根据post_id 获取 帖子
export function getByPost_id(post_id) {
    return ins.get('/comment/getByPost_id', {
        params: {
            post_id
        }
    })
}

//创建评论
export function addComment(post_id, content) {
    return ins.post('/comment/add', {
        post_id,
        content,
        email: localStorage.getItem('email')
    })
}

//点赞 ，踩
export function oprateComment(type,comment_id)
{
    return ins.post('comment/oprate',{
        type,
        comment_id
    })
}