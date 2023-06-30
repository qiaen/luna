<template>
	<section>
		<sline title="七牛文件上传" size="big">
			<template v-slot:descript><a class="fsize12 fcorg" target="_blank" href="https://s.qiniu.com/b2mM3e">https://s.qiniu.com/b2mM3e</a></template>
		</sline>
		<ul class="list list-2 pt20">
			<li>
				<label class="label">限制一个文件（可编辑）</label>
				<span class="span">
					<zm-upload accept="image,zip,pdf" v-model="files1" :limit="1">
						<template #default="scope">
							<el-button type="primary" size="small" :disabled="scope.loading" :icon="Promotion" :loading="scope.loading">上传</el-button>
						</template>
					</zm-upload>
				</span>
			</li>
			<li>
				<label class="label">限制一个文件（禁止编辑）</label>
				<span class="span">
					<zm-upload accept="image,zip,pdf" v-model="files1" :limit="1" :disabled="true">
						<template #default="scope">
							<el-button type="primary" size="small" :disabled="scope.loading">上 传</el-button>
						</template>
					</zm-upload>
				</span>
			</li>
		</ul>
		<ul class="list list-2">
			<li>
				<label class="label">模板文件（可以编辑）</label>
				<span class="span">
					<zm-upload accept="excel,zip,word,pdf" v-model="files3" :limit="5" :max="5">
						<template #default="scope">
							<el-button type="primary" size="small" :loading="scope.loading" :icon="Promotion">上传</el-button>
						</template>
					</zm-upload>
				</span>
			</li>
			<li>
				<label class="label">模板文件（只能查看）</label>
				<span class="span">
					<zm-upload accept="xls,zip,jpg" v-model="files3" :disabled="true" />
				</span>
			</li>
			<li>
				<label class="label">上传不限制类型</label>
				<span class="span">
					<zm-upload v-model="files4">
						<template #default="scope">
							<el-button type="success" size="small" :loading="scope.loading" :icon="Promotion">自定义按钮</el-button>
						</template>
					</zm-upload>
				</span>
			</li>
			
		</ul>
		<div class="pt20 pl10">
			<el-button @click="print" type="primary" class="iconfont icon-qiniu"><span class="pl10">打印</span></el-button>
		</div>
	</section>
</template>
<script lang="ts" setup>
import { Promotion } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
let files1 = reactive([
	{
		key: '你可以点击名字替换我.png',
		url: '/file/zssc@2x.png',
		hash: '100086',
	}
])
let files3 = reactive([
	{
		key: '如果文件名称很长怎么显示 - Husa - Hadnc - Asndasd - Kadsds - Jadnan - Asndasd - Kadsds - Jadnan.png',
		url: '/file/s34503697.jpg',
		hash: '100086'
	},
	{
		key: '测试excel文件在线预览.xlsx',
		url: '/file/%E6%B5%8B%E8%AF%95excel%E9%A2%84%E8%A7%88.xlsx',
		hash: '100089'
	}
])
let files4 = reactive([])
function print(vals: any) {
	console.log(files1)
	console.log(files3)
	console.log(files4)
	ElMessage.info(JSON.stringify(files1))
	ElMessage.info(JSON.stringify(files3))
	ElMessage.info(JSON.stringify(files4))
}
</script>
<style lang="scss">
/** 默认每行显示3个 */
.list {
	justify-content: start;
	flex-wrap: wrap;
	display: flex;
	// align-items: center;
	& > li {
		box-sizing: border-box;
		display: flex;
		align-items: baseline;
		width: 33.333%;
		border-left: 1px solid var(--border-color-grey);
		font-size: 14px;
		padding: 10px;
		color: var(--el-text-color-regular);
		.label {
			font-weight: 400;
			padding-right: 12px;
			color: var(--text-color-grey);
		}
		.span {
			flex: 1;
			font-weight: 700;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
.list-1 {
	& > li {
		width: 100% !important;
	}
}
.list-2 {
	& > li {
		width: 50% !important;
	}
}
.list-4 {
	& > li {
		width: 25% !important;
	}
}
.list-5 {
	& > li {
		width: 20% !important;
	}
}
.list-6 {
	& > li {
		width: 16.6666% !important;
	}
}
.list-8 {
	& > li {
		width: 12.5% !important;
	}
}
.p-ul {
	line-height: 2;
	li {
		list-style-type: decimal;
	}
}
</style>
