<template>
	<div v-loading="loading" element-loading-text="初始化加载中...." class="full-content hideit" :class="{ 'full-collapse': isCollapse }">
		<el-config-provider :locale="zhCn">
			<router-view />
		</el-config-provider>
	</div>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { isCollapse, loading } from '@/store/Layout'
</script>
<style lang="scss">
// 默认菜单宽度
.menus {
	width: 215px;
}

// 菜单折叠后的样式和宽度
.full-collapse {
	.menus {
		width: 64px;
	}
}
</style>
