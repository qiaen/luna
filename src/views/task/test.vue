<template>
	<el-button @click="dialog = true" type="primary">打开盒子</el-button>
	<el-button @click="backEditTask" type="primary">打开盒子</el-button>
</template>
<script lang="ts" setup name="/task">
import { ref } from 'vue'
/** 弹窗 */
let dialog = ref(false)
/** 打开/关闭窗口 */
function backEditTask(val?: boolean) {
	dialog.value = false
	if (val) {
		console.log('打开了')
	} else {
		console.log('关闭了')
	}
}
</script>
