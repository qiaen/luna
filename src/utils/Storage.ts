const { VITE_NAME: vname, VITE_SEPARATOR: separator } = import.meta.env
/**本地存储 */
export default {
	/** 根据名字获取信息 */
	get(name: string) {
		let o = localStorage.getItem(this.refix(name)) || ''
		let [val, expiretime] = o.split(separator)
		if (expiretime) {
			return this.back(val)
		} else {
			let exp: number = parseFloat(expiretime)
			if (exp < this.time()) {
				this.clear(name)
				return ''
			} else {
				return this.back(val)
			}
		}
	},
	/** 格式化 */
	back(val: string): any {
		try {
			val = JSON.parse(val)
		} catch (e) {}
		return val
	},
	/** 存储信息
	 * name：存储的名字，
	 * val：存储信息，
	 * min：过期信息，单位：分钟
	 */
	set(name: string, val: any, min: number | void) {
		val = typeof val === 'object' ? JSON.stringify(val) : val
		if (min) {
			val += separator + (this.time() + min * 60 * 1000)
		}
		localStorage.setItem(this.refix(name), val)
	},
	/** 根据名字清空存储 */
	clear(name: string) {
		localStorage.removeItem(this.refix(name))
	},
	time(): number {
		return new Date().getTime()
	},
	/** 为name添加或去除前缀 */
	refix(name: string) {
		return name.includes(vname) ? name : `${vname}_${name}`
	}
}
