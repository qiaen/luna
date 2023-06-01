const dict: any = {
	Yn: {
		0: '否',
		1: '是'
	},
	JOB_TYPE: [
		{
			name: '入库单',
			value: 1
		},
		{
			name: '出库单',
			value: 2
		}
	],
	Languages: [
		{
			value: 'zh',
			name: '中文 (简体)'
		},
		{
			value: 'en',
			name: 'English'
		},
		{
			value: 'zhtw',
			name: '中文 (繁体)'
		}
	]
}
export default dict
export function MatchYn(s: any) {
	return dict.Yn[s] || '-'
}
