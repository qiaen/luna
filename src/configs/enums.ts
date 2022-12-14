const dict: any = {
	Yn: {
		0: '否',
		1: '是'
	},
	JOB_TYPE: [
		{
			name:'入库单',
			value: 1
		},
		{
			name:'出库单',
			value: 2
		}
	]
}
export default dict
export function MatchYn(s: any) {
	return dict.Yn[s] || '-'
}
