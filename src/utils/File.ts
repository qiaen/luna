/* eslint-disable */
import { ElMessage } from 'element-plus'
export const fileType: any = {
	image: ['jpg', 'jpeg', 'bmp', 'webp', 'png', 'gif', 'heic', 'raw', 'psd', 'tiff', 'svg', 'ico', 'eps', 'tga'],
	excel: ['xls', 'xlsx'],
	word: ['doc', 'docx']
}
/** 默认限制的文件大小, 3Mb */
export const fileMax = 3
/** 上传文件，并校验尺寸和格式
 *
 * 参数1: 回调函数
 *
 * 参数2: 接受类型
 *
 * 参数3：最大尺寸，默认3M
 *
 * 不建议在选择文件的时候过滤格式，因为个别配置低，文件特多的电脑会很卡，所以选完前端再校验格式
 */
export function pickFile(callback: Function, accept = '', max = fileMax) {
	const ele = document.createElement('input')
	const body: any = document.querySelector('body')
	ele.type = 'file'
	body.appendChild(ele)
	ele.click()
	ele.onchange = async (e: any) => {
		let files = e.target.files
		let file = files[0]
		console.log(file.type)
		if (!checkSuffix(file.name, accept)) {
			return
		}
		if (!checkSize(file.size, max)) {
			return
		}
		/** 拾取文件并校验通过 */
		if (callback) {
			callback(file)
		}
	}
	body.removeChild(ele)
}
/** 校验文件大小，默认不能上传超过3M的文件 */
function checkSize(fileSize: number, max: number) {
	if (fileSize > max * 1024 * 1024) {
		ElMessage.warning(`请勿上传超过${max}M的文件~`)
		return false
	} else {
		return true
	}
}
/** 校验文件后缀是否被允许 */
function checkSuffix(fileName: string, accept = '') {
	if (accept) {
		/** 限制了格式，去掉汉字逗号，去掉空格，转小写 */
		let aa: any = accept.replace(/，/g, ',').replace(/ /g, '').toLowerCase()
		aa = aa.split(',')
		/** 平铺展开后的允许上传文件的格式 */
		let last: string[] = []
		aa.forEach((item: string) => {
			if (fileType[item]) {
				last.push(...fileType[item])
			} else {
				last.push(item)
			}
		})
		let suffix: string = getSuffix(fileName) || ''
		if (!last.includes(suffix.toLowerCase())) {
			ElMessage.warning(`只能上传 ${accept} 文件`)
			return false
		}
		return true
	} else {
		/** 不限制，直接通过 */
		return true
	}
}
/** 通过url和name下载文件 */
export function downloadUrl(url: string, name: string) {
	const a = document.createElement('a')
	a.href = url
	a.target = '_blank'
	/** 如果没有文件名字，通过url取 */
	a.download = name
	a.click()
}
/** 根据文件名或者阿里oss链接，返回小写的文件名 */
export function getSuffix(name = '') {
	// 有时候name传入的是一个完整的文件url
	try {
		const h = new URL(name)
		name = h.pathname
	} catch (e) {}
	return name.slice(name.lastIndexOf('.') + 1).toLocaleLowerCase()
}
/** 判断是否为office */
export function isOffice(url = '') {
	let offices = ['pdf', 'xlsx', 'xls', 'doc', 'docx']
	let f = false
	for (let i of offices) {
		if (getSuffix(url).includes(i)) {
			f = true
			break
		}
	}
	return f
}