<script>
	import { onMount } from 'svelte';
	import BagCheckedIcon from '$lib/assets/icons/chart-icon/BagCheckedIcon.svelte'
	import TradeUpIcon from '$lib/assets/icons/chart-icon/TradeUpIcon.svelte'
	import WalletCashIcon from '$lib/assets/icons/chart-icon/WalletCashIcon.svelte'
	import WalletIcon from '$lib/assets/icons/chart-icon/WalletIcon.svelte'

	let totalSalesChartElement;
	var totalSalesChartOptions = {
		series: [
			{
				name: "Session Duration",
				data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
			},
			{
				name: "Page Views",
				data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
			},
			{
				name: 'Total Visits',
				data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
			}
		],
		chart: {
			height: 350,
			type: 'line',
			zoom: {
				enabled: false
			},
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: [5, 7, 5],
			curve: 'straight',
			dashArray: [0, 8, 5]
		},
		title: {
			text: 'Page Statistics',
			align: 'left'
		},
		legend: {
			tooltipHoverFormatter: function(val, opts) {
				return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
			}
		},
		markers: {
			size: 0,
			hover: {
				sizeOffset: 6
			}
		},
		xaxis: {
			categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
				'10 Jan', '11 Jan', '12 Jan'
			],
		},
		tooltip: {
			y: [
			{
				title: {
				formatter: function (val) {
					return val + " (mins)"
				}
				}
			},
			{
				title: {
				formatter: function (val) {
					return val + " per session"
				}
				}
			},
			{
				title: {
				formatter: function (val) {
					return val;
				}
				}
			}
			]
		},
		grid: {
			borderColor: '#f1f1f1',
		}
	};

	onMount(() => {
		import('apexcharts').then(module => {
			const ApexCharts = module.default;

			var totalSalesChart = new ApexCharts(totalSalesChartElement, totalSalesChartOptions)
			totalSalesChart.render()
		});
	});

</script>

<svelte:head>
	<title>Statistics</title>
	<meta name="description" content="Statistics page" />
</svelte:head>

<section class="pt-4 pb-5">
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-7">
				<div class="chart-card">
					<div bind:this={totalSalesChartElement}></div>
				</div>
			</div>
			<div class="col-lg-5">
				<div class="row">
					<div class="col-sm-6 col-lg-12 col-xxl-6 mb-4">
						<div class="chart-card">
							<span class="chart-card__icon">
								<svelte:component this={BagCheckedIcon} />
							</span>
							<p class="chart-card__regular-text mt-3">Current Inventory</p>
							<h2 class="chart-card__title my-2">1,000</h2>
							<p class="chart-card__small-text"><span class="success"><span class="inline-icon me-1"><svelte:component this={TradeUpIcon} /></span> 13.02%</span> Last Month</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-12 col-xxl-6 mb-4">
						<div class="chart-card">
							<span class="chart-card__icon">
								<svelte:component this={BagCheckedIcon} />
							</span>
							<p class="chart-card__regular-text mt-3">Units Sold</p>
							<h2 class="chart-card__title my-2">500</h2>
							<p class="chart-card__small-text"><span class="success"><span class="inline-icon me-1"><svelte:component this={TradeUpIcon} /></span> 13.02%</span> Last Month</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-12 col-xxl-6 mb-4">
						<div class="chart-card">
							<span class="chart-card__icon">
								<svelte:component this={WalletCashIcon} />
							</span>
							<p class="chart-card__regular-text mt-3">Inventory Value</p>
							<h2 class="chart-card__title my-2">£12,345.67</h2>
							<p class="chart-card__small-text"><span class="success"><span class="inline-icon me-1"><svelte:component this={TradeUpIcon} /></span> 13.02%</span> From May</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-12 col-xxl-6 mb-4">
						<div class="chart-card">
							<span class="chart-card__icon">
								<svelte:component this={WalletIcon} />
							</span>
							<p class="chart-card__regular-text mt-3">Revenue</p>
							<h2 class="chart-card__title my-2">£12,345.67</h2>
							<p class="chart-card__small-text"><span class="success"><span class="inline-icon me-1"><svelte:component this={TradeUpIcon} /></span> 13.02%</span> From May</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-12 col-xxl-6 mb-4">
						<div class="chart-card">
							<span class="chart-card__icon">
								<svelte:component this={WalletIcon} />
							</span>
							<p class="chart-card__regular-text mt-3">Gross Profit</p>
							<h2 class="chart-card__title my-2">£12,345.67</h2>
							<p class="chart-card__small-text"><span class="success"><span class="inline-icon me-1"><svelte:component this={TradeUpIcon} /></span> 13.02%</span> From May</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-12 col-xxl-6 mb-4">
						<div class="chart-card">
							<span class="chart-card__icon">
								<svelte:component this={WalletIcon} />
							</span>
							<p class="chart-card__regular-text mt-3">Net Profit</p>
							<h2 class="chart-card__title my-2">£12,345.67</h2>
							<p class="chart-card__small-text"><span class="success"><span class="inline-icon me-1"><svelte:component this={TradeUpIcon} /></span> 13.02%</span> From May</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-12 col-xxl-6 mb-4">
						<div class="chart-card">
							<span class="chart-card__icon">
								<svelte:component this={WalletIcon} />
							</span>
							<p class="chart-card__regular-text mt-3">Lifetime Income</p>
							<h2 class="chart-card__title my-2">£12,345.67</h2>
							<p class="chart-card__small-text"><span class="success"><span class="inline-icon me-1"><svelte:component this={TradeUpIcon} /></span> 13.02%</span> From May</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-12 col-xxl-6 mb-4">
						<div class="chart-card">
							<span class="chart-card__icon">
								<svelte:component this={WalletIcon} />
							</span>
							<p class="chart-card__regular-text mt-3">Lifetime Expenses</p>
							<h2 class="chart-card__title my-2">£12,345.67</h2>
							<p class="chart-card__small-text"><span class="danger"><span class="inline-icon me-1"><svelte:component this={TradeUpIcon} /></span> 13.02%</span> From May</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.chart-card{
		padding: 15px 20px;
		background-color: #000000;
		border: 2px solid var(--color-border);
		border-radius: 15px;
	}

	.chart-card__icon{
		--_size: 35px;
		width: var(--_size);
		height: var(--_size);
		font-size: 20px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		color: #000000;
		background-color: #E8E8E8;
	}

	.chart-card__regular-text{
		font-size: 13px;
	}
	
	.chart-card__title{
		font-size: 32px;
		font-weight: 700;
	}
	
	.chart-card__small-text{
		font-size: 12px;
	}

	.inline-icon{
		display: inline-block;
	}

	.success{
		color: #16C098;
	}

	.danger{
		color: #C01616;
	}
</style>