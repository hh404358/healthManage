<template>
	<div class="system-Service-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-Service-search mb15">
				<!-- <el-input size="default" placeholder="请输入病人名称" style="max-width: 180px"> </el-input> -->
				<!-- <el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button> -->
			</div>
			<el-table
				:data="state.tableData.data"
				v-loading="state.tableData.loading"
				style="width: 100%"
				
				default-expand-all
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.$index }}
					</template>
				</el-table-column>  
                <el-table-column prop="stType" label="服务类型" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="stPrice" label="服务价格" show-overflow-tooltip></el-table-column>
				<el-table-column prop="stInformation" label="服务信息" show-overflow-tooltip></el-table-column>
				<el-table-column prop="eName" label="陪诊师姓名" show-overflow-tooltip></el-table-column>
				<el-table-column prop="pName" label="病人姓名" show-overflow-tooltip></el-table-column>
				<el-table-column label="服务是否完成" show-overflow-tooltip>
               <template #default="scope">
            {{ scope.row.isFinish ? '否' : '是' }}
          </template>
        </el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="aonTabelRowDel(scope.row)" v-if="isadmin">删除</el-button>
                        <el-button size="small" text type="primary" @click="eonTabelRowDel(scope.row)" v-if="isescort">完成</el-button>
                        <el-button size="small" text type="primary" @click="ponTabelRowDel(scope.row)" v-if="ispatient">取消</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- <ServiceDialog ref="ServiceDialogRef" @refresh="getTableData()" /> -->
	</div>
</template>

<script setup lang="ts" name="systemService">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Session } from '/@/utils/storage';
import { cancelService, finish, getEscortServices, getService, getServices, removeService } from '/@/api/escortservice';
import { finished } from 'stream';
const roleSign = Session.get('roleSign');
const isadmin = Session.get('roleSign')=== 'admin';
const isescort = Session.get('roleSign')=== 'physician';
const ispatient = Session.get('roleSign')=== 'patient';

const state = reactive<SysServiceState>({
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

// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
	state.tableData.data = [];
	if(roleSign==='admin'){
		getService().then(response=>{
		state.tableData.data=response.data;
	});
	}else if(roleSign==='escort'){
		getEscortServices().then(response=>{
		state.tableData.data=response.data;
	});
     }else if(roleSign==='patient'){
		getServices().then(response=>{
		state.tableData.data=response.data;
	});
	}
	state.tableData.data.push({
		stType:'院内陪联',
		stInformation: '院内帮助联系陪诊',
		stPrice: 200.00,
		eName:'黄小明',
		pName:'张三',
		isFinish:'否',
		stNo:1,
		pNo:1,
		eNo:1,
		
	});
	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};


// 删除当前行
const aonTabelRowDel = (row: RowServiceType) => {
	ElMessageBox.confirm(`此操作将永久删除记录, 是否继续?`, '提示', {
		confirmButtonText: '删除',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			removeService(row.eNo,row.pNo,row.stNo);
			getTableData();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

//陪诊师完成服务
const eonTabelRowDel = (row: RowServiceType) => {
	ElMessageBox.confirm(`此操作将删除此记录, 是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
            finish(row.stNo,row.pNo);
			getTableData();
			ElMessage.success('已完成');
		})
		.catch(() => {});
};

//病人取消服务
const ponTabelRowDel = (row: RowServiceType) => {
	ElMessageBox.confirm(`此操作将取消该服务记录, 是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			cancelService(row.eNo,row.stNo);
			getTableData();
			ElMessage.success('取消成功');
		})
		.catch(() => {});
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
