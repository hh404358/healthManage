<template>
	<div class="scroll">
		<el-select placeholder="请选择身份" v-model="state.roleSign" v-if="state.roleSign ===''">
				<el-option v-for="item in state.roles"
				:label = item
				:value = item
				:key = item.indexOf >
				</el-option>
		</el-select>
		<!-- patient -->
		<el-form size="large" class="login-content-form" v-if="state.roleSign === state.roles[0]">
		<el-form-item class="login-animation1">
			<el-input text :placeholder="$t('message.register.Name')" v-model="state.patientruleform.pName" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
			<el-alert
                        v-show="state.namecheck"
                        title="用户名不能为空"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
		</el-form-item>
        <el-form-item class="login-animation2">
			<el-input text :placeholder="$t('message.register.phonenumber')" v-model="state.patientruleform.phonenumber" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Phone /></el-icon>
				</template>
			</el-input>
			<el-alert
                        v-show="state.phonecheck"
                        title="手机号错误"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-radio-group v-model="state.patientruleform.pSex">
				<el-icon class="el-input__icon"><ele-UserFilled /></el-icon>
				<el-radio value="男">男</el-radio>
				<el-icon class="el-input__icon"><ele-Avatar /></el-icon>
				<el-radio value="女">女</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input text :placeholder="$t('message.register.Id')" v-model="state.patientruleform.pId" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
			<el-alert
                        v-show="state.Idcheck"
                        title="身份证错误"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input text :placeholder="$t('message.register.city')" v-model="state.patientruleform.pCity" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Location /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-date-picker v-model="state.patientruleform.pBirthday" :placeholder="$t('message.register.Birthday')"></el-date-picker>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input
				:type="state.isShowPassword ? 'text' : 'password'"
				:placeholder="$t('message.register.password')"
				v-model="state.patientruleform.password"
				autocomplete="off"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="state.isShowPassword = !state.isShowPassword"
					>
					</i>
				</template>
			</el-input>
			<el-alert
                        v-show="state.passwordcheck"
                        title="密码强度不够(以字母开头，长度在6~16之间，只能包含字母、数字和下划线)"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
		</el-form-item>
		
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round v-waves @click="onRegister" :loading="state.loading.signIn">
				<span>{{ $t('message.register.registerBtnText') }}</span>
			</el-button>
		</el-form-item>
		</el-form>
		
	<el-form size="large" class="login-content-form" v-if="state.roleSign ===state.roles[1]">
		<el-form-item class="login-animation1">
			<el-input text :placeholder="$t('message.register.Name')" v-model="state.ruleForm.eName" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
			<el-alert
                        v-show="state.namecheck"
                        title="用户名不能为空"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
		</el-form-item>
        <el-form-item class="login-animation2">
			<el-input text :placeholder="$t('message.register.phonenumber')" v-model="state.ruleForm.phonenumber" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-phone /></el-icon>
				</template>
			</el-input>
			<el-alert
                        v-show="state.phonecheck"
                        title="手机号错误"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-radio-group v-model="state.ruleForm.eSex">

				<el-icon class="el-input__icon"><ele-UserFilled /></el-icon>
				<el-radio value="男">男</el-radio>
				<el-icon class="el-input__icon"><ele-Avatar /></el-icon>
				<el-radio value="女">女</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-radio-group v-model="state.ruleForm.isCarer">

				<el-icon class="el-input__icon"><ele-UserFilled /></el-icon>
				<el-radio value="是">是</el-radio>
				<el-icon class="el-input__icon"><ele-Avatar /></el-icon>
				<el-radio value="否">否</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-date-picker v-model="state.ruleForm.eBirthday" type="date" :placeholder="$t('message.register.Birthday')"></el-date-picker>	
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input text :placeholder="$t('message.register.Id')" v-model="state.ruleForm.eId" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
			<el-alert
                        v-show="state.Idcheck"
                        title="身份证错误"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input text :placeholder="$t('message.register.city')" v-model="state.ruleForm.eCity" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Location /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-calender :placeholder="$t('message.register.Birthday')" v-model="state.ruleForm.eBirthday"></el-calender>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input
				:type="state.isShowPassword ? 'text' : 'password'"
				:placeholder="$t('message.register.password')"
				v-model="state.ruleForm.password"
				autocomplete="off"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="state.isShowPassword = !state.isShowPassword"
					>
					</i>
				</template>
			</el-input>
			<el-alert
                        v-show="state.passwordcheck"
                        title="密码强度不够 (以字母开头，长度在6~16之间，只能包含字母、数字和下划线)"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
		</el-form-item>
		
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round v-waves @click="onRegister" :loading="state.loading.signIn">
				<span>{{ $t('message.register.registerBtnText') }}</span>
			</el-button>
		</el-form-item>
	</el-form>
	

	</div>
</template>

<script setup lang="ts" name="register">
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import Cookies from 'js-cookie';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';

import { number } from 'echarts';
import { verifyIdCard,verifyPhone,verifyFullName,verifyPassword } from '/@/utils/toolsValidate';
import { Eregister,register} from '/@/api/escortservice';


// 定义变量内容
const { t } = useI18n();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const route = useRoute();
const router = useRouter();
const state = reactive({
	code: '',
	isShowPassword: false,
	ruleForm: {	
		password:'',
		phonenumber:'',
		eName:'',
		eSex:'',
		eBirthday:'',
		eId:'',
		eCity:'',
		eServiceType:[],
		isCarer:'',
		status:'',
		eNo:Math.random(),
	},
	
	patientruleform: {
		password:'',
		phonenumber:'',
		pName:'',
		pSex:'',
		pBirthday:'',
		pId:'',
		pCity:'',
		status:true,
		pNo:Math.random(),

	},

	roleSign:'',
	loading: {
		signIn: false,
	},
	roles:[
		"patient",
		"escort"
	],
	phonecheck:false,
	namecheck:false,
	Idcheck:false,
	citycheck:false,
	passwordcheck:false,
	
	
});
const scrollStyle = {
	overflowY: 'auto',
}
// 时间获取
const currentTime = computed(() => {
	return formatAxis(new Date());
});
const init = () =>{
	state.phonecheck = false,
	state.namecheck = false,
	state.Idcheck = false,
	state.citycheck = false,
	state.passwordcheck = false
}
// 注册
const onRegister = async () => {
	state.loading.signIn = true;
	console.log(state.roleSign);
	init();
	if(state.roleSign ==='escort'){
		if(state.ruleForm.eName ===''){
		state.namecheck = true;
		}
		if(!verifyIdCard(state.ruleForm.eId)){
		state.Idcheck = true;
		}
		if(!verifyPassword(state.ruleForm.password)){
		state.passwordcheck = true;
		}
		if(!verifyPhone(state.ruleForm.phonenumber)){
			console.log(state.ruleForm.phonenumber)
		state.phonecheck = true;
		}
		if(!state.Idcheck&&!state.namecheck&&!state.passwordcheck&&!state.phonecheck){
		// 存储 token 到浏览器缓存
		//const token = login(state.ruleForm);
		Eregister(state.ruleForm).then(response=>{
			ElMessage.warning('注册成功,请返回重新登陆');
			state.roleSign ='';
			state.loading.signIn = false;
			state.ruleForm.eId ='';
			state.ruleForm.password='',
			state.ruleForm.phonenumber='',
			state.ruleForm.eName='',
			state.ruleForm.eSex='',
			state.ruleForm.eBirthday='',
			state.ruleForm.eId='',
			state.ruleForm.eCity='',
			state.ruleForm.eServiceType,
			state.ruleForm.isCarer="false",
			state.ruleForm.status="true",
			state.ruleForm.eNo=Math.random()
		})

		}
		else {
			state.loading.signIn = false;
			
		}
	}else{
		if(state.patientruleform.pName ===''){
		state.namecheck = true;
		}
		if(!verifyIdCard(state.patientruleform.pId)){
		state.Idcheck = true;
		}
		if(!verifyPassword(state.patientruleform.password)){
		state.passwordcheck = true;
		}
		if(!verifyPhone(state.patientruleform.phonenumber)){
		state.phonecheck = true;
		}
		if(!state.Idcheck&&!state.namecheck&&!state.passwordcheck&&!state.phonecheck){
		// 存储 token 到浏览器缓存
		//const token = login(state.ruleForm);
		register(state.patientruleform).then(response=>{
			ElMessage.warning('注册成功,请返回重新登陆');
			state.loading.signIn = false;
			state.patientruleform.password='',
			state.patientruleform.phonenumber='',
			state.patientruleform.pName='',
			state.patientruleform.pSex='',
			state.patientruleform.pBirthday='',
			state.patientruleform.pId='',
			state.patientruleform.pCity='',
			state.patientruleform.pNo=Math.random()
		})

		}else {
			state.loading.signIn = false;
			
			
		}
	

	}
	
	
	
};


</script>

<style scoped lang="scss">
.scroll{
	height: 360px;
	overflow: scroll;
}
.login-content-form {
	margin-top: 20px;
	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
