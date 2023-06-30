export default () => {
	/** 文件上传中 */
	let loading = ref(false)
	/** 是否显示上传进度，仅上传中显示 */
	let showProgress = ref(false)
	/** 文件上传百分比，假的，用于缓解用户上传焦虑 */
	let percentage = ref(0)
	/** 文件上传状态，用于显示失败字样 */
	let status: any = ref('')
	/** 显示或隐藏进度条
	 * 
	 * 参1：true | false，显示或隐藏
	 * 
	 * 参2：true | false，上传成功还是失败，分别显示不同的提示信息
	 */
	function setProgress(type: boolean, isSucess = false) {
		loading.value = type
		if (type) {
			status.value = ''
			percentage.value = 0
			showProgress.value = true
			function p() {
				if (!loading.value) {
					return
				}
				if (percentage.value >= 99) {
					percentage.value = 99
				} else {
					percentage.value += 1
					setTimeout(p, 150)
				}
			}
			p()
		} else {
			let time = 300
			if (isSucess) {
				percentage.value = 100
			} else {
				status.value = 'exception'
				time = 1000
			}
			setTimeout(() => {
				showProgress.value = false
			}, time)
		}
	}
	/** 进度条色值 */
	let colors = [
		{ color: '#f56c6c', percentage: 20 },
		{ color: '#e6a23c', percentage: 50 },
		{ color: '#1989fa', percentage: 75 },
		{ color: '#5cb87a', percentage: 100 }
	]
	return {
		/** 文件上传中 */
		loading,
		/** 是否显示上传进度，仅上传中显示 */
		showProgress,
		/** 文件上传百分比，假的，用于缓解用户上传焦虑 */
		percentage,
		/** 文件上传状态，用于显示失败字样 */
		status,
		/** 显示或隐藏进度条，
		 * type：blooean，显示或隐藏
		 * isSucess：上传成功还是失败
		 */
		setProgress,
		/** 进度条色值 */
		colors
	}
}
