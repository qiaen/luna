const dict: any = {
	Yn: {
		0: '否',
		1: '是'
	}
}
export default dict
export function MatchYn(s: any) {
	return dict.Yn[s] || '-'
}
