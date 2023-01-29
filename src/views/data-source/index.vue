<template>
	<section class="data-sources">
		<filters :model="params" @reset="init">
			<template #show>
				<el-form-item label="用户名" prop="name">
					<el-input v-model="params.name" style="width: 130px" @keyup.enter="init" placeholder="用户名" clearable></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="userStatus">
					<el-select @change="init" placeholder="请选择用户状态" style="width: 130px" v-model="params.userStatus" clearable>
						<el-option label="全部" value></el-option>
						<el-option v-for="item in serviceEnum.USER_STATUS" :label="item.name" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="邮箱地址" prop="email">
					<el-input v-model="params.email" @keyup.enter="init" style="width: 140px" placeholder="邮箱地址" clearable></el-input>
				</el-form-item>
				<el-form-item label="用户身份" prop="status">
					<el-select @change="init" placeholder="请选择作业类型" style="width: 140px" v-model="params.status" clearable>
						<el-option label="全部" value></el-option>
						<el-option v-for="item in serviceEnum.USER_POSITION" :label="item.name" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="创建时间" prop="date">
					<el-date-picker @change="init" v-model="params.date" :format="'YYYY-MM-DD HH:mm:ss'" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 380px" />
				</el-form-item>
			</template>
			<template #button>
				<el-button type="primary" @click="init" :loading="xoading" :icon="Search">查询</el-button>
				<el-button type="primary" @click="dialog = true" :icon="CirclePlus">新增</el-button>
				<el-button :disabled="mainSelected.length < 1" @click="batchDel" type="primary" :icon="Brush">批量删除</el-button>
			</template>
		</filters>
		<el-table class="zm-table" @selection-change="mainSelectionChange" height="100%" v-loading="xoading" :data="mainTable" border>
			<el-table-column type="selection" width="55" align="center"></el-table-column>
			<el-table-column prop="status" label="头像" width="60">
				<template #default="scope">
					<div class="center" style="vertical-align: middle">
						<img :src="scope.row.avatar" width="30" height="30" />
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="用户名" min-width="120" sortable show-overflow-tooltip></el-table-column>
			<el-table-column prop="status" label="状态" width="90">
				<template #default="scope">
					<span class="tag-status-circle" :class="'tag-status-' + scope.row.status"></span>
					{{ matchEnum('USER_STATUS', scope.row.status) }}
				</template>
			</el-table-column>
			<el-table-column prop="phoneNumber" label="手机号" width="110" show-overflow-tooltip></el-table-column>
			<el-table-column prop="email" label="邮箱地址" min-width="160" sortable></el-table-column>
			<el-table-column prop="position" label="身份信息" min-width="120" sortable>
				<template #default="scope">{{ matchEnum('USER_POSITION', scope.row.position) }}</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="160" sortable></el-table-column>
			<el-table-column fixed="right" label="操作" width="125">
				<template #default="scope">
					<el-button @click="setCurrtRow(scope.row, 'edit')" type="success" link>编辑</el-button>
					<el-button @click="setCurrtRow(scope.row, 'del')" type="warning" link>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="pt10 right"
			@size-change="sizeChange"
			@current-change="pageChange"
			v-model:currentPage="pageInfo.pageNo"
			v-model:pageSizes="pageInfo.sizes"
			:page-size="pageInfo.pageSize"
			:layout="pageInfo.layout"
			:total="pageInfo.total"
		></el-pagination>
		<!-- 作业查看，编辑，新增 -->
		<drawer v-model="dialog" @back="backEditTask" :title="currtRow.name">
			<template #left>
				<checkin cite="true" @back="backEditTask"></checkin>
			</template>
		</drawer>
	</section>
</template>
<script lang="ts" setup name="/datasource">
import { Search, CirclePlus, Brush } from '@element-plus/icons-vue'
import { reactive, ref, defineAsyncComponent } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import * as Users from '@/api/Users'
import Mixins from '@/utils/Mixins'
/** 动态异步导入抽屉的内容 */
const checkin = defineAsyncComponent(() => import('../task/checkin.vue'))
const { xoading, mainTable, pageInfo, init, matchEnum, sizeChange, pageChange, mainSelected, mainSelectionChange, serviceEnum, currtRow } = Mixins(get)
let params: any = reactive({
	status: '',
	userStatus: '',
	date: [],
	name: ''
})

async function get() {
	xoading.value = true
	let [_, res] = await Users.getList({
		...params,
		pageNo: 1,
		keyword: ''
	})
	xoading.value = false
	if (res && res.code === 200) {
		mainTable.value = res.data
		pageInfo.total = res.data.length
	}
}
init()
/** 抽屉相关 开始 */
let dialog = ref(false)
function backEditTask(val: boolean) {
	dialog.value = false
	if (val) {
		ElNotification({
			type: 'success',
			title: '点击了确定',
			message: '新增成功，我已经刷新列表了～～'
		})
		init()
	} else {
		ElMessage('你已返回到列表～～')
	}
}
/** 点击编辑、删除 */
function setCurrtRow(row: any, type: string) {
	if (type === 'edit') {
		currtRow.value = row
		dialog.value = true
	} else {
		ElMessage.success(`${row.name}已删除！`)
	}
}
function batchDel() {
	ElMessage.success(`已删除${mainSelected.value.map(item => item.name).join('、')}等${mainSelected.value.length}个用户！`)
}
/** 抽屉相关 结束 */
</script>
