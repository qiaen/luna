<template>
	<div class="layout full-content hideit flex">
		<!-- 左侧菜单 -->
		<menus></menus>
		<!-- 右侧主内容区域 -->
		<main class="main flex-view hideit">
			<!-- 头部 -->
			<!-- 顶部功能区 -->
			<roof class="shrink0 layout-roof"></roof>
			<!-- 主内容 -->
			<div class="bgpic relative hideit flex-view">
				<tabs></tabs>
				<!-- 页面缓存，注意事项看下方 cachedViews-->
				<router-view class="bgmain main-content absolute flex-view" v-slot="{ Component }">
					<transition name="fade-transform" appear>
						<keep-alive :include="cachedViews">
							<component :is="Component" />
						</keep-alive>
					</transition>
				</router-view>
			</div>
		</main>
	</div>
</template>
<script lang="ts" setup>
import Menus from './menu.vue'
import Roof from './roof.vue'
import Tabs from './tabs.vue'
/** 缓存页面列表 */
import { cachedViews } from '@/store/Layout'
</script>
<style lang="scss">
// 页面切换中，隐藏抽屉
.transiting {
	.drawer-bg {
		display: none;
	}
}
.layout {
	.topbar {
		height: 50px;
		padding: 0 15px;
		border-bottom: 1px solid #ddd;
	}
	.main-content {
		top: 50px;
		right: 15px;
		bottom: 15px;
		left: 15px;
		padding: 15px 15px 10px 15px;
		z-index: 10;
	}
	.layout-roof {
		height: 50px;
		background-color: var(--bg-color-fff);
		border-bottom: 1px solid var(--border-color-primary);
	}
}
</style>
