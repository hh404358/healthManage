<template>
	<div class="system-Patient-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-Patient-search mb15">
				<el-input size="default" placeholder="请输入病人名称" style="max-width: 180px" v-model="name"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click="getByName(name)">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddPatient('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增病人
				</el-button>
			</div>
			<el-table
				:data="state.tableData.data"
				v-loading="state.tableData.loading"
				style="width: 100%"
				row-key="id"
				default-expand-all
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column prop="pName" label="名称" show-overflow-tooltip> </el-table-column>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.$index }}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="病人状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="pId" label="身份证号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="pBirthday" label="出生日期" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phonenumber" label="电话号码" show-overflow-tooltip></el-table-column>
				<el-table-column prop="pCity" label="所在城市" show-overflow-tooltip></el-table-column>
				<el-table-column prop="pSex" label="性別" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenAddPatient('add')">新增</el-button>
						<el-button size="small" text type="primary" @click="onOpenEditPatient('edit', scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<PatientDialog ref="PatientDialogRef" @refresh="getTableData()" />

	</div>
</template>

<script setup lang="ts" name="systemPatient">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { delPatient, listPatient ,getPatientByName} from '/@/api/patient';



// 引入组件
const PatientDialog = defineAsyncComponent(() => import('/@/views/system/patient/dialog.vue'));

// 定义变量内容
const PatientDialogRef = ref();
const name = ref('');
const state = reactive<SysPatientState>({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
		},
	},
});
const getByName = (name:string) =>{
	getPatientByName(name).then((response)=>{
		state.tableData.data = response.data;
	});
}
// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
	state.tableData.data = [];
	listPatient().then(response=>{
		state.tableData.data=response.data;
	});
	state.tableData.data.push({
		password:'123',
		status:true,
		phonenumber:'12345678921',
		pNo:Math.random(),
		pName:'admin1',
		pSex:'男',
		pBirthday:new Date().toLocaleString(),
		pId:'35077700106243212',
		pCity:'厦门',

	});
	state.tableData.data.push({
		password:'123',
		status:true,
		phonenumber:'12345678921',
		pNo:Math.random(),
		pName:'user1',
		pSex:'男',
		pBirthday:new Date().toLocaleString(),
		pId:'35077700106243212',
		pCity:'厦门',

			
	});
	state.tableData.data.push({
		
		password:'123',
		status:true,
		phonenumber:'12345678921',
		pNo:Math.random(),
		pName:'user2',
		pSex:'男',
		pBirthday:new Date().toLocaleString(),
		pId:'35077700106243212',
		pCity:'厦门',
			
	});
	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增菜单弹窗
const onOpenAddPatient = (type: string) => {
	PatientDialogRef.value.openDialog(type);
};
// 打开编辑菜单弹窗
const onOpenEditPatient = (type: string, row: PatientTreeType) => {
	PatientDialogRef.value.openDialog(type, row);
};
// 删除当前行
const onTabelRowDel = (row: PatientTreeType) => {
	ElMessageBox.confirm(`此操作将永久删除病人：${row.pName}, 是否继续?`, '提示', {
		confirmButtonText: '删除',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			delPatient(row.pNo);
			getTableData();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
