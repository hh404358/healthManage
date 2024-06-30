import request from '/@/utils/request';
export function listPatient(){
	return request({
		url: '/admin/listPatient',
		method: 'get',
		headers:{
			isToken:true,
		}
	})
}
export function getPatientByName(name:string){
	return request({
		url: '/admin/getPatientByName',
		method: 'get',
		headers:{
			isToken:true,
		},
		params:{name:name}
	})
}
export function addPatient(data:object){
	return request({
		url: '/admin/addPatient ',
		method: 'post',
		headers:{
			isToken:true,
		},
		data: {data : data}
	})
}

export function updatePatient(data:object){
	return request({
		url: '/patient/updatePatient', //存疑
		method: 'post',
		headers:{
			isToken:true,
		},
		data: {data : data}
	})
}
// **请求URL**

// /admin/updatePatient `PUT` 

// **请求体**

// ```json
// {
// 	"account":"string",
// 	"password":"string",
// 	"phonenumber":"string",
// 	"pNo":"int",
// 	"pName":"string",
// 	"pSex":"string",
// 	"pBirthday":"date",
// 	"pId":"string",
// 	"pCity":"string"
// }
export function delPatient(userId:number|string){
	return request({
		url: '/admin/removePatient ',
		method: 'delete',
		headers:{
			isToken:true,
		},
		params:{id : userId}
	})
}
