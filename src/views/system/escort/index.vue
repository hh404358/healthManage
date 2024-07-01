<template>
	<div class="system-Physician-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-Physician-search mb15">
				<el-input size="default" placeholder="请输入城市名称" style="max-width: 180px" v-model="city"> </el-input>
                <el-input size="default" placeholder="请输入服务名称" style="max-width: 180px" v-model="type"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click="getByCityAndeS(city,type)" >
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddPhysician('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增陪诊师
				</el-button>
			</div>
			<el-table
				:data="state.tableData.data"
				v-loading="state.tableData.loading"
				style="width: 100%"
				row-key="eNo"
				default-expand-all
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column prop="eName" label="名称" show-overflow-tooltip> </el-table-column>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.$index }}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="陪诊师状态" show-overflow-tooltip >
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="eId" label="身份证号" show-overflow-tooltip v-if="isadmin"></el-table-column>
				<el-table-column prop="eBirthday" label="出生日期" show-overflow-tooltip v-if="isadmin"></el-table-column>
				<el-table-column prop="phonenumber" label="电话号码" show-overflow-tooltip></el-table-column>
				<el-table-column prop="eCity" label="所在城市" show-overflow-tooltip></el-table-column>
				<el-table-column prop="eSex" label="性別" show-overflow-tooltip></el-table-column>
                <el-table-column label="是否医护人员" show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.isCarer ? '是' : '否' }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="eServiceType" label="服务类型" show-overflow-tooltip></el-table-column> -->
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenAddPhysician('add')" v-if="isadmin">新增</el-button>
						<el-button size="small" text type="primary" @click="onOpenEditPhysician('edit', scope.row)" v-if="isadmin">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)" v-if="isadmin">删除</el-button>
						<!-- <el-button size="small" text type="primary" @click="ponTabelRowDel(scope.row)" v-if="ispatient">预约</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<physicianDialog ref="PhysicianDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemPhysician">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { removeEscort, listEscorts ,getEscorts} from '/@/api/escort';
import { Session } from '/@/utils/storage';

const isadmin = Session.get('roleSign')=== 'admin';
const isescort = Session.get('roleSign')=== 'physician';
const ispatient = Session.get('roleSign')=== 'patient';

//查询
const getByCityAndeS = (eCity:string,eServiceType:string) =>{
	getEscorts(eCity,eServiceType).then((response)=>{
		state.tableData.data = response.data;
	});
}
// 引入组件
const physicianDialog = defineAsyncComponent(() => import('/@/views/system/escort/dialog.vue'));

// 定义变量内容
const PhysicianDialogRef = ref();
const state = reactive<SysPhysicianState>({
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
const city =ref('');
const type=ref('');

// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
	state.tableData.data = [];
	listEscorts().then(response=>{
		state.tableData.data=response.data;
	});
	state.tableData.data.push({
        eNo: Math.random(),
		eName: 'vue-admin',
		status: true,
		// sort: Math.random(),
		eId: '35077700106243212',
		eBirthday: new Date().toLocaleString(),
		phonenumber: '12345678921',
		eCity: '厦门',
		eSex: '男',
		password: '123',
        isCarer: '是',
        eServiceType: '院内陪联',
		// roleSign: '陪诊师'
		
	});
    state.tableData.data.push({
        eNo: Math.random(),
		eName: 'ljr',
		status: true,
		// sort: Math.random(),
		eId: '35077700106243211',
		eBirthday: new Date().toLocaleString(),
		phonenumber: '12345678911',
		eCity: '南平',
		eSex: '女',
		password: '123',
        isCarer: '是',
        eServiceType: '全程陪诊',
		// roleSign: '陪诊师'
		
	});
    state.tableData.data.push({
		eNo: Math.random(),
		eName: 'hahaha',
		status: true,
		// sort: Math.random(),
		eId: '35077700106113212',
		eBirthday: new Date().toLocaleString(),
		phonenumber: '12345678121',
		eCity: '厦门',
		eSex: '男',
		password: '123',
        isCarer: '是',
        eServiceType: '尊享陪诊',
		// roleSign: '陪诊师'
		
	});
	
	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增菜单弹窗
const onOpenAddPhysician = (type: string) => {
	PhysicianDialogRef.value.openDialog(type);
};
// 打开编辑菜单弹窗
const onOpenEditPhysician = (type: string, row: physicianType) => {
	PhysicianDialogRef.value.openDialog(type, row);
};
// 删除当前行
const onTabelRowDel = (row: physicianType) => {
	ElMessageBox.confirm(`此操作将永久删除陪诊师：${row.eName}, 是否继续?`, '提示', {
		confirmButtonText: '删除',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			getTableData();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

// const ponTabelRowDel = (row: physicianType) => {
// 	ElMessageBox.confirm(`确认预约该陪诊师吗：${row.eNo}, 是否继续?`, '提示', {
// 		confirmButtonText: '确认',
// 		cancelButtonText: '取消',
// 		type: 'warning',
// 	})
// 		.then(() => {
// 			removeEscort(row.eNo);
// 			getTableData();
// 			ElMessage.success('预约成功');
// 		})
// 		.catch(() => {});
// };

// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
