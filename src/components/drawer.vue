<!-- 右侧划出，抽屉组件 -->
<template>
	<transition name="slide-right">
		<div v-if="modelValue" class="drawer-bg flex absolute">
			<div class="hideit pad20 flex1 flex">
				<div class="drawer-left bgmain flex flex1 fxcolumn hideit">
					<!-- 顶部 -->
					<header class="flex shrink0 relative">
						<!-- 返回区域 -->
						<div class="flex1 fxmiddle pointer mr15 drawer-back fcgreen" @click="back">
							<a class="fsize14 pr10 center fcblue">
								<el-icon><arrow-left-bold /></el-icon>{{ $route.name || '返回' }}
							</a>
							<!-- 页眉名称 -->
							<div v-if="title" class="drawer-title fxmiddle pl10 fsize14">
								{{ title }}
							</div>
						</div>
						<!-- 右侧按钮区域 -->
						<div class="fxmiddle">
							<slot name="btns"></slot>
						</div>
					</header>
					<!-- 顶部 结束 -->
					<!-- 左侧主内容 -->
					<div class="drawer-content flex flex1 hideit bgpic">
						<slot name="left"></slot>
					</div>
					<!-- 左侧主内容 结束 -->
				</div>
			</div>
		</div>
	</transition>
</template>
<script lang="ts" setup>
import { ArrowLeftBold } from '@element-plus/icons-vue'
defineProps(['title', 'modelValue'])

const emit = defineEmits(['back'])

function back() {
	emit('back', false)
}
</script>
<style lang="scss">
.drawer-back {
	&:hover {
		color: #2c5cc5;
		.drawer-title {
			border-left: 1px solid #2c5cc5;
		}
	}
	.drawer-title {
		border-left: 1px solid #999;
		height: 16px;
	}
}
.drawer-content {
	padding: 10px 15px;
}
.drawer-content > div,
.drawer-content > section {
	flex-grow: 1;
}
.drawer-right {
	width: 25%;
	min-width: 336px;
	padding: 0 12px;
	border-left: 1px solid #d2d2d2;
}
.drawer-right:empty {
	display: none;
}
.drawer-bg {
	left: -15px;
	top: -51px;
	right: -15px;
	bottom: -15px;
	z-index: 99;
	header {
		height: 40px;
		min-height: 40px;
		margin: 0 15px;
	}
}
</style>
