<template>
	<section class="data-sources">
		<filters :model="params" @reset="init">
			<template #show>
				<el-form-item :label="$t('用户名')" prop="name">
					<el-input v-model="params.name" style="width: 130px" @keyup.enter="init" :placeholder="$t('用户名')" clearable></el-input>
				</el-form-item>
				<el-form-item :label="$t('状态')" prop="userStatus">
					<el-select @change="init" :placeholder="$t('状态')" style="width: 130px" v-model="params.userStatus" clearable>
						<el-option :label="$t('全部')" value></el-option>
						<el-option v-for="item in serviceEnum.USER_STATUS" :label="item.name" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('邮箱地址')" prop="email">
					<el-input v-model="params.email" @keyup.enter="init" style="width: 140px" :placeholder="$t('邮箱地址')" clearable></el-input>
				</el-form-item>
				<el-form-item :label="$t('身份信息')" prop="status">
					<el-select @change="init" :placeholder="$t('身份信息')" style="width: 140px" v-model="params.status" clearable>
						<el-option :label="$t('全部')" value></el-option>
						<el-option v-for="item in serviceEnum.USER_POSITION" :label="item.name" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('创建时间')" prop="date">
					<el-date-picker @change="init" v-model="params.date" :format="'YYYY-MM-DD HH:mm:ss'" type="datetimerange" range-separator="~" :start-placeholder="$t('开始时间')" :end-placeholder="$t('结束时间')" style="width: 380px" />
				</el-form-item>
			</template>
			<template #button>
				<el-button type="primary" @click="init" :loading="xoading" :icon="Search">{{ $t('查询') }}</el-button>
				<el-button type="primary" @click="dialog = true" :icon="CirclePlus">{{ $t('新增') }}</el-button>
				<el-button :disabled="mainSelected.length < 1" @click="batchDel" type="primary" :icon="Brush">{{ $t('批量删除') }}</el-button>
			</template>
		</filters>
		<el-table class="zm-table" @selection-change="mainSelectionChange" height="100%" v-loading="xoading" :data="mainTable" border>
			<el-table-column type="selection" width="55" align="center"></el-table-column>
			<el-table-column prop="status" :label="$t('头像')" min-width="60">
				<template #default="scope">
					<div class="center" style="vertical-align: middle">
						<img :src="scope.row.avatar" width="30" height="30" />
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="name" :label="$t('用户名')" min-width="120" sortable show-overflow-tooltip></el-table-column>
			<el-table-column prop="status" :label="$t('状态')" width="90">
				<template #default="scope">
					<span class="tag-status-circle" :class="'tag-status-' + scope.row.status"></span>
					{{ matchEnum('USER_STATUS', scope.row.status) }}
				</template>
			</el-table-column>
			<el-table-column prop="phoneNumber" :label="$t('手机号')" width="110" show-overflow-tooltip></el-table-column>
			<el-table-column prop="email" :label="$t('邮箱地址')" min-width="160" sortable></el-table-column>
			<el-table-column prop="position" :label="$t('身份信息')" min-width="120" sortable>
				<template #default="scope">{{ matchEnum('USER_POSITION', scope.row.position) }}</template>
			</el-table-column>
			<el-table-column prop="createTime" :label="$t('创建时间')" width="160" sortable></el-table-column>
			<el-table-column fixed="right" :label="$t('操作')" width="125">
				<template #default="scope">
					<el-button @click="setCurrtRow(scope.row, 'edit')" type="success" link>{{ $t('编辑') }}</el-button>
					<el-button @click="setCurrtRow(scope.row, 'del')" type="warning" link>{{ $t('删除') }}</el-button>
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
		<drawer v-model="dialog" @back="backEditTask" :title="currtRow.name" route>
			<template #left>
				<checkin cite="true" @back="backEditTask"></checkin>
			</template>
		</drawer>
	</section>
</template>
<script lang="ts" setup name="/datasource">
import { Search, CirclePlus, Brush } from '@element-plus/icons-vue'
import { ElNotification, ElMessage } from 'element-plus'
import { $t } from '@/configs/language'
import * as Users from '@/api/Users'
import Mixins from '@/utils/Mixins'
/** 路由 */
let route = useRoute()
let router = useRouter()
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
let dialog = computed(() => route.name === '用户详情')
function backEditTask(val: boolean) {
	if (val) {
		router.back()
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
		router.push(`/datasource/${row.id}`)
		// dialog.value = true
	} else {
		ElMessage.success(`${row.name}已删除！`)
	}
}
function batchDel() {
	ElMessage.success(`已删除${mainSelected.value.map(item => item.name).join('、')}等${mainSelected.value.length}个用户！`)
}
/** 抽屉相关 结束 */
</script>
