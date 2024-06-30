<template>
	<div class="system-physician-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="PhysicianDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="state.ruleForm.eNo" :min="0" :max="999" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="陪诊师名称">
							<el-input v-model="state.ruleForm.eName" placeholder="请输入陪诊师名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="出生日期">
							<el-date-picker v-model="state.ruleForm.eBirthday" placeholder="请选择出生日期"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="身份证">
							<el-input v-model="state.ruleForm.eId" placeholder="请输入身份证号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号">
							<el-input v-model="state.ruleForm.phonenumber" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="所在城市">
							<el-input v-model="state.ruleForm.eCity" placeholder="请输入所在城市" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="陪诊师状态">
							<el-switch v-model="state.ruleForm.status" inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
				    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否是医护人员">
							<el-switch v-model="state.ruleForm.isCarer" inline-prompt active-text="是" inactive-text="否"></el-switch>
						</el-form-item>
					</el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="服务类型">
				<el-checkbox-group v-model="state.ruleForm.eServiceType">
					<el-checkbox
						v-for="item in state1.tableData.data"
						:label="item.stType"
						:key="item.stNo"
					>
						{{ item.stType }}
					</el-checkbox>
				</el-checkbox-group>
				<p>已选择：</p>
				<ul>
				<li v-for="option in state.ruleForm.eServiceType" :key="option">{{ option }}</li>
				</ul>
                <el-input v-model="state.ruleForm.eServiceType" placeholder="请输入服务类型" clearable></el-input>
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

<script setup lang="ts" name="systemPhysicianDialog">
import { getEscorts,updateEscort,removeEscort,addEscort, listEscorts } from '/@/api/escort';
import { onMounted, reactive, ref } from 'vue';
import {listServiceType} from '/@/api/servetype';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const PhysicianDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		eName: '',
		eBirthday: new Date().toLocaleString(),
		status: true,
		eId: '',
		phonenumber: '',
		eCity:'',
		eSex: '',
		password: '',
		eNo: Math.random(),
        isCarer: true,
        //eServiceTypeNo: [],
		eServiceType:[]

	},
	// EscortData: [] as physicianType[], // 陪诊师数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
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
const state1 = reactive<SysServiceClassState>({
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

// 打开弹窗
const openDialog = (type: string, row: physicianType) => {
	if (type === 'edit') {
		// row.PatientLevel = ['vueNextAdmin'];
		// row.person = 'ljr';
		// row.phone = '12345678910';
		// row.email = 'vueNextAdmin@123.com';
		state.ruleForm = row;
		state.dialog.title = '修改陪诊师';
		state.dialog.submitTxt = '修 改';

	} else {
		state.dialog.title = '新增陪诊师';
		state.dialog.submitTxt = '新 增';
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	PatientDialogFormRef.value.resetFields();
		// });
	}
	state.dialog.isShowDialog = true;
	// getMenuData();
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
const onSubmit = (row:object) => {
	if(state.dialog.title==='新增陪诊师') {
		addEscort(row);
	}else{
		updateEscort(row);
	}
	closeDialog();
	emit('refresh');
	
};
const getServiceType =()=>{
	state1.tableData.data = [];
	listServiceType().then(response=>{
		state1.tableData.data = response.data;
	})
}
onMounted(() => {
	getServiceType();
});

// // 初始化陪诊师数据
// const getMenuData = () => {
// 	listEscorts().then(response=>{
// 		state.EscortData = response;
// 	})
// 	state.EscortData.push({
// 		eNo: Math.random(),
// 		eName: 'vue-admin',
// 		status: true,
// 		// sort: Math.random(),
// 		eId: '35077700106243212',
// 		eBirthday: new Date().toLocaleString(),
// 		phonenumber: '12345678921',
// 		eCity: '厦门',
// 		eSex: '男',
// 		password: '123',
//         isCarer: true,
//         eServiceType: '院内陪联',
// 		// roleSign: '陪诊师'
		
// 	});
// 	state.EscortData.push({
// 		eNo: Math.random(),
// 		eName: 'ljr',
// 		status: true,
// 		// sort: Math.random(),
// 		eId: '35077700106243211',
// 		eBirthday: new Date().toLocaleString(),
// 		phonenumber: '12345678911',
// 		eCity: '南平',
// 		eSex: '女',
// 		password: '123',
//         isCarer: true,
//         eServiceType: '全程陪诊',
// 		// roleSign: '陪诊师'
			
// 	});
// 	state.EscortData.push({
// 		eNo: Math.random(),
// 		eName: 'hahaha',
// 		status: true,
// 		// sort: Math.random(),
// 		eId: '35077700106113212',
// 		eBirthday: new Date().toLocaleString(),
// 		phonenumber: '12345678121',
// 		eCity: '厦门',
// 		eSex: '男',
// 		password: '123',
//         isCarer: true,
//         eServiceType: '尊享陪诊',
// 		// roleSign: '陪诊师'
			
// 	});
// };

// 暴露变量
defineExpose({
	openDialog,
});
</script>
