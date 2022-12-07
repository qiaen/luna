<!-- 带折叠展开筛选项组件 -->
<template>
	<div class="flex-filter" ref="refBox">
		<el-form :inline="true" class="zm-filter" ref="refForm" :model="model" :class="'zm-filter-' + size">
			<!-- 直接显示出来的部分 -->
			<span ref="refShow">
				<slot name="show"></slot>
			</span>
			<span ref="refBtn">
				<el-form-item class="filter-btns">
					<el-button class="filter-wrap" v-if="hasHide" @click="setFold" type="primary" link>
						{{ btnConf.label }}
						<el-icon class="pl5"><component :is="btnConf.icon"></component></el-icon>
					</el-button>
					<el-button type="primary" plain @click="rest(refForm)" :icon="Refresh">重置</el-button>
					<!-- 按钮区域 -->
					<slot name="button"></slot>
				</el-form-item>
			</span>
		</el-form>
	</div>
</template>
<script lang="ts" name="filters" setup>
import { ref, computed, useSlots } from 'vue'
import { ArrowUp, ArrowDown, Refresh } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'
import Storage from '@/utils/Storage'
import Store from '@/store'
const { storeToRefs, useLayout } = Store
let layout = useLayout()
let { isCollapse } = storeToRefs(layout)

defineProps({
	/** 尺寸大小 */
	size: { default: '' },
	/** 参数对象 */
	model: { type: Object }
})
/** 是否展示所有的搜索项 */
let showall = ref(!!Storage.get('fold'))
let emit = defineEmits(['reset'])
/** 1.重置搜索，
 * 2.重新计算哪些按钮显示出来，
 * */
function rest(el?: FormInstance) {
	if (!el) {
		return
	}
	el.resetFields()
	emit('reset')
}
const resizeFn = () => {
	requestAnimationFrame(() => {
		setFilter()
	})
}
onMounted(() => {
	setFilter()
	window.addEventListener('resize', resizeFn)
})
onActivated(() => {
	showall.value = !!Storage.get('fold')
	setFilter()
	window.addEventListener('resize', resizeFn)
})
onDeactivated(() => {
	window.removeEventListener('resize', resizeFn)
})
onUnmounted(() => {
	window.removeEventListener('resize', resizeFn)
})
/** 菜单折叠/收起 时重新计算 */
watch(isCollapse, (val: boolean) => {
	requestAnimationFrame(() => {
		setFilter()
	})
})
/** 搜索条件的壳子 dom */
let refShow: any = ref(null)
/** form表单 dom */
let refBox: any = ref(null)
/** 按钮的壳子 dom */
let refBtn: any = ref(null)
/** 是否需要显示展开按钮 */
let hasHide = ref(true)
/** 根据页面宽度，自动调整要展示出来的搜索条件 */
function setFilter() {
	/** 这里先设置要展示按钮，且展示所有的搜索条件，是为了计算宽度 */
	hasHide.value = true
	let allWidth = 0
	let h = false
	/** 外壳宽度 */
	let boxWidth = refBox.value.querySelector('.el-form').offsetWidth
	/** 所有按钮的宽度 */
	let btnWidth = refBtn.value.offsetWidth
	/** 所有搜索调价 ，循环计算累计宽度，且设置是否显示出来 */
	let fi = refShow.value.querySelectorAll('.el-form-item')
	for (let i of fi) {
		i.style.display = 'inline-flex'
		/** +12，12是向右margin距离 */
		allWidth += i.offsetWidth + 12
		if (boxWidth - btnWidth >= allWidth) {
			i.style.display = 'inline-flex'
		} else {
			/** 不想看全部，才会去把超出的搜索项隐藏 */
			if (!showall.value) {
				i.style.display = 'none'
			}
			h = true
		}
	}
	if (!h) {
		hasHide.value = false
	}
}
const refForm = ref<FormInstance>()
const slots = useSlots()

/** 设置展开信息，并缓存 */
function setFold() {
	showall.value = !showall.value
	Storage.set('fold', showall.value ? 1 : '')
	setFilter()
}
let btnConf = computed(() => {
	/** 如果没有需要自动展开的，则不显示展开收起按钮 */
	let show = slots.auto
	if (showall.value) {
		return {
			icon: ArrowUp,
			label: '收起',
			show
		}
	} else {
		return {
			icon: ArrowDown,
			label: '展开',
			show
		}
	}
})
</script>
<style lang="scss">
.zm-filter {
	&-small {
		.el-button {
			padding-left: 12px;
			padding-right: 12px;
		}
		.el-form-item:last-child {
			margin-right: 0px;
		}
		.filter-wrap {
			padding-left: 6px;
			padding-right: 6px;
		}
	}
	.el-form-item {
		margin-bottom: 15px;
		margin-right: 12px;
	}
	.el-form {
		& > {
			.el-form-item {
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
	.filter-show > .el-form-item:last-child {
		margin-right: 0;
	}
	.filter-btns {
		margin-right: 0;
	}
}
</style>
