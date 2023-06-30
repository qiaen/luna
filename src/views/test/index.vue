<template>
	<section>
		<sline title="测试页面" size="big"></sline>
		<div class="pt10">{{ name }}</div>
		<inp></inp>
		<test3></test3>
	</section>
</template>
<script lang="ts" setup>
import inp from './inp.vue'
import Hub from './hub'
import test3 from '../daily/test-vue3.vue'
let name = ref('')
Hub.on('sendName', (val: any) => {
	name.value = `Hello, ${val}`
})
</script>