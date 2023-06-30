import Http from '@/utils/Http'
/** 示例1----------
 * 根据文件url下载文件，公用
 *- url：文件路径，必须
 *- feFileName: 文件名称，必须，特定参数放在headers内
 */
 export const downloadFileByUrl = (url: string, feFileName: string) => Http.ask('GET', url, {}, {
    responseType: 'blob',
	headers: { feFileName }
})

/** 示例2 ---------
 * 此接口配置了feSilent，所以不会弹出默认样式的错误消息通知，而是直接返回所有的response，前端有更大的开发空间 */
export const messageIsSilent = () => Http.ask('GET', `/ntApi/xxxx`, {}, { headers: { feSilent: true } })
/** 获取用户信息 */
export const getUserInfo = (params?: any) => Http.ask(`GET`, `/getUserInfo`, params)
/** 获取所有枚举接口 */
export const getAllEnum = (params?: any) => Http.ask(`GET`, `/getAllEnum`, params)
/** 获取七牛token */
export const getBucket = () => Http.ask('GET', '/getBucket')