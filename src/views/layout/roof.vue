<template>
	<div class="flex">
		<!-- 面包屑，折叠菜单 -->
		<div class="flex1 hideit fxmiddle bread">
			<i @click="SetMenuCollapse" :style="{ transform: `rotate(${isCollapse ? 0 : 180}deg)` }" class="iconfont icon-zhankai middle fsize20 pointer"></i>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item to="/">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
					<router-link :to="item.path">{{ item.name }}</router-link>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 头像，退出登录 -->
		<div class="flex avatar">
			<div class="middle">{{ userInfo.name || '' }}</div>
			<el-dropdown class="fxmiddle" @command="change">
				<span class="el-dropdown-link middle acc-avatar pointer">
					<img :src="userInfo.avatar || '/img/dt-7.png'" alt="头像" />
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="a" class="iconfont icon-zidongqingli">
							<span> &nbsp;退出登录</span>
						</el-dropdown-item>
						<el-dropdown-item command="b">
							<el-icon><MoonNight v-if="isDark" /><Sunny v-else /></el-icon><span>切换到{{ isDark ? '日间' : '夜间' }}主题</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { Sunny, MoonNight } from '@element-plus/icons-vue'
import { userInfo, Logout } from '@/store/Auth'
import { SetMenuCollapse, SetTheme, isCollapse, isDark } from '@/store/Layout'

const route: any = useRoute()
function change(val: string | void) {
	if (val === 'a') {
		Logout()
	}
	if (val === 'b') {
		SetTheme()
		window.setTheme()
	}
}
/** 面包屑 */
let breadcrumb: any = computed(() => {
	return route.path == '/' ? [] : [route]
})
</script>
<style lang="scss">
.layout-roof {
	.icon-zhankai {
		width: 46px;
		height: 100%;
	}
	.avatar {
		justify-content: flex-end;
		& > div {
			padding: 0 10px;
		}
		min-width: 40%;
		max-width: 40%;
		padding-right: 15px;
		.acc-avatar img {
			width: 32px;
		}
	}
}
</style>
