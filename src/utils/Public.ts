/** 下载文件，适用用post方法返回的blob */
export function downloadBlob(blob: any, fileName: string) {
	let url = window.URL.createObjectURL(blob)
	let eleLink: any = document.createElement('a')
	eleLink.href = url
	eleLink.download = decodeURIComponent(fileName)
	document.body.appendChild(eleLink)
	eleLink.click()
	window.URL.revokeObjectURL(url)
}