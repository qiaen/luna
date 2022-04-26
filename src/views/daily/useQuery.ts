import { Ref, ref, watch } from 'vue'
interface UserQuery {
	username: Ref
	list: any
}
function mockUser() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([
				{
					name: 'Micle',
					age: 18
				},
				{
					name: 'Lili',
					age: 20
				},
				{
					name: 'Cissy',
					age: 9
				},
				{
					name: 'Milk',
					age: 10
				},
				{
					name: 'Lucc',
					age: 11
				}
			])
		}, 500)
	})
}
export default function (): UserQuery {
	let username = ref('')
	let list = ref([])
	let queryUser = async () => {
        mockUser().then((res: any) => {
            res = res.filter((item: any) => item.name === username.value)
            list.value = res
        })
    }
	watch(username, queryUser)
	return {
		username,
		list
	}
}
