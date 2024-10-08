/**
 * views personal
 */
type NewInfo = {
	title: string;
	date: string;
	link: string;
};
type Recommend = {
	title: string;
	msg: string;
	icon: string;
	bg: string;
	iconColor: string;
};
declare type PersonalState = {
	personalForm: {
		name: string;
		email: string;
		autograph: string;
		occupation: string;
		phone: string;
		sex: string;
	};
};



/**
 * views system
 */

// role
declare interface RowRoleType {
	roleName: string;
	roleSign: string;
	describe: string;
	sort: number;
	status: boolean;
	createTime: string;
}

interface SysRoleTableType extends TableType {
	data: RowRoleType[];
}

declare interface SysRoleState {
	tableData: SysRoleTableType;
}

declare type TreeType = {
	id: number;
	label: string;
	children?: TreeType[];
};

// user(admin/patient/physician)
declare type RowUserType<T = any> = {
	id: number;
	name: string;
	status: boolean;
	sort: number;
	ID: string;
	birthdate: string;
	phone: string;
	city: string;
	sex: string;
	password: string;
	roleSign: string;
};

interface SysUserTableType extends TableType {
	data: RowUserType[];
}

declare interface SysUserState {
	tableData: SysUserTableType;
}
// declare interface physicianType extends RowUserType {
// 	isDoctor: boolean;
// 	type: number | string;
// }

// Patient
declare type PatientTreeType = {
	// account:string,
	password:string;
	status:boolean;
	phonenumber:string;
	pNo:number;
	pName:string;
	pSex:string;
	pBirthday:string;
	pId:string;
	pCity:string;
	// id: number | string;
	// name: string;
	// status: boolean;
	// sort: number;
	// ID: string;
	// birthdate: string;
	// phone: string;
	// city: string;
	// sex: string;
	// children?: PatientTreeType[];
};


declare interface RowPatientType extends PatientTreeType {
	PatientLevel: string[];
	// person: string;
	// phone: string;
	// email: string;
}

interface SysPatientTableType extends TableType {
	data: PatientTreeType[];
}

declare interface SysPatientState {
	tableData: SysPatientTableType;
}

//Physician
declare type physicianType = {
	// account:string,
	password:string;
	status:boolean;
	phonenumber:string;
	eNo:number;
	eName:string;
	eSex:string;
	eBirthday:string;   
	eId:string;
	eCity:string;  
	isCarer:char;  
	eServiceType: []
    // eServiceType:string; //后端是int类型 但感觉字符型更合理
};

declare interface SysPhysicianState {
	tableData: SysPhysicianTableType;
}

// service type
declare type RowServiceClassType<T = any> = {
	stNo: number;
	stType: string;
	stInformation: string;
	stPrice: number;
	
};

interface SysServiceClassTableType extends TableType {
	data: RowServiceClassType[];
}

declare interface SysServiceClassState {
	tableData: SysServiceClassTableType;
}
// service
declare type RowServiceType<T = any> = {
	
	stNo: number;
	stType: string;
	stPrice: number;
	stInformation: string;
	eName:string;
	pName:string;
	eNo:number;
	pNo:number;
	isFinish: string;
	
};

interface SysServiceTableType extends TableType {
	data: RowServiceType[];
}

declare interface SysServiceState {
	tableData: SysServiceTableType;
}
// dic
type ListType = {
	id: number;
	label: string;
	value: string;
};

declare interface RowDicType {
	dicName: string;
	fieldName: string;
	describe: string;
	status: boolean;
	createTime: string;
	list: ListType[];
}

interface SysDicTableType extends TableType {
	data: RowDicType[];
}

declare interface SysDicState {
	tableData: SysDicTableType;
}

declare type RowPersonalType<T = any> = {
	name: string;
	status: boolean;
	phone: string;
	birthdate: string;
	city: string;
	personalForm: {
		email: string;
		autograph: string;
		occupation: string;
		sex: string;
	  };
};
/**
 * views pages
 */
//  filtering
declare type FilteringChilType = {
	id: number | string;
	label: string;
	active: boolean;
};

declare type FilterListType = {
	img: string;
	title: string;
	evaluate: string;
	collection: string;
	price: string;
	monSales: string;
	id: number | string;
	loading?: boolean;
};

declare type FilteringRowType = {
	title: string;
	isMore: boolean;
	isShowMore: boolean;
	id: number | string;
	children: FilteringChilType[];
};

// tableRules
declare type TableRulesHeaderType = {
	prop: string;
	width: string | number;
	label: string;
	isRequired?: boolean;
	isTooltip?: boolean;
	type: string;
};

declare type TableRulesState = {
	tableData: {
		data: EmptyObjectType[];
		header: TableRulesHeaderType[];
		option: SelectOptionType[];
	};
};

declare type TableRulesOneProps = {
	name: string;
	email: string;
	autograph: string;
	occupation: string;
};

// tree
declare type RowTreeType = {
	id: number;
	label: string;
	label1: string;
	label2: string;
	isShow: boolean;
	children?: RowTreeType[];
};

// workflow index
declare type NodeListState = {
	id: string | number;
	nodeId: string | undefined;
	class: HTMLElement | string;
	left: number | string;
	top: number | string;
	icon: string;
	name: string;
};

declare type LineListState = {
	sourceId: string;
	targetId: string;
	label: string;
};

declare type XyState = {
	x: string | number;
	y: string | number;
};

declare type WorkflowState<T = any> = {
	leftNavList: T[];
	dropdownNode: XyState;
	dropdownLine: XyState;
	isShow: boolean;
	jsPlumb: T;
	jsPlumbNodeIndex: null | number;
	jsplumbDefaults: T;
	jsplumbMakeSource: T;
	jsplumbMakeTarget: T;
	jsplumbConnect: T;
	jsplumbData: {
		nodeList: NodeListState[];
		lineList: LineListState[];
	};
};

// workflow drawer
declare type WorkflowDrawerNodeState<T = any> = {
	node: { [key: string]: T };
	nodeRules: T;
	form: T;
	tabsActive: string;
	loading: {
		extend: boolean;
	};
};

declare type WorkflowDrawerLabelType = {
	type: string;
	label: string;
};

declare type WorkflowDrawerState<T = any> = {
	isOpen: boolean;
	nodeData: {
		type: string;
	};
	jsplumbConn: T;
};

/**
 * views make
 */
// tableDemo
declare type TableDemoPageType = {
	pageNum: number;
	pageSize: number;
};

declare type TableHeaderType = {
	key: string;
	width: string;
	title: string;
	type: string | number;
	colWidth: string;
	width?: string | number;
	height?: string | number;
	isCheck: boolean;
};

declare type TableSearchType = {
	label: string;
	prop: string;
	placeholder: string;
	required: boolean;
	type: string;
	options?: SelectOptionType[];
};

declare type TableDemoState = {
	tableData: {
		data: EmptyObjectType[];
		header: TableHeaderType[];
		config: {
			total: number;
			loading: boolean;
			isBorder: boolean;
			isSelection: boolean;
			isSerialNo: boolean;
			isOperate: boolean;
		};
		search: TableSearchType[];
		param: EmptyObjectType;
		printName: string;
	};
};
