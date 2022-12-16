<template>
	<div class="hideit">
		<div class="fsize24 pl20">快捷设置</div>
		<div class="line mt20 mb20"></div>
		<div class="pl20 pr20">
			<div class="fsize20 mb10">外观<span class="fsize12">(Languages)</span></div>
			<el-radio-group :model-value="isDark" @change="changeTheme">
				<div class="flex width100">
					<div class="flex1">
						<el-radio label="0">浅色主题</el-radio>
					</div>
					<img src="@/assets/img/light_thumbnail2.png" alt="" />
				</div>
				<div class="flex width100 mt10">
					<div class="flex1">
						<el-radio label="1">深色主题</el-radio>
					</div>
					<img src="@/assets/img/dark_thumbnail2.png" alt="" />
				</div>
			</el-radio-group>
		</div>
		<div class="line mt20 mb20"></div>
		<div class="pl20 pr20">
			<div class="fsize20 mb10">使用服务</div>
			<div class="flex pt10">
				<div class="flex1">语言<span class="fsize12">(Languages)</span></div>
				<span>中文 (简体)</span>
			</div>
			<div class="flex pt20">
				<div class="flex1">使用缓存<span class="fsize12">(Use Storage)</span></div>
				<span>是</span>
			</div>
		</div>
		<el-button @click="Logout" class="absolute logout-btn" text bg> <i class="iconfont icon-tuichudenglu fsize14"></i>&nbsp;&nbsp;退出登录 </el-button>
	</div>
</template>
<script lang="ts" setup>
import { isDark, SetTheme } from '@/store/Layout'
import { userInfo, Logout } from '@/store/Auth'
function changeTheme() {
	SetTheme()
	window.setTheme()
}
</script>
<style lang="scss">
.line {
	height: 1px;
	background-color: var(--border-color-primary);
}
.logout-btn {
	width: 316px;
	left: 20px;
	bottom: 30px;
}
</style>
