import ins from './index'

export function getPosts({ email, limit, page, _id }) {
    return ins.get('/post/get', {
        params: {
            email: email || null,
            limit,
            offset: (page - 1) * limit,
            _id
        }
    });
}

// 关键字 搜索  帖子
export function searchPosts(keyword, { limit, page }) {
    return ins.get('/post/search', {
        params: {
            email: keyword,
            title: keyword,
            limit,
            offset: (page - 1) * limit
        }
    })
}

//创建 帖子
export function createPost({ category, title, content }) {
    return ins.post('/post/new', {
        email: localStorage.getItem('email'),
        category,
        title,
        content
    })
}

//增加帖子的 查看次数
export function addSeeCount(post_id) {
    return ins.post('/post/addSeeCount', {
        post_id
    })
}