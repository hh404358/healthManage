<template>
	<div class="personal layout-pd">
		<!-- secort -->
		<el-row v-if="state.roleSign ==='escort'">
			<!-- 个人信息 -->
			<el-col :xs="24" :sm="16">
				<el-card shadow="hover" header="个人信息">
					<div class="personal-user">
						<div class="personal-user-left">
							<el-upload class="h100 personal-user-left-upload" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1">
								<img src="https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500" />
							</el-upload>
						</div>
						<div class="personal-user-right">
							<el-row>
								<el-col :span="24" class="personal-title mb18">{{ currentTime }}，{{state.ruleForm.eName}}，生活变的再糟糕，也不妨碍我变得更好！ </el-col>
								<el-col :span="24">
									<el-row>
										<el-col :xs="24" :sm="8" class="personal-item mb6">
											<div class="personal-item-label">昵称：</div>
											<div class="personal-item-value">{{ state.ruleForm.eName }}</div>
										</el-col>
										<el-col :xs="24" :sm="16" class="personal-item mb6">
											<div class="personal-item-label">身份：</div>
											<div class="personal-item-value">{{ state.roleSign }}</div>
										</el-col>
									</el-row>
								</el-col>
								
							</el-row>
						</div>
					</div>
				</el-card>
			</el-col>

			<!-- 更新信息 -->
			<el-col :span="24">
				<el-card shadow="hover" class="mt15 personal-edit" header="更新信息">
					<div class="personal-edit-title">基本信息</div>
					<el-form :model="state" size="default" label-width="40px" class="mt35 mb35">
						<el-row :gutter="35">
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="昵称">
									<el-input v-model="state.ruleForm.eName" placeholder="请输入昵称" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="状态">
									<el-input v-model="state.ruleForm.status" placeholder="请输入状态" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="城市">
									<el-input v-model="state.ruleForm.eCity" placeholder="请输入城市" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="生日">
									<el-date-picker v-model="state.ruleForm.eBirthday" :placeholder="$t('message.register.Birthday')"></el-date-picker>
								</el-form-item>
							</el-col>
		
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="手机">
									<el-input v-model="state.ruleForm.phonenumber" placeholder="请输入手机" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="性别">
									<el-select v-model="state.ruleForm.eSex" placeholder="请选择性别" clearable class="w100">
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
								<el-form-item>
									<el-button type="primary">
										<el-icon>
											<ele-Position />
										</el-icon>
										更新个人信息
									</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<div class="personal-edit-title mb15">账号安全</div>
					<div class="personal-edit-safe-box">
						<div class="personal-edit-safe-item">
							<div class="personal-edit-safe-item-left">
								<div class="personal-edit-safe-item-left-label">账户密码</div>
								<div class="personal-edit-safe-item-left-value">当前密码强度：强</div>
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
							</div>
							<div class="personal-edit-safe-item-right">
								<el-button text type="primary" @click="updatePassword()">立即修改</el-button>
							</div>
						</div>
					</div>
					<div class="personal-edit-safe-box">
						<div class="personal-edit-safe-item">
							<div class="personal-edit-safe-item-left">
								<div class="personal-edit-safe-item-left-label">密保手机</div>
								<el-input v-model ="state.ruleForm.phonenumber" class="personal-edit-safe-item-left-value">已绑定手机:{{ state.ruleForm.phonenumber }}</el-input>
							</div>
							<div class="personal-edit-safe-item-right">
								<el-button text type="primary" @click="updatePhone()">立即修改</el-button>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>


		<!-- patient -->
		<el-row v-if="state.roleSign === 'patient'">
			<!-- 个人信息 -->
			<el-col :xs="24" :sm="16">
				<el-card shadow="hover" header="个人信息">
					<div class="personal-user">
						<div class="personal-user-left">
							<el-upload class="h100 personal-user-left-upload" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1">
								<img src="https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500" />
							</el-upload>
						</div>
						<div class="personal-user-right">
							<el-row>
								<el-col :span="24" class="personal-title mb18">{{ currentTime }}，{{state.patientruleform.pName}}，生活变的再糟糕，也不妨碍我变得更好！ </el-col>
								<el-col :span="24">
									<el-row>
										<el-col :xs="24" :sm="8" class="personal-item mb6">
											<div class="personal-item-label">昵称：</div>
											<div class="personal-item-value">{{ state.patientruleform.pName }}</div>
										</el-col>
										<el-col :xs="24" :sm="16" class="personal-item mb6">
											<div class="personal-item-label">身份：</div>
											<div class="personal-item-value">{{ state.roleSign }}</div>
										</el-col>
									</el-row>
								</el-col>
								
							</el-row>
						</div>
					</div>
				</el-card>
			</el-col>

			<!-- 更新信息 -->
			<el-col :span="24">
				<el-card shadow="hover" class="mt15 personal-edit" header="更新信息">
					<div class="personal-edit-title">基本信息</div>
					<el-form :model="state" size="default" label-width="40px" class="mt35 mb35">
						<el-row :gutter="35">
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="昵称">
									<el-input v-model="state.patientruleform.pName" placeholder="请输入昵称" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="状态">
									<el-input v-model="state.patientruleform.status" placeholder="请输入状态" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="城市">
									<el-input v-model="state.patientruleform.pCity" placeholder="请输入城市" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="生日">
									<el-input v-model="state.patientruleform.pBirthday" placeholder="请输入出生日期" clearable></el-input>
								</el-form-item>
							</el-col>
		
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="手机">
									<el-input v-model="state.patientruleform.phonenumber" placeholder="请输入手机" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="性别">
									<el-select v-model="state.patientruleform.pSex" placeholder="请选择性别" clearable class="w100">
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
								<el-form-item>
									<el-button type="primary" @click="updateUserInfo()">
										<el-icon>
											<ele-Position />
										</el-icon>
										更新个人信息
									</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<div class="personal-edit-title mb15">账号安全</div>
					<div class="personal-edit-safe-box">
						<div class="personal-edit-safe-item">
							<div class="personal-edit-safe-item-left">
								<div class="personal-edit-safe-item-left-label">账户密码</div>
								<div class="personal-edit-safe-item-left-value">当前密码强度：强</div>
								<el-input
									:type="state.isShowPassword ? 'text' : 'password'"
									:placeholder="$t('message.account.accountPlaceholder2')"
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
							</div>
							<div class="personal-edit-safe-item-right">
								<el-button text type="primary" @click="updatePassword()">立即修改</el-button>
							</div>
						</div>
					</div>
					<div class="personal-edit-safe-box">
						<div class="personal-edit-safe-item">
							<div class="personal-edit-safe-item-left">
								<div class="personal-edit-safe-item-left-label">密保手机</div>
								<div class="personal-edit-safe-item-left-value">已绑定手机:{{ state.patientruleform.phonenumber }}</div>
								<el-input v-model="state.patientruleform.phonenumber" v-if="state.editPassword"></el-input>
							</div>
							<div class="personal-edit-safe-item-right">
								<el-button text type="primary" @click="updatePhone()">立即修改</el-button>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="personal">
import { reactive, computed, onMounted, ref } from 'vue';
import { formatAxis } from '/@/utils/formatTime';
import {getInfo,editPassword,editPhone,editUserInfo} from '/@/api/personal';
import { Session } from '/@/utils/storage';
import ElMessage from 'element-plus/es/components/message';

const state = reactive({
	ruleForm: {	
		password:'',
		phonenumber:'',
		eName:'',
		eSex:'',
		eBirthday:'',
		eId:'',
		eCity:'',
		eServiceType:'',
		isCarer:false,
		status:true,
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
	isShowPassword:false,
	roleSign:Session.get('roleSign'),
	editPhone: false,
	editPassword: false,
	token: Session.get('token')
});
const updateUserInfo = () =>{
	if(state.roleSign==='escort'){
		editUserInfo(state.token,state.roleSign,state.ruleForm).then(response=>{
			ElMessage.success('修改个人信息成功');
		})
	}else{
		editUserInfo(state.token,state.roleSign,state.patientruleform).then(response=>{
			ElMessage.success('修改个人信息成功');
		})
	}
}
const updatePhone = () =>{
	state.editPhone = true;
	if(state.roleSign === 'escort'){
		editPhone(state.token,state.roleSign,state.ruleForm.phonenumber).then(response=>{
			ElMessage.success('修改手机号成功');
		})	
	}else{
		editPhone(state.token,state.roleSign,state.patientruleform.phonenumber).then(response=>{
			ElMessage.success('修改手机号成功');
		})	
	}
	
}
const updatePassword = () =>{
	state.editPassword = true;
	if(state.roleSign === 'escort'){
		editPassword(state.token,state.roleSign,state.ruleForm.password).then(response=>{
			ElMessage.success('修改密码成功');
		})
	}else{
		editPassword(state.token,state.roleSign,state.patientruleform.password).then(response=>{
			ElMessage.success('修改密码成功');
		})
	}
	
	
}


onMounted(() => {
	getUserInfo();
});

const getUserInfo = () =>{
	getInfo().then(response=>{
		if(state.roleSign === 'escort'){
			state.roleSign = response.data;
		}else {
			state.patientruleform = response.data;
		}
		
	})
}
// 当前时间提示语
const currentTime = computed(() => {
	return formatAxis(new Date());
});
</script>

<style scoped lang="scss">
@import '../../theme/mixins/index.scss';
.personal {
	.personal-user {
		height: 130px;
		display: flex;
		align-items: center;
		.personal-user-left {
			width: 100px;
			height: 130px;
			border-radius: 3px;
			:deep(.el-upload) {
				height: 100%;
			}
			.personal-user-left-upload {
				img {
					width: 100%;
					height: 100%;
					border-radius: 3px;
				}
				&:hover {
					img {
						animation: logoAnimation 0.3s ease-in-out;
					}
				}
			}
		}
		.personal-user-right {
			flex: 1;
			padding: 0 15px;
			.personal-title {
				font-size: 18px;
				@include text-ellipsis(1);
			}
			.personal-item {
				display: flex;
				align-items: center;
				font-size: 13px;
				.personal-item-label {
					color: var(--el-text-color-secondary);
					@include text-ellipsis(1);
				}
				.personal-item-value {
					@include text-ellipsis(1);
				}
			}
		}
	}
	.personal-info {
		.personal-info-more {
			float: right;
			color: var(--el-text-color-secondary);
			font-size: 13px;
			&:hover {
				color: var(--el-color-primary);
				cursor: pointer;
			}
		}
		.personal-info-box {
			height: 130px;
			overflow: hidden;
			.personal-info-ul {
				list-style: none;
				.personal-info-li {
					font-size: 13px;
					padding-bottom: 10px;
					.personal-info-li-title {
						display: inline-block;
						@include text-ellipsis(1);
						color: var(--el-text-color-secondary);
						text-decoration: none;
					}
					& a:hover {
						color: var(--el-color-primary);
						cursor: pointer;
					}
				}
			}
		}
	}
	.personal-recommend-row {
		.personal-recommend-col {
			.personal-recommend {
				position: relative;
				height: 100px;
				border-radius: 3px;
				overflow: hidden;
				cursor: pointer;
				&:hover {
					i {
						right: 0px !important;
						bottom: 0px !important;
						transition: all ease 0.3s;
					}
				}
				i {
					position: absolute;
					right: -10px;
					bottom: -10px;
					font-size: 70px;
					transform: rotate(-30deg);
					transition: all ease 0.3s;
				}
				.personal-recommend-auto {
					padding: 15px;
					position: absolute;
					left: 0;
					top: 5%;
					color: var(--next-color-white);
					.personal-recommend-msg {
						font-size: 12px;
						margin-top: 10px;
					}
				}
			}
		}
	}
	.personal-edit {
		.personal-edit-title {
			position: relative;
			padding-left: 10px;
			color: var(--el-text-color-regular);
			&::after {
				content: '';
				width: 2px;
				height: 10px;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				background: var(--el-color-primary);
			}
		}
		.personal-edit-safe-box {
			border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
			padding: 15px 0;
			.personal-edit-safe-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.personal-edit-safe-item-left {
					flex: 1;
					overflow: hidden;
					.personal-edit-safe-item-left-label {
						color: var(--el-text-color-regular);
						margin-bottom: 5px;
					}
					.personal-edit-safe-item-left-value {
						color: var(--el-text-color-secondary);
						@include text-ellipsis(1);
						margin-right: 15px;
					}
				}
			}
			&:last-of-type {
				padding-bottom: 0;
				border-bottom: none;
			}
		}
	}
}
</style>
