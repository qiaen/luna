/**选中的当前tab信息 */
export interface CurrentTab {
	/**路径 */
	path: string
	/**名字 */
	label: string
}
/** 接口字典 */
export interface DictOption {
	/** 字典code */
	code: string
	/** 字典显示的name */
	name: string
}
/** 接口返回的字典形式 */
export interface DictResponse {
	/** 字典数组 */
	dictList: DictOption[]
	/** 字典类型 */
	type: string
}
