<template>
	<div class="chart-scrollbar layout-padding">
		<div class="chart-warp layout-padding-auto layout-padding-view">
			<div class="chart-warp-top">
				<ChartHead />
			</div>
			<div class="chart-warp-bottom">
				<!-- 左边 -->
				<div class="big-data-down-left">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<div class="flex-title">天气预报</div>
							<div class="flex-content">
								<div class="sky">
									<SvgIcon name="ele-Sunny" class="sky-left" />
									<div class="sky-center">
										<div class="mb2">
											<span>多云转晴</span>
											<span>东南风</span>
											<span class="span ml5">良</span>
										</div>
									</div>
									<div class="sky-right">
										<span>25</span>
										<span>°C</span>
									</div>
								</div>
								<div class="sky-dd">
									<div class="sky-dl" v-for="(v, k) in state.skyList" :key="k" :class="{ 'sky-dl-first': k === 1 }">
										<div>{{ v.v1 }}</div>
										<div v-if="v.type === 'title'">{{ v.v2 }}</div>
										<div v-else>
											<SvgIcon :name="v.v2" />
										</div>
										<div>{{ v.v3 }}</div>
										<div class="tip">{{ v.v5 }}</div>
										<div>{{ v.v7 }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<div class="flex-title">服务统计信息</div>
							<div class="flex-content flex-content-overflow">
								<div class="d-states">
									<div class="d-states-item">
										<SvgIcon name="ele-Odometer" class="i-bg1" />
										<div class="d-states-flex">
											<div class="d-states-item-label">病人数</div>
											<div class="d-states-item-value">{{state.patientNum}}</div>
										</div>
									</div>
									<div class="d-states-item">
										<SvgIcon name="ele-FirstAidKit" class="i-bg2" />
										<div class="d-states-flex">
											<div class="d-states-item-label">陪诊师</div>
											<div class="d-states-item-value">{{state.escortNum}}</div>
										</div>
									</div>
									<div class="d-states-item">
										<SvgIcon name="ele-VideoPlay" class="i-bg3" />
										<div class="d-states-flex">
											<div class="d-states-item-label">服务</div>
											<div class="d-states-item-value">{{state.serviceNum}}</div>
										</div>
									</div>
								</div>
								<div class="d-btn">
									<div class="d-btn-item" v-for="(v, k) in state.dBtnList" :key="k">
										<i class="d-btn-item-left el-icon-money"></i>
										<div class="d-btn-item-center">
											<div>{{ v.v2 }}|{{ v.v3 }}</div>
										</div>
										<div class="d-btn-item-eight">{{ v.v4 }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<div class="flex-title">近30天服务</div>
							<div class="flex-content">
								<div style="height: 100%" ref="chartsWarningRef"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- 中间 -->
				<div class="big-data-down-center">
					<div class="big-data-down-center-one">
						<div class="big-data-down-center-one-content">
							<div style="height: 100%" ref="chartsCenterOneRef"></div>
						</div>
					</div>
					<div class="big-data-down-center-two">
						<div class="flex-warp-item-box">
							<div class="flex-title">
								<span>当前陪诊服务</span>
								<span class="flex-title-small">单位：次</span>
							</div>
							<div class="flex-content">
								<div class="flex-content-left">
									<div class="monitor-item" v-for="(v, k) in state.chartData4List" :key="k">
										<div class="monitor-wave">
											<div class="monitor-z-index">
												<div class="monitor-item-label">{{ v.label }}</div>
											</div>
										</div>
									</div>
								</div>
								<div class="flex-content-right">
									<div style="height: 100%" ref="chartsMonitorRef"></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 右边 -->
				<div class="big-data-down-right">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<div class="flex-title">
								<span>近7天陪诊服务</span>
								<span class="flex-title-small">单位：次</span>
							</div>
							<div class="flex-content">
								<div style="height: 100%" ref="chartsSevenDaysRef"></div>
							</div>
						</div>
					</div>
			
				
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="chartIndex">
import { defineAsyncComponent, reactive, onMounted, watch, nextTick, onActivated, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { skyList, dBtnList, chartData4List } from '/@/views/chart/chart';

// 引入组件
const ChartHead = defineAsyncComponent(() => import('/@/views/chart/head.vue'));

// 定义变量内容
const chartsCenterOneRef = ref();
const chartsSevenDaysRef = ref();
const chartsWarningRef = ref();
const chartsMonitorRef = ref();
const chartsInvestmentRef = ref();
const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
const state = reactive({
	skyList,
	dBtnList,
	chartData4List,
	myCharts: [] as EmptyArrayType,
	patientNum: 100,
	escortNum:26,
	serviceNum:10
});

// 初始化中间图表1
const initChartsCenterOne = () => {
	const myChart = echarts.init(chartsCenterOneRef.value);
	const option = {
		grid: {
			top: 15,
			right: 15,
			bottom: 20,
			left: 30,
		},
		tooltip: {},
		series: [
			{
				type: 'wordCloud',
				sizeRange: [12, 40],
				rotationRange: [0, 0],
				rotationStep: 45,
				gridSize: Math.random() * 20 + 5,
				shape: 'circle',
				width: '100%',
				height: '100%',
				textStyle: {
					fontFamily: 'sans-serif',
					fontWeight: 'bold',
					color: function () {
						return `rgb(${[Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',')})`;
					},
				},
				data: [
					{ name: '健康管理系统', value: 520 },
					{ name: 'ljr', value: 520 },
					{ name: '健康', value: 500 },
					{ name: 'health', value: 420 },
					{ name: 'healthcare', value: 520 },
					{ name: 'patient', value: 2.64 },
					{ name: 'escort', value: 4.03 },
					{ name: 'service', value: 24.95 },
					{ name: 'escort', value: 4.04 },
					{ name: 'better', value: 5.27 },
					{ name: '健康管理', value: 5.8 },
					{ name: 'servicetype', value: 3.09 },
					{ name: '院内陪朕', value: 24.71 },
					{ name: '全程陪诊', value: 6.33 },
					{ name: '尊享陪诊', value: 2.55 },
					{ name: '管理员', value: 3.88 },
					{ name: 'admin', value: 8.04 },
					{ name: 'health', value: 5.87 },
					{ name: 'healthcare', value: 6.97 },
					{ name: 'management', value: 2.53 },
					{ name: 'ljr', value: 2.49 },
					{ name: 'better life', value: 3.91 },
					{ name: 'phone', value: 3.25 },
					{ name: 'health', value: 9.93 },
					{ name: '健康管理系统', value: 3.65 },
				],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 初始化近7天信息统计
const initChartsSevenDays = () => {
	const myChart = echarts.init(chartsSevenDaysRef.value);
	const option = {
		grid: {
			top: 15,
			right: 15,
			bottom: 20,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['1天', '2天', '3天', '4天', '5天', '6天', '7天'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				name: '病人',
				type: 'line',
				stack: '总量',
				data: [12, 32, 11, 34, 90, 23, 21],
			},
			{
				name: '陪诊师',
				type: 'line',
				stack: '总量',
				data: [22, 82, 91, 24, 90, 30, 30],
			},
			{
				name: '服务',
				type: 'line',
				stack: '总量',
				data: [50, 32, 18, 14, 90, 30, 50],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 初始化近30天陪诊服务
const initChartsWarning = () => {
	const myChart = echarts.init(chartsWarningRef.value);
	const option = {
		grid: {
			top: 50,
			right: 20,
			bottom: 30,
			left: 30,
		},
		tooltip: {
			trigger: 'item',
		},
		series: [
			{
				name: '陪诊服务类型',
				type: 'pie',
				radius: [20, 50],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 8,
				},
				data: [
					{ value: 40, name: '院内陪朕' },
					{ value: 38, name: '全程陪诊' },
					{ value: 32, name: '尊享陪诊' },
				],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 初始化当前服务
const initChartsMonitor = () => {
	const myChart = echarts.init(chartsMonitorRef.value);
	const option = {
		grid: {
			top: 15,
			right: 15,
			bottom: 20,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				itemStyle: {
					color: '#289df5',
					borderColor: '#289df5',
					areaStyle: {
						type: 'default',
						opacity: 0.1,
					},
				},
				data: [20, 32, 31, 34, 12, 13, 20],
				type: 'line',
				areaStyle: {},
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 初始化近7天服务
const initChartsInvestment = () => {
	const myChart = echarts.init(chartsInvestmentRef.value);
	const option = {
		grid: {
			top: 15,
			right: 15,
			bottom: 20,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'category',
			data: ['1天', '2天', '3天', '4天', '5天', '6天', '7天'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: [10, 20, 15, 80, 70, 11, 30],
				type: 'bar',
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};
// 批量设置 echarts resize
const initEchartsResizeFun = () => {
	nextTick(() => {
		for (let i = 0; i < state.myCharts.length; i++) {
			state.myCharts[i].resize();
		}
	});
};
// 批量设置 echarts resize
const initEchartsResize = () => {
	window.addEventListener('resize', initEchartsResizeFun);
};
// 页面加载时
onMounted(() => {
	initChartsCenterOne();
	initChartsSevenDays();
	initChartsWarning();
	initChartsMonitor();
	initChartsInvestment();
	initEchartsResize();
});
// 由于页面缓存原因，keep-alive
onActivated(() => {
	initEchartsResizeFun();
});
// 监听 pinia 中的 tagsview 开启全屏变化，重新 resize 图表，防止不出现/大小不变等
watch(
	() => isTagsViewCurrenFull.value,
	() => {
		initEchartsResizeFun();
	}
);
</script>

<style scoped lang="scss">
@import './chart.scss';
</style>
