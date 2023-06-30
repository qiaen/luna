<!-- 带折叠展开筛选项组件 -->
<template>
	<div class="zm-upload">
		<template v-if="isShowUpload">
			<!-- 透传 loading信息，用#default="scope来接受" scope.loading == true 时为加载中 -->
			<span @click="pickHandler">
				<slot :loading="loading"></slot>
			</span>
			<br />
			<template v-if="limit != 1">
				<div v-if="showProgress" class="pt12 flex accept">
					<el-progress :percentage="percentage" :status="status" :color="colors" class="flex1" />
					<span class="fcred fsize12 fnormal" v-if="status == 'exception'">上传失败，请重试</span>
				</div>
				<div v-else class="pt12 fsize12 fc666 accept">{{ accept ? `只能上传 ${accept} 文件，且` : `上传文件请` }}不超{{ max }}M</div>
			</template>
		</template>
		<ul class="files-ul">
			<li class="flex files-li" v-for="(item, index) in files" :key="item.hash">
				<i class="iconfont icon-chenggong pointer fcgreen pr5 shrink0"></i>
				<p class="flex1 wrapit" :class="disabled ? '' : 'pointer'" @click="repickHandler(index)" :title="disabled ? item.key : `${item.key} （点击替换）`">{{ item.key }}</p>
				<div class="shrink0">
					<!-- 预览 -->
					<i @click="preview(item)" class="iconfont icon-yulan pointer pl5 fc666 fnormal"></i>
					<!-- 下载 -->
					<a :href="item.url" :download="item.key" target="_blank"><i class="iconfont icon-24px pointer pl5 fc666 fnormal"></i></a>
					<!-- 删除，有id的，提示一下 -->
					<el-popconfirm :disabled="loading" v-if="!disabled" title="确认删除吗？" @confirm="delFile(index, item)">
						<template #reference>
							<i class="iconfont icon-shanchu pointer pl5 fc666 fnormal"></i>
						</template>
					</el-popconfirm>
				</div>
			</li>
		</ul>
	</div>
</template>
<script lang="ts" name="zm-upload" setup>
import { ElMessage } from 'element-plus'
import { pickFile, fileMax, isOffice } from '@/utils/File'
import { qiniuUpload, QNFile } from '@/utils/Qiniu'
import Process from './process'
const { colors, loading, showProgress, percentage, status, setProgress } = Process()
let props = defineProps({
	/** 上传的单个文件大小限制，默认最大200Mb */
	max: { default: fileMax },
	/** 上传的文件数量限制，默认最多选择200个 */
	limit: { default: 200 },
	/** 是否禁用上传 */
	disabled: { default: () => false },
	/** v-model的文件数组 [{ key: 文件名, hash: 文件hash }] */
	modelValue: { default: () => [] },
	/** 接受的文件类型，选择文件后校验，无配置则不校验类型，直接放行 */
	accept: { default: '' }
})

/** 是否显示上传按钮 */
let isShowUpload = computed(() => {
	let { limit, disabled } = props
	if (disabled) {
		return false
	} else {
		if (limit == 1 && files.length) {
			return false
		} else {
			return true
		}
	}
})

let emits = defineEmits(['change'])
/** 上传成功后的回调函数，index为, number 是用于替换文件的index， 传入-1用于追加文件到最后 */
function pickBackFn(index = -1, file: any) {
	return qiniuUpload({
		file,
		before() {
			setProgress(true)
		},
		succeed(info: QNFile) {
			if (index < 0) {
				files.push(info)
			} else {
				files[index] = info
			}
			emits('change', files)
			setProgress(false, true)
		},
		failed() {
			setProgress(false, false)
		}
	})
}
/** 上传文件 */
function pickHandler() {
	if (loading.value) {
		return
	}
	let { limit } = props
	if (limit != 1 && files.length >= limit) {
		return ElMessage.warning(`最多只能上传${limit}个文件！`)
	}
	let { accept, max } = props
	pickFile(pickBackFn.bind(null, -1), accept, max)
}
/** 点击文件名上传替换的文件 */
function repickHandler(index: number) {
	let { accept, max, disabled } = props
	if (loading.value || disabled) {
		return
	}
	pickFile(pickBackFn.bind(null, index), accept, max)
}

/** 文件列表 */
let files: any[] = reactive([])
watch(
	props.modelValue,
	(vals: any[]) => {
		files = vals
	},
	{
		immediate: true,
		deep: true
	}
)

/** 预览 */
function preview(row: any) {
	let url = row.url ? `${location.origin}${row.url}` : ''
	if (!url) {
		return ElMessage.error('文件信息缺失，无法预览~')
	}
	if (isOffice(url)) {
		window.open(`https://officeapps.glp168.com/op/view.aspx?src=${encodeURIComponent(url)}`)
	} else {
		window.open(url)
	}
}
/** 删除，没有调用删除接口 */
function delFile(index: number, row: any) {
	files.splice(index, 1)
	emits('change', files)
}
</script>
<style lang="scss">
.zm-upload {
	.accept {
		font-weight: normal;
	}
	.el-upload-list:empty {
		margin: 0;
	}
	.files-li + .files-li {
		margin-top: 10px;
	}
	.accept + .files-ul {
		padding-top: 12px;
	}
	.files-ul::empty {
		padding-top: 0;
	}
	.icon-chenggong:before {
		font-size: 15px;
		padding-left: 1px;
	}
}
</style>
