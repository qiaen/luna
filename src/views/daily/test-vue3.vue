<template>
	<h3 class="pt10">好用的功能1，信息切换自动查询信息</h3>
	<div class="flex">
		<el-select v-model="username">
			<el-option value="Micle">Micle</el-option>
			<el-option value="Lili">Lili</el-option>
		</el-select>
		<div class="pl5 fxmiddle">{{ list }}</div>
	</div>
	<div>
		<el-button @click="change">change</el-button>
	</div>
	<div>{{ state }}</div>
	<div>{{ r1 }}</div>
	<div>{{ r2 }}</div>
	<div>{{ n1 }}</div>
	<div>page.index = {{ page.index }}， 当有其他响应式的数据更新时这里也会更新，否则不更新</div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import userQuery from './useQuery'
let { username, list } = userQuery()
let state: any = ref([])
state.value = [
	{
		name: 1,
		id: 1,
		f: [1, 2, 4]
	}
]
let r1 = reactive({
	name: 222
})
let r2 = reactive([{ name: 11 }])
function change() {
	// console.log((list[0].favorites[0].id = 200))
	// console.log(state.value[0].f[0] += 100)
	page.index += 100
	/** r1并不会被更新，直接给r1赋值并不会更新r1，r1.name = 3333才会生效 */
	/** 无效 */
	// r1 = {
	// 	name: 3333
	// }
	/** 无效 */
	// r1 = reactive({
	// 	name: 3333
	// })
	/** 有效 */
	// r1.name += 3333
	n1 += 1
	r2[0].name += 12
	state.value = 1
}
let page = {
	index: 2
}
let n1 = 10
</script>
