<template>
	<div class="system-serviceclass-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="ServiceClassDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="服务名称">
							<el-input v-model="state.ruleForm.stType" placeholder="请输入服务名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="服务描述">
							<el-input v-model="state.ruleForm.stInformation" placeholder="请输入服务描述" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="价格">
							<el-input v-model="state.ruleForm.stPrice" placeholder="请输入价格" clearable></el-input>
						</el-form-item>
					</el-col>
			
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit(state.ruleForm)" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemServiceClassDialog">
import { getService,updateServiceType,addServiceType,removeServiceType } from '/@/api/servetype';
import { reactive, ref } from 'vue';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const ServiceClassDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		stNo: Math.random(),
		stType: '',
		stInformation: '',
		stPrice: 0.99,
	},
	ServiceClassData: [] as RowServiceClassType[], // 服务类型数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 打开弹窗
const openDialog = (type: string, row: RowServiceClassType) => {
	if (type === 'edit') {
		// row.PatientLevel = ['vueNextAdmin'];
		// row.person = 'ljr';
		// row.phone = '12345678910';
		// row.email = 'vueNextAdmin@123.com';
		state.ruleForm = row;
		state.dialog.title = '修改服务类型';
		state.dialog.submitTxt = '修 改';

	} else {
		state.dialog.title = '新增服务类型';
		state.dialog.submitTxt = '新 增';
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	PatientDialogFormRef.value.resetFields();
		// });
	}
	state.dialog.isShowDialog = true;
	getMenuData();
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = (row: RowServiceClassType) => {
	if(state.dialog.title==='新增服务类型') {
		addServiceType(row);
	}else{
		updateServiceType(row);
	}
	closeDialog();
	emit('refresh');
	
};


// 初始化服务类型数据
const getMenuData = () => {
	getService().then(response=>{
		state.ServiceClassData = response.data;
	});
	
	state.ServiceClassData.push({
		stNo: Math.random(),
		stType: '院内陪联',
		stInformation: '院内帮助联系陪诊',
		stPrice: 200.00
		
	});
	state.ServiceClassData.push({
		stNo: Math.random(),
		stType: '全程陪诊',
		stInformation: '全程陪护诊疗',
		stPrice: 300.00
			
	});
	state.ServiceClassData.push({
		stNo: Math.random(),
		stType: '尊享陪诊',
		stInformation: '尊享陪诊的一系列服务',
		stPrice: 500.00
			
	});
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>
