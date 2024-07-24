<template>
	<el-select v-model="city">
		<el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
	</el-select>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { useVModel } from '@vueuse/core'
let props = defineProps(['modelValue'])
let emits = defineEmits(['update:modelValue'])

let city = useVModel(props, 'modelValue', emits)

let options = [
	{ value: 'shanghai', label: '上海' },
	{ value: 'beijing', label: '北京' },
	{ value: 'wuhan', label: '武汉' }
]
</script>