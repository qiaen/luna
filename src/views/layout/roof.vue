<template>
	<div class="flex">
		<!-- 面包屑，折叠菜单 -->
		<div class="flex1 hideit fxmiddle bread">
			<i @click="SetMenuCollapse" :style="{ transform: `rotate(${isCollapse ? 0 : 180}deg)` }" class="iconfont icon-zhankai middle fsize18 pointer"></i>
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
			<!-- <div class="middle">
				<i class="iconfont icon-tongshezhi"></i>
			</div> -->
			<div class="fxmiddle">
				<span @click="osSet = true" class="el-dropdown-link relative middle acc-avatar pointer">
					<img :src="userInfo.avatar || '/img/dt-7.png'" alt="头像" />
					<!-- <i class="iconfont icon-shezhi absolute middle fcfff"></i> -->
				</span>
			</div>
			<!-- <el-dropdown class="fxmiddle" @command="change">
				<span @click="osSet = true" class="el-dropdown-link relative middle acc-avatar pointer">
					<img :src="userInfo.avatar || '/img/dt-7.png'" alt="头像" />
					<i class="iconfont icon-shezhi absolute middle fcfff"></i>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="a" class="iconfont icon-tuichudenglu">
							<span> &nbsp;退出登录</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown> -->
		</div>
		<el-drawer v-model="osSet" :with-header="false" modal-class="luna-drawer" size="360">
			<sets></sets>
		</el-drawer>
	</div>
</template>
<script lang="ts" setup>
import { userInfo, Logout } from '@/store/Auth'
import { SetMenuCollapse, isCollapse } from '@/store/Layout'
import Sets from './sets.vue'
const route: any = useRoute()
function change(val: string | void) {
	if (val === 'a') {
		Logout()
	}
}
/** 面包屑 */
let breadcrumb: any = computed(() => {
	return route.path == '/' ? [] : [route]
})
let osSet = ref(false)
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
		.acc-avatar {
			img {
				width: 32px;
			}
			.iconfont {
				width: 100%;
				height: 100%;
				opacity: 0;
			}
			&:hover {
				.iconfont {
					background-color: rgba(#000, 0.4);
					opacity: 1;
				}
			}
		}
	}
}
.luna-drawer {
	.el-drawer__body {
		padding: 20px 0;
	}
}
</style>
