import { getBucket } from '@/api/Base'
/** 上传成功后返回的七牛文件信息 */
export interface QNFile {
	/** 文件hash */
	hash: string
	/** 文件在七牛的url */
	url: string
	/** 文件名称，确实叫key。。。。 */
	key: string
}
/** 文件上传成功调用的函数，会返回一个对象 */
interface succeedFunc {
	(info: QNFile): void
}
/** 调用七牛上传文件的配置 */
interface Options {
	/** 文件流 */
	file: any
	/** 文件名称，不是必须的，如果没有设定名字，就去file的文件名 */
	filaName?: string
	/** 文件上传前调用的函数 */
	before?: Function
	/** 文件上传成功调用的函数，会返回一个对象 */
	succeed?: succeedFunc
	/** 文件上传失败 */
	failed?: Function
}
/** 七牛bucket */
let bucket = 'UIQBWE'
/** 上传由此开始 */
export async function qiniuUpload(options: Options) {
	let { file, before, failed, succeed, filaName } = options
	if (!file) {
		return console.log('上传文件不能为空！')
	}
	before && before()
	let name = filaName || file.name
	let observable = window.qiniu.upload(file, name, bucket, {}, {
		useCdnDomain: true,
		region: window.qiniu.region.cnEast2
	})
	let observer = {
		async complete(res: any) {
			succeed && succeed({
				hash: res.hash,
				url: `/file/${name}`,
				key: name
			})
		},
		async error(err:any) {
			/* bucket失效，重新获取并上传 */
			if (err.name === 'InvalidToken') {
				let [data] = await getBucket()
				if (data) {
					bucket = data
					qiniuUpload(options)
				}
			} else {
				failed && failed()
			}
		}
	}
	observable.subscribe(observer)
}
