<template>
	<el-form size="large" class="login-content-form">
		<el-form-item class="login-animation1">
			<el-input text :placeholder="$t('message.account.accountPlaceholder1')" v-model="state.ruleForm.userName" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input
				:type="state.isShowPassword ? 'text' : 'password'"
				:placeholder="$t('message.account.accountPlaceholder2')"
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
		</el-form-item>
		<el-form-item>
			<el-select placeholder="请选择身份" v-model="state.ruleForm.roleSign">
				<el-option v-for="item in state.roles"
				:value = item.value
				:key = item.index
				:label = item.value >
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round v-waves @click="onSignIn" :loading="state.loading.signIn">
				<span>{{ $t('message.account.accountBtnText') }}</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts" name="loginAccount">
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import Cookies from 'js-cookie';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { frontEndsResetRoute, initFrontEndControlRoutes,setAddRoute, setFilterMenuAndCacheTagsViewRoutes  } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';
import {login, logout, getCode} from '/@/api/login';
import { onMounted, ref } from 'vue';
import { useUserInfo } from '/@/stores/userInfo';


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
		userName: '',
		password: '',
		roleSign:''
	},
	loading: {
		signIn: false,
	},
	roles:[
		{
			index:1,
			value:"admin"
		},
		{
			index:2,
			value:"patient"
		},
		{
			index:3,
			value:"pysician"
		}
	
	]
	
	
});
const storesUserInfo = useUserInfo();

// 时间获取
const currentTime = computed(() => {
	return formatAxis(new Date());
});

// 登录
const onSignIn = async () => {
	state.loading.signIn = true;
	console.log(state.ruleForm.roleSign);
	// login(state.roleForm).then(async (response:object)=>{
	// // 登录成功记录token和用户信息，登录失败给对应提示
	// if(response.code !=200){
	// 	ElMessage.warning('抱歉，您没有登录权限');
	// 	Session.clear();
	// 	return;
	// }
	//Session.set('token',response.token);
	//const token = login(state.ruleForm);
	 Session.set('token', Math.random().toString(36).substr(0));
	// 存储用户信息
	//localStorage.setItem("userInfo",JSON.stringify(state.roleForm))
	Cookies.set('userName', state.ruleForm.userName);
	Session.set('roleSign',state.ruleForm.roleSign);
	frontEndsResetRoute();
	let userAuth;
	if (Session.get('roleSign') === 'admin'){
		userAuth = 'admin';
	}
	else if(Session.get('roleSign') === 'physician'){
		userAuth = 'physician';
	}else{
		userAuth = 'patient';
	}
	Cookies.set('roleSign', userAuth);
	// 切换不同权限用户
	await storesUserInfo.setUserInfos();
	await setAddRoute();
	setFilterMenuAndCacheTagsViewRoutes();

	let isNoPower;
	if (!themeConfig.value.isRequestRoutes) {
		// 前端控制路由
		isNoPower = await initFrontEndControlRoutes();
			
	} else {
		// 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
		isNoPower = await initBackEndControlRoutes();
	}
	if(isNoPower){
			ElMessage.warning('抱歉，您没有登录权限');
			Session.clear();
		}else{
			signInSuccess();
		}
                    
    //  }).catch(e =>{
	// 	console.log(e)
	// 	ElMessage.warning('出现异常，请联系管理人员');
	// 		Session.clear();
	//  })
      
	// // 存储 token 到浏览器缓存
	// if(login(state.ruleForm))
	// //const token = login(state.ruleForm);
	// Session.set('token', Math.random().toString(36).substr(0));
	// //Session.set('token',token);
	// // 模拟数据，对接接口时，记得删除多余代码及对应依赖的引入。用于 `/src/stores/userInfo.ts` 中不同用户登录判断（模拟数据）
	// Cookies.set('userName', state.ruleForm.userName);
	// Session.set('roleSign',state.ruleForm.roleSign);

	// frontEndsResetRoute();
	// let userAuth;
	// if (Session.get('roleSign') === 'admin'){
	// 	userAuth = 'admin';
	// }
	// else if(Session.get('roleSign') === 'physician'){
	// 	userAuth = 'physician';
	// }else{
	// 	userAuth = 'patient';
	// }
	// Cookies.set('userName', userAuth);
	// // 模拟切换不同权限用户
	// await storesUserInfo.setUserInfos();
	// await setAddRoute();
	// setFilterMenuAndCacheTagsViewRoutes();



	// let isNoPower;
	// if (!themeConfig.value.isRequestRoutes) {
	// 	// 前端控制路由
	// 	isNoPower = await initFrontEndControlRoutes();
	// 	if(isNoPower){
	// 		ElMessage.warning('抱歉，您没有登录权限');
	// 		Session.clear();
	// 	}else{
	// 		signInSuccess();
	// 	}
		
	// } else {
	// 	// 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
	// 	isNoPower = await initBackEndControlRoutes();
	// 	// 执行完 initBackEndControlRoutes，再执行 signInSuccess
	// 	if(isNoPower){
	// 		ElMessage.warning('抱歉，您没有登录权限');
	// 		Session.clear();
	// 	}else{
	// 		signInSuccess();
	// 	}
	// }
	
};
// 登录成功后的跳转
const signInSuccess = () => {
	
	// 初始化登录成功时间问候语
	let currentTimeInfo = currentTime.value;
	// 登录成功，跳到转首页
	// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
	if (route.query?.redirect) {
		router.push({
			path: <string>route.query?.redirect,
			query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
		});
	} else {
		router.push('/');
	}
	// 登录成功提示
	const signInText = t('message.signInText');
	ElMessage.success(`${currentTimeInfo}，${signInText}`);
	// 添加 loading，防止第一次进入界面时出现短暂空白
	NextLoading.start();
	state.loading.signIn = false;
};
</script>

<style scoped lang="scss">
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
