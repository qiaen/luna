<template>
	<section>
		<sline title="测试页面" size="big"></sline>
		<div class="pt10">{{ name }}</div>
		<inp></inp>
	</section>
</template>
<script lang="ts" setup>
import inp from './inp.vue'
import Hub from './hub'
let name = ref('')
Hub.on('sendName', (val: any) => {
	name.value = `Hello, ${val}`
})
</script>
