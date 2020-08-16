// 函数返回一个可以用于  el-form 字段验证规则 验证函数

import { feildCheck } from 'network/user'
export function generateCheck(field, chinese) {

    return async (rule, value, callback) => {
        if (!rule) {
            return callback(new Error(chinese + '不能为空'));
        }
        const res = await feildCheck(field, value);
        console.log('实时 从后台匹配进行 验证:',res);
        if (res.found)
            return callback(new Error(`已存在 ${chinese} 为${value} 的用户`));
        else callback();
    }
}