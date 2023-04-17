const hub: any = {
	emit(fnName: string, val: any) {
		hub[fnName](val)
	},
	on(fnName: string, fn: Function) {
		hub[fnName] = fn
	}
}
export default hub