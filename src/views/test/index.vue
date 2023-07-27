<template>
	<section>
		<sline title="测试页面" size="big"></sline>
		<div class="pt10">{{ name }}</div>
		<inp></inp>
		<test3></test3>
		{{ num }}
        <div>
            <el-button @click="add">add</el-button>
		<el-button @click="changeName">changeName</el-button>
        </div>
		
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
let num = ref(1)
function add() {
	num.value++
}
function changeName() {
	name.value += '--'
}
/** 与watch的却别
 * 1. watch指定监听对象，watchEffect不需要，会自动指定监听对象，也就是收集依赖关系
 * 比如下面这个只有num变动才会答应，而name变动不会触发答应
 * 2. watchEffect默认自动触发，有点像immediate：true
 * 3.watchEffect 无法访问侦听数据的新值和旧值
 */
watchEffect(onInvalidate => {
	// const timer = setInterval(() => {
	// 	console.log('发请网络请求')
	// }, 1000)
    // 打印num value 1秒后才打印发请网络请求，并且会清除timer
	onInvalidate(() => {
        // 这里默认进来不执行，只有手动点击按钮才执行
        console.log('hello')
		// clearInterval(timer)
	})
	console.log(num.value)
})
</script>
