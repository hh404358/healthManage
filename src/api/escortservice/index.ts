import request from '/@/utils/request';

//管理员
//管理员获取所有服务
export function getService(){
	return request({
		url: '/admin/getService',
		method: 'get',
	})
}
//管理员删除服务
export function removeService(pNo:number,eNo:number,stNo:number){
	return request({
		url: '/admin/removeService',
		method: 'delete',
		params:{pNo:pNo,eno:eNo,stNo:stNo}
	})
}


//陪诊师
//注册
export function Eregister(data:object){
	return request({
		url: '/escort/register',
		method: 'post',
        data
	})
}
//陪诊师获取服务
export function getEscortServices(){
	return request({
		url: '/escort/getEscortServices',
		method: 'get',
	})
}

//陪诊师完成服务，即“删除”
export function finish(stNo:number,pNo:number){
	return request({
		url: '/escort/finish',
		method: 'post',
		params:{stNo:stNo,pNo:pNo}
	})
}

//病人
//注册
export function register(data:object){
	return request({
		url: '/patient/register',
		method: 'post',
		data
	})

}

//获取病人自己服务订单
export function getServices(){
	return request({
		url: '/patient/getServices',
		method: 'get',
	})
}

//向病人展示服务类型
export function listAllService(){
	return request({
		url: '/patient/listAllService',
		method: 'get',
	})
}

//病人预约陪诊师
export function reserveService(stNo:number){
	return request({
		url: '/patient/reserveService',
		method: 'post',
		params:{stNo:stNo}
	})
}

//病人取消服务
export function cancelService(stNo:number,eNo:number){
	return request({
		url: '/patient/cancelService',
		method: 'delete',
		params:{stNo:stNo,eNo:eNo}
	})
}