<template>
	<div class="system-patient-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="PatientDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="病人名称">
							<el-input v-model="state.ruleForm.pName" placeholder="请输入病人名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="出生日期">
							<el-calender v-model="state.ruleForm.pBirthdate" placeholder="请选择出生日期"></el-calender>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="身份证">
							<el-input v-model="state.ruleForm.pId" placeholder="请输入身份证号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号">
							<el-input v-model="state.ruleForm.phonenumber" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="所在城市">
							<el-input v-model="state.ruleForm.pCity" placeholder="请输入所在城市" clearable></el-input>
						</el-form-item>
					</el-col>
					
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="病人状态">
							<el-switch v-model="state.ruleForm.status" inline-prompt active-text="启" inactive-text="禁"></el-switch>
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

<script setup lang="ts" name="systemPatientDialog">
import { listPatient,getPatientByName,updatePatient,delPatient,addPatient } from '/@/api/patient';
import { reactive, ref } from 'vue';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const PatientDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		pName: '',
		pBirthdate: new Date().toLocaleString(),
		status: true,
		PId: '',
		phone: '',
		pCity:'',
		pSex: '',
		password: '',
		PNo: Math.random(),
		roleSign:'病人'
	},
	PatientData: [] as RowUserType[], // 病人数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 打开弹窗
const openDialog = (type: string, row: RowUserType) => {
	if (type === 'edit') {
		// row.PatientLevel = ['vueNextAdmin'];
		// row.person = 'ljr';
		// row.phone = '12345678910';
		// row.email = 'vueNextAdmin@123.com';
		state.ruleForm = row;
		state.dialog.title = '修改病人';
		state.dialog.submitTxt = '修 改';

	} else {
		state.dialog.title = '新增病人';
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
const onSubmit = (row: RowUserType) => {
	if(state.dialog.title==='新增病人') {
		addPatient(row);
	}else{
		updatePatient(row);
	}
	closeDialog();
	emit('refresh');
	
};
// 初始化病人数据
const getMenuData = () => {
	// listPatient().then((response:object)=>{
	// 	state.PatientData = response;
	// });
	
	state.PatientData.push({
		id: Math.random(),
		password:'123',
		status:true,
		phonenumber:'12345678921',
		pNo:Math.random(),
		pName:'admin1',
		pSex:'男',
		pBirthday:new Date().toLocaleString(),
		pId:'35077700106243212',
		pCity:'厦门',
		roleSign: '病人'		,
		
	});
	state.PatientData.push({
		id: Math.random(),
		password:'123',
		status:true,
		phonenumber:'12345678921',
		pNo:Math.random(),
		pName:'admin1',
		pSex:'男',
		pBirthday:new Date().toLocaleString(),
		pId:'35077700106243212',
		pCity:'厦门',
		roleSign: '病人'		,
			
	});
	state.PatientData.push({
		id: Math.random(),
		password:'123',
		status:true,
		phonenumber:'12345678921',
		pNo:Math.random(),
		pName:'admin1',
		pSex:'男',
		pBirthday:new Date().toLocaleString(),
		pId:'35077700106243212',
		pCity:'厦门',
		roleSign: '病人'		,
			
	});
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>
