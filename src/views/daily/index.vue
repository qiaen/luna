<template>
	<section class="json bgfff">
		<div class="scroll-y">
			<h3>关于作者 Author</h3>
			<ul>
				<li><strong>洪亮：</strong>热爱前端，不爱折腾</li>
				<li><strong>QQ：</strong>762366705</li>
				<li><strong>Email：</strong>762366705@qq.com</li>
				<li>
					<strong>个人网站：</strong>
					<a target="blank" class="fcblue" href="http://diumx.com">diumx.com</a>
				</li>
				<li>
					<strong>Github：</strong>
					<a target="blank" class="fcblue" href="https://github.com/qiaen">github.com/qiaen</a>
				</li>
				<li>
					<strong>Gitlab：</strong>
					<a target="blank" class="fcblue" href="https://gitlab.com/qiaen">gitlab.com/qiaen</a>
				</li>
			</ul>
			<h3>花木兰模版</h3>
			<ul>
				<li><strong>动态菜单：</strong>在服务端配置菜单路由，以及菜单指定的页面文件</li>
				<li><strong>菜单权限：</strong>可以给不同用户指定不同的菜单，菜单权限，使用路由守卫在跳转时校验权限提示404或者403</li>
				<li><strong>按钮权限：</strong>服务器对于不同的功能，给出不同的权限码，前端通过v-permission指令搞定是否有权限</li>
				<li><strong>用到：</strong>vite，vue， element ui， vuex， vue-router， iconfont</li>
			</ul>
			<h3>Axios</h3>
			<ul>
				<li><strong>request：</strong>axios配置中，统一对request添加前置参数等</li>
				<li><strong>response：</strong>对错误信息统一过滤，若未登录，直接跳转登录页</li>
			</ul>
			<h3>Vuex，keep-alive，useMixins</h3>
			<ul>
				<li><strong>状态管理：</strong>使用Vuex，关键字mapGetters，this.$store.dispatch等</li>
				<li><strong>keep-alive：</strong>可对历史记录做现场保留，避免回退重新加载，减少接口调用，关键字keep-alive :include</li>
				<li><strong>useMixins：</strong>重复，使用量大的data，methods等采用minins混入，直接使用，避免重复定义</li>
			</ul>
			<h3>其他功能</h3>
			<ul>
				<li><strong>request：</strong>echarts图表，vue-split分割等可以自助引用，做到只专注模版框架功能</li>
			</ul>
			<h3>好用的功能1</h3>
			<div class="flex">
				<el-select v-model="username">
					<el-option value="Micle">Micle</el-option>
					<el-option value="Lili">Lili</el-option>
				</el-select>
				<div class="pl5 fxmiddle">{{ list }}</div>
			</div>
			<qia-table :data="tableData" ref="refGlp" custom-key-name="dataCreate">
				<el-table-column type="selection" forbid></el-table-column>
                <el-table-column label="自定义">
                    <!-- <template slot="header"> <i class="el-icon-more"></i>自定义</template> -->
                    <template #default="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="80"> </el-table-column>
                <el-table-column prop="date" label="日期" width="110"> </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="address" min-width="180" show-overflow-tooltip label="地址"> </el-table-column>
                <el-table-column label="设置" min-width="90" forbid>
                    <template #default="scope">
                        {{ scope.row.age >= 18 ? '成年' : '少年' }}
                    </template>
                </el-table-column>
			</qia-table>
		</div>
	</section>
</template>
<script lang="ts" setup>
import { ref, Ref } from 'vue'
import userQuery from './useQuery'
let { username, list } = userQuery()
let tableData: Ref<any[]> = ref([
	{
		date: '2016-05-02',
		age: 12,
		name: '张三',
		address: '上海市普陀区金沙江路 1518 弄'
	},
	{
		date: '2016-05-04',
		age: 14,
		name: '王小虎',
		address: '上海市普陀区金沙江路 1517 弄'
	},
	{
		date: '2016-05-01',
		age: 21,
		name: '李四',
		address: '上海市普陀区金沙江路 1519 弄'
	},
	{
		date: '2016-05-03',
		age: 81,
		name: '王文渊',
		address: '上海市普陀区金沙江路 1516 弄'
	}
])
</script>
<style lang="scss">
.json {
	.cards {
		margin: 30px 0 70px;
	}
	.card {
		background: #fbfcfd;
		height: 204px;
		text-align: center;
	}
	.card img {
		margin: 40px auto 25px;
		width: 80px;
		height: 80px;
	}
	.card h4 {
		font-size: 18px;
		color: #1f2d3d;
		font-weight: 400;
		margin: 0;
	}
	.card span {
		font-size: 14px;
		color: #99a9bf;
	}
	h3 {
		font-size: 22px;
		font-weight: 400;
		margin: 0 0 30px;
		color: #1f2d3d;
	}
	.scroll-y>ul {
		margin-bottom: 50px;
		padding-left: 0;
		li {
			font-size: 14px;
			margin-bottom: 10px;
			color: #99a9bf;
			list-style: none;
			strong {
				color: #5e6d82;
				font-weight: 400;
			}
		}
	}
}
</style>
