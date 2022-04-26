/**本地存储 */
export default {
	/** 根据名字获取信息 */
	get(name: string) {
		let o = localStorage.getItem(name) || ''
		let cut = o.indexOf(';expiretime=')
		let val = o.substring(0, cut < 0 ? o.length : cut)
		if (cut < 0) {
			return this.back(val)
		} else {
			let exp: number = parseFloat(o.substring(cut + 12))
			if (exp < this.time()) {
				this.clear(name)
				return ''
			} else {
				return this.back(val)
			}
		}
	},
    /** 格式化 */
	back(val: string): any{
		try {
			val = JSON.parse(val)
		} catch (e) {}
		return val
	},
    /** 存储信息
     * name：存储的名字，
     * val：存储信息，
     * sec：过期信息
     */
	set(name: string, val: any, sec: number | void) {
		val = typeof val === 'object' ? JSON.stringify(val) : val
		if (sec) {
			val += ';expiretime=' + (this.time() + sec * 1000)
		}
		localStorage.setItem(name, val)
	},
    /** 根据名字清空存储 */
	clear(name: string) {
		localStorage.removeItem(name)
	},
	time(): number {
		return new Date().getTime()
	}
}
