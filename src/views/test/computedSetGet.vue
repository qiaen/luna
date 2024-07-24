<template>
	<el-select v-model="city.value" @change="setCity">
		<el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
	</el-select>
</template>
<script lang="ts" setup>
import {computed, defineEmits, defineProps} from 'vue'
let props = defineProps(['modelValue'])
let emits = defineEmits(['update:modelValue'])
function backLabel(value: any) {
	return value ? options.find((item: any) => item.value == value)?.label : undefined
}
let city = computed({
	get: () => {
		let v = props.modelValue || {}
		v.label = backLabel(v.value)
		return {
			value: v.value,
			label: backLabel(v.value)
		}
	},
	set(newVal: any) {
		emits('update:modelValue', {
			value: newVal,
			label: backLabel(newVal)
		})
	}
})

function setCity(val:any){
	city.value = val
}
let options = [
	{ value: 'shanghai', label: '上海' },
	{ value: 'beijing', label: '北京' },
	{ value: 'wuhan', label: '武汉' }
]
</script>