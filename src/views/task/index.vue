<template>
	<section>
		<sline title="作业列表" size="big"></sline>
		<div class="pt20">
			<el-button @click="dialog = true" type="primary">打开盒子</el-button>
			<!-- <div class="menu-gap">
				<div></div>
				<span></span>
			</div> -->
			<!-- <img src="http://localhost:3000/src/assets/img/img-cebianlan.png" alt="" /> -->
		</div>
		<!-- 作业查看，编辑，新增 -->
		<drawer v-model="dialog" @back="backEditTask" title="作业登记">
			<template #left>
				<checkin cite="true" @back="backEditTask"></checkin>
			</template>
		</drawer>
	</section>
</template>
<script lang="ts" setup name="/task">
import { ElNotification, ElMessage } from 'element-plus'
/** 动态异步导入抽屉的内容 */
const checkin = defineAsyncComponent(() => import('./checkin.vue'))
let dialog = ref(false)
function backEditTask(val: boolean) {
	dialog.value = false
	if (val) {
		ElNotification({
			type: 'success',
			title: '点击了确定',
			message: '提交成功，请等待审核～～'
		})
	} else {
		ElMessage('你已返回到列表～～')
	}
}
</script>
<style lang="scss">

</style>
