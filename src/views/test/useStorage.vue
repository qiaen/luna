<template>
	<el-input v-model="city" />
</template>
<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
/** 默认使用localStorage，可以指定使用session */
let city = useStorage('fe_city', '', sessionStorage)
</script>