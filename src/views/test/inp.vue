<template>
	<div class="flex pt10">
		<el-input v-model="val"></el-input>
		<el-button @click="sendName" class="ml10">确 定</el-button>
	</div>
</template>
<script lang="ts" setup>
import Hub from './hub'
let val = ref('')
function sendName() {
	Hub.emit('sendName', val.value)
}
</script>
