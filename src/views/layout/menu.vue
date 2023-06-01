<template>
	<menu class="menus shrink0 hideit scroll-y">
		<div class="width100 menu-logo">
			<a :style="{ width: isCollapse ? '42px' : '' }" class="fxmiddle flex hideit height100">
				<img src="/img/dt-7.png" />
				<div class="pl5">
					<p class="fbold fsize14">{{ $t('花木兰') }}</p>
					<p class="fsize11">{{ $t('后台管理系统模版Vue3+TS') }}</p>
				</div>
			</a>
		</div>
		<!-- 菜单列表，默认不折叠，当前选中 在store common内配置 -->
		<el-menu :default-openeds="defaultOpeneds" :default-active="currentTab.path" background-color="var(--menu-bg)" text-color="#bbb" active-text-color="#fff" :collapse="isCollapse" :collapse-transition="false" :router="true">
			<template v-for="item in menus">
				<el-sub-menu :key="item.name" v-if="item.child && item.child.length" :index="item.path">
					<template #title>
						<i :class="item.icon"></i>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item-group>
						<template #title>{{ item.name }}</template>
						<el-menu-item v-for="c in item.child" :index="c.path" :key="c.name">
							<i :class="c.icon"></i>
							<span>{{ c.name }}</span>
						</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
				<el-menu-item :key="item.path" :index="item.path" v-else>
					<i :class="item.icon"></i>
					<template #title>
						<span>{{ item.name }}</span>
					</template>
				</el-menu-item>
			</template>
		</el-menu>
	</menu>
</template>
<script lang="ts" setup>
import { isCollapse, menus, defaultOpeneds, currentTab } from '@/store/Layout'
import { $t } from '@/configs/language'
</script>
<style lang="scss">
.menus {
	background-color: var(--menu-bg-2);
	.menu-logo {
		height: 50px;
		background: var(--menu-bg-1);
		p {
			color: #fff;
		}
		img {
			height: 38px;
		}
		a {
			transform: translate3d(14px, 0, 0);
		}
	}
	.el-menu-item-group__title {
		display: none !important;
	}
	.iconfont {
		color: #fff;
	}
}
// 作用于全局的菜单，如果有别的地方用到，可以使用弹出菜单的自定义类名属性：popper-class
.el-menu {
	border-right: none;
	.is-active {
		overflow: hidden;
		color: #fff;
		position: relative;
	}
	.iconfont {
		margin: 0 4px;
	}
	.el-menu-item {
		padding-right: 0;
	}
	.sub-span {
		text-indent: 8px;
		display: flex;
		align-items: center;
		&::before {
			content: '';
			display: inline-block;
			width: 2px;
			height: 14px;
			background-color: hsla(0, 0%, 100%, 0.2);
		}
	}
	.is-active:not(.is-opened) {
		.sub-span::before {
			background-color: var(--el-color-primary);
		}
		&::after {
			content: '';
			position: absolute;
			display: inline-block;
			top: 1px;
			background-image: url(@/assets/img/img-cebianlan.png);
			background-size: 100% 100%;
			height: 52px;
			width: 28px;
			right: -14px;
			z-index: 100;
		}
	}
}
.dark-theme {
	.is-active:not(.is-opened) {
		&::after {
			background-image: url(@/assets/img/img-cebianlan-dark.png);
		}
	}
}
/** 弹出层 菜单折叠后 */
.el-popper .el-menu-item.is-active {
	color: var(--text-color-main);
}
</style>
