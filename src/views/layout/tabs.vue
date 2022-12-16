<template>
	<div class="flex tabs shrink0">
		<!-- 主tab -->
		<div class="flex1 hideit">
			<el-tabs @tab-click="selectTab" @tab-remove="removeTab" :model-value="currentTab.path" type="card" closable>
				<el-tab-pane :key="item.path" v-for="item in menuTabs" :label="item.label" :name="item.path">
					<template #label>
						<span class="pointer center">
							<i :class="item.icon" class="label-icon fsize15"></i>
							{{ item.label }}
						</span>
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- 关闭所有 -->
		<div class="shrink0 close-btn">
			<el-dropdown placement="bottom-end">
				<span @click="removeTab($route.path)" class="el-dropdown-link center pointer fcgreen">
					<i class="iconfont icon-clear"></i>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="xTabs('all')">关闭所有</el-dropdown-item>
						<el-dropdown-item @click="xTabs('others')">关闭其他</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { menuTabs, CloseTabs, RemoveTab, currentTab } from '@/store/Layout'
let router = useRouter()
let route = useRoute()

/** 选中tab跳转页面 */
function selectTab(tab: any) {
	router.push(tab.paneName)
}
/** 删除tab，涉及到跳转 */
function removeTab(path?: any) {
	RemoveTab({ path }).then(() => {
		// 删除tab成功后，如果删除的是当前查看的，就回到首页
		if (path === route.path) {
			/** menuTabs的数量，有就回到最后一个，否则回到主页 */
			let len = menuTabs.value.length
			if (len) {
				selectTab({ paneName: menuTabs.value[len - 1].path })
			} else {
				selectTab({ paneName: '/' })
			}
		}
	})
}
/** 根据类型关闭tab */
function xTabs(type: any) {
	CloseTabs(type).then(() => {
		// 删除tab成功后，如果删除的是当前查看的，就回到首页
		if (type === 'all') {
			selectTab({ paneName: '/' })
		}
	})
}
</script>
<style lang="scss">
.tabs {
	.close-btn {
		.el-dropdown-link {
			width: 30px;
			height: 30px;
			background: var(--bg-color-fff);
			&:hover {
				color: #2c5cc5;
			}
		}
		.iconfont {
			transform: rotate(135deg);
		}
	}
	padding: 10px 15px;
	height: 30px;
	.is-active {
		color: #189cfb;
		font-weight: bold;
		background: #f1f5f9;
		border-bottom-color: #f1f5f9 !important;
	}
	.el-tabs--card > .el-tabs__header {
		border-bottom: none;
		.el-tabs__nav {
			border: none;
			border-radius: 0;
		}
	}
	.el-tabs__nav-wrap {
		margin-bottom: 0;
		&.is-scrollable {
			padding: 0 28px 0 18px;
			.el-tabs__nav-next {
				padding-right: 12px;
			}
		}
	}
	.el-tabs__item {
		background: var(--bg-color-fff);
		padding: 0 10px;
	}
	.el-tabs__item ~ .el-tabs__item {
		margin-left: 8px;
	}
	.label-icon {
		margin-right: 3px;
	}
	.el-tabs__item,
	.el-tabs__nav-next,
	.el-tabs__nav-prev {
		height: 30px;
		line-height: 30px;
	}
	.el-icon-close {
		margin-left: 0;
	}
	.el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable {
		padding-right: 10px;
		padding-left: 10px;
	}
	.el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {
		padding-left: 10px;
	}
	.el-tabs--top.el-tabs--card .el-tabs__item:last-child {
		padding-right: 10px;
	}
	.el-tabs--card > .el-tabs__header .el-tabs__item {
		border-left: none;
		border-bottom: none;
	}
}
</style>
