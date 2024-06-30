<template>
	<div class="system-Patient-container layout-padding" >
		<el-card shadow="hover" class="layout-padding-auto" v-if="!alltype">
			<div class="system-Patient-search mb15">
				<!-- <el-input size="default" placeholder="请输入服务类型名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button> -->
				<el-button size="default" type="success" class="ml10" @click="onOpenAddServiceClass('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增服务类型
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
			 <el-table-column prop="stNo" label="服务编号" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="stType" label="服务类型" show-overflow-tooltip> </el-table-column>
				<!-- <el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.$index }}
					</template>
				</el-table-column> -->
				<el-table-column prop="stInformation" label="服务描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="stPrice" label="价格" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenAddServiceClass('add')" v-if="isadmin">新增</el-button>
						<el-button size="small" text type="primary" @click="onOpenEditServiceClass('edit', scope.row)" v-if="isadmin">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)" v-if="isadmin">删除</el-button>
						<el-button size="small" text type="primary" @click="book()" >预约</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<ServiceClassDialog ref="ServiceClassDialogRef" @refresh="getTableData()" />

		<el-card shadow="hover" class="layout-padding-auto" v-if="alltype">
			<el-table
				:data="state1.tableData.data"
				v-loading="state1.tableData.loading"
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
        <!-- <el-table-column prop="type" label="服务类型" show-overflow-tooltip></el-table-column> -->
				
			</el-table>
		</el-card>
		<physicianDialog ref="PhysicianDialogRef" @refresh="getTableData()" />
	</div>

</template>

<script setup lang="ts" name="systemServiceClass">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Session } from '/@/utils/storage';
import { getService, listServiceType, removeServiceType } from '/@/api/servetype';
import { listAllService } from '/@/api/escortservice';
import { getEscorts } from '/@/api/escort';

const roleSign = Session.get('roleSign');
const isadmin = Session.get('roleSign')=== 'admin';
const isescort = Session.get('roleSign')=== 'physician';
const ispatient = Session.get('roleSign')=== 'patient';
// 引入组件
const ServiceClassDialog = defineAsyncComponent(() => import('/@/views/system/servetype/dialog.vue'));
let alltype = true; 

// 定义变量内容
const ServiceClassDialogRef = ref();
const state = reactive<SysServiceClassState>({
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

// 定义变量内容
const PhysicianDialogRef = ref();
const state1 = reactive<SysPhysicianState>({
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
const book = () =>{
	alltype = !alltype;
}
// 初始化表格数据
const getTableData = () => {

	state.tableData.loading = true;
	state.tableData.data = [];
	if(alltype){
		listServiceType().then(response=>{
		state.tableData.data = response.data;
		})
	}else{
		if(roleSign==='admin'){
		getService().then(response=>{
		state1.tableData.data=response.data;
	});
	}
	else if(roleSign==='patient'){
		listAllService().then(response=>{
		state1.tableData.data=response.data;
	});
	}

	}
	
	state.tableData.data.push({
		stNo: 1,
		stType: '院内陪联',
		stInformation: '院内帮助联系陪诊',
		stPrice: 200.00
		
	});
	state.tableData.data.push({
		stNo: 2,
		stType: '全程陪诊',
		stInformation: '全程陪护诊疗',
		stPrice: 300.00
		
	});
	state.tableData.data.push({
		stNo: 3,
		stType: '尊享陪诊',
		stInformation: '尊享陪诊的一系列服务',
		stPrice: 500.00
		
	});
	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增菜单弹窗
const onOpenAddServiceClass = (type: string) => {
	ServiceClassDialogRef.value.openDialog(type);
};
// 打开编辑菜单弹窗
const onOpenEditServiceClass = (type: string, row: RowServiceClassType) => {
	ServiceClassDialogRef.value.openDialog(type, row);
};
// 删除当前行
const onTabelRowDel = (row: RowServiceClassType) => {
	ElMessageBox.confirm(`此操作将永久删除服务类型：${row.stType}, 是否继续?`, '提示', {
		confirmButtonText: '删除',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			removeServiceType(row.stNo);
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
