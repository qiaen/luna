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
					age: 18,
					favorites: [
						{ id:2, name: 'draw' }
					]
				},
				{
					name: 'Lili',
					age: 20,
					favorites: [
						{ id:1, name: 'football' },
						{ id:2, name: 'draw' }
					]
				}
			])
		}, 16)
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
