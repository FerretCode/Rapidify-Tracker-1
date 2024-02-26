<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import { onMount } from "svelte";
  import BagCheckedIcon from "$lib/assets/icons/chart-icon/BagCheckedIcon.svelte";
  import TradeUpIcon from "$lib/assets/icons/chart-icon/TradeUpIcon.svelte";
  import WalletCashIcon from "$lib/assets/icons/chart-icon/WalletCashIcon.svelte";
  import WalletIcon from "$lib/assets/icons/chart-icon/WalletIcon.svelte";
  import ChartIcon from "$lib/assets/icons/chart-icon/ChartIcon.svelte";
  import ArrowDownIcon from "$lib/assets/icons/ArrowDownIcon.svelte";
  import ArrowUpIcon from "$lib/assets/icons/ArrowUpIcon.svelte";
  import expensesChart from "$lib/assets/images/charts/expenses-chart.png";
  import revenueChart from "$lib/assets/images/charts/revenue-chart.png";

  let graphSelect;

  let totalSalesChartElement;
  let totalSalesChartOptions = {
    series: [
      {
        name: "This Month",
        color: "#ffffff",
        data: Object.keys(data.statistics.sales_per_day).map((sale) => {
          return {
            x: sale,
            y: data.statistics.sales_per_day[sale],
          };
        }),
      },
      {
        name: "Previous Month",
        color: "#FFFFFF30",
        data: Object.keys(data.lastMonthStatistics.sales_per_day).map(
          (sale) => {
            return {
              x: sale,
              y: data.lastMonthStatistics.sales_per_day[sale],
            };
          },
        ),
      },
    ],
    xaxis: {
      categories: ["3", "6", "9", "12", "15", "18", "21", "24", "27", "30"],
      crosshairs: {
        stroke: {
          color: "#FFFFFF30",
          width: 1,
          dashArray: 5,
        },
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#BCBCBC",
          fontSize: "10px",
          fontFamily: "Montserrat Variable, sans-serif",
          fontWeight: 400,
        },
        formatter: function (val) {
          return String(val).padStart(2, "0");
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#BCBCBC",
          fontSize: "10px",
          fontFamily: "Montserrat Variable, sans-serif",
          fontWeight: 400,
        },
        offsetX: -15,
        formatter: function (val) {
          if (val > 1000) {
            return "£" + val / 1000 + "k";
          }

          return "£" + val;
        },
      },
    },
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
      dashArray: [0, 8],
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    grid: {
      borderColor: "#E0E0E0",
      strokeDashArray: 5,
    },

    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  let totalPieChartElement;
  let totalPieChartOptions = {
    series: [600, 800, 500],
    labels: ["StockX", "eBay", "Other"],
    colors: ["#322FC8", "#E73F76", "#39056C"],
    chart: {
      height: 380,
      type: "pie",
    },
    stroke: {
      show: false,
    },
    theme: {
      mode: "dark",
    },
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };

  onMount(() => {
    import("apexcharts").then((module) => {
      const ApexCharts = module.default;

      let totalSalesChart = new ApexCharts(
        totalSalesChartElement,
        totalSalesChartOptions,
      );
      totalSalesChart.render();

      graphSelect.addEventListener("change", (e) => {
        e.preventDefault();

        const options = [e.target[0], e.target[1]];

        const toToggle = options.filter((target) => !target.selected)[0].value;

        const selected = options.filter((target) => target.selected)[0].value;

        console.log(toToggle);

        totalSalesChart.toggleSeries(toToggle);
        totalSalesChart.toggleSeries(selected);
      });

      let totalPieChart = new ApexCharts(
        totalPieChartElement,
        totalPieChartOptions,
      );
      totalPieChart.render();
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
      <div class="col-xl-8">
        <div class="chart-card mb-4">
          <div
            class="d-flex flex-wrap align-items-center justify-content-between"
          >
            <div class="pe-2">
              <p class="chart-card__large-text mb-1">Total Sales</p>
              <h2>
                £{data.statistics.revenue}
                <span class="chart-card__regular-text success fw-regular"
                  ><span class="inline-icon me-1"
                    ><svelte:component this={TradeUpIcon} /></span
                  > 13.02%</span
                >
              </h2>
            </div>
            <select
              class="chart-card__select"
              id="graph-select"
              bind:this={graphSelect}
            >
              <option value="This Month" selected>This Month</option>
              <option value="Previous Month">Previous Month</option>
            </select>
          </div>
          <div bind:this={totalSalesChartElement}></div>
        </div>
        <div class="row">
          <div class="col-xxl-6 mb-4">
            <div class="chart-card d-flex h-100">
              <div
                class="pie-chart m-auto"
                bind:this={totalPieChartElement}
              ></div>
            </div>
          </div>
          <div class="col-xxl-6 mb-4">
            <div class="chart-card">
              <div class="row">
                <div class="col-sm-6 mb-3 mb-md-0">
                  <div class="inner-chart-card">
                    <div class="inner-chart-card__body">
                      <p class="chart-card__large-text mb-1">Lifetime Sales</p>
                      <h3 class="chart-card__title">
                        {data.statistics.num_sales}
                      </h3>
                      <p class="chart-card__regular-text success mt-1">
                        + 12% from last year
                      </p>
                    </div>
                  </div>
                  <div class="inner-chart-card mt-3">
                    <div class="inner-chart-card__body">
                      <p class="chart-card__large-text mb-1">
                        Lifetime Expenses
                      </p>
                      <h3 class="chart-card__title">
                        {data.statistics.total_expenses}
                      </h3>
                      <p class="chart-card__regular-text danger mt-1">
                        + 14% from last month
                      </p>
                    </div>
                    <img
                      class="w-100"
                      src={expensesChart}
                      alt="expenses chart"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="inner-chart-card bg-danger">
                    <div class="inner-chart-card__body">
                      <p class="chart-card__large-text mb-1">
                        Lifetime Revenue
                      </p>
                      <h3 class="chart-card__title">
                        {data.statistics.total_sales}
                      </h3>
                      <span class="badge">
                        15% <svelte:component this={ArrowDownIcon} />
                      </span>
                    </div>
                    <img
                      class="w-100"
                      src={revenueChart}
                      alt="expenses chart"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                  <div class="inner-chart-card bg-success mt-3">
                    <div class="inner-chart-card__body">
                      <p class="chart-card__large-text mb-1">Lifetime Profit</p>
                      <h3 class="chart-card__title mb-1">
                        {data.statistics.total_sales -
                          data.statistics.total_expenses}
                      </h3>
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <span class="badge">
                          12% <svelte:component this={ArrowUpIcon} />
                        </span>
                        <span class="chart-icon">
                          <svelte:component this={ChartIcon} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="row">
          <div class="col-sm-6 col-xl-12 col-xxl-6 mb-4">
            <div class="chart-card">
              <span class="chart-card__icon">
                <svelte:component this={BagCheckedIcon} />
              </span>
              <p class="chart-card__regular-text mt-3">Current Inventory</p>
              <h2 class="chart-card__title my-2">
                {data.statistics.total_inventory}
              </h2>
              <p class="chart-card__small-text">
                <span class="success"
                  ><span class="inline-icon me-1"
                    ><svelte:component this={TradeUpIcon} /></span
                  > 13.02%</span
                > Last Month
              </p>
            </div>
          </div>
          <div class="col-sm-6 col-xl-12 col-xxl-6 mb-4">
            <div class="chart-card">
              <span class="chart-card__icon">
                <svelte:component this={BagCheckedIcon} />
              </span>
              <p class="chart-card__regular-text mt-3">Units Sold</p>
              <h2 class="chart-card__title my-2">
                {data.statistics.num_sales}
              </h2>
              <p class="chart-card__small-text">
                <span class="success"
                  ><span class="inline-icon me-1"
                    ><svelte:component this={TradeUpIcon} /></span
                  > 13.02%</span
                > Last Month
              </p>
            </div>
          </div>
          <div class="col-sm-6 col-xl-12 col-xxl-6 mb-4">
            <div class="chart-card">
              <span class="chart-card__icon">
                <svelte:component this={WalletCashIcon} />
              </span>
              <p class="chart-card__regular-text mt-3">Inventory Value</p>
              <h2 class="chart-card__title my-2">
                £{data.statistics.inventory_value}
              </h2>
              <p class="chart-card__small-text">
                <span class="success"
                  ><span class="inline-icon me-1"
                    ><svelte:component this={TradeUpIcon} /></span
                  > 13.02%</span
                > From May
              </p>
            </div>
          </div>
          <div class="col-sm-6 col-xl-12 col-xxl-6 mb-4">
            <div class="chart-card">
              <span class="chart-card__icon">
                <svelte:component this={WalletIcon} />
              </span>
              <p class="chart-card__regular-text mt-3">Revenue</p>
              <h2 class="chart-card__title my-2">£{data.statistics.revenue}</h2>
              <p class="chart-card__small-text">
                <span class="success"
                  ><span class="inline-icon me-1"
                    ><svelte:component this={TradeUpIcon} /></span
                  > 13.02%</span
                > From May
              </p>
            </div>
          </div>
          <div class="col-sm-6 col-xl-12 col-xxl-6 mb-4">
            <div class="chart-card">
              <span class="chart-card__icon">
                <svelte:component this={WalletIcon} />
              </span>
              <p class="chart-card__regular-text mt-3">Gross Profit</p>
              <h2 class="chart-card__title my-2">
                £{data.statistics.gross_profit}
              </h2>
              <p class="chart-card__small-text">
                <span class="success"
                  ><span class="inline-icon me-1"
                    ><svelte:component this={TradeUpIcon} /></span
                  > 13.02%</span
                > From May
              </p>
            </div>
          </div>
          <div class="col-sm-6 col-xl-12 col-xxl-6 mb-4">
            <div class="chart-card">
              <span class="chart-card__icon">
                <svelte:component this={WalletIcon} />
              </span>
              <p class="chart-card__regular-text mt-3">Net Profit</p>
              <h2 class="chart-card__title my-2">
                £{data.statistics.net_profit}
              </h2>
              <p class="chart-card__small-text">
                <span class="success"
                  ><span class="inline-icon me-1"
                    ><svelte:component this={TradeUpIcon} /></span
                  > 13.02%</span
                > From May
              </p>
            </div>
          </div>
          <div class="col-sm-6 col-xl-12 col-xxl-6 mb-4">
            <div class="chart-card">
              <span class="chart-card__icon">
                <svelte:component this={WalletIcon} />
              </span>
              <p class="chart-card__regular-text mt-3">Lifetime Income</p>
              <h2 class="chart-card__title my-2">
                £{data.statistics.total_sales}
              </h2>
              <p class="chart-card__small-text">
                <span class="success"
                  ><span class="inline-icon me-1"
                    ><svelte:component this={TradeUpIcon} /></span
                  > 13.02%</span
                > From May
              </p>
            </div>
          </div>
          <div class="col-sm-6 col-xl-12 col-xxl-6 mb-4">
            <div class="chart-card">
              <span class="chart-card__icon">
                <svelte:component this={WalletIcon} />
              </span>
              <p class="chart-card__regular-text mt-3">Lifetime Expenses</p>
              <h2 class="chart-card__title my-2">
                £{data.statistics.total_expenses}
              </h2>
              <p class="chart-card__small-text">
                <span class="danger"
                  ><span class="inline-icon me-1"
                    ><svelte:component this={TradeUpIcon} /></span
                  > 13.02%</span
                > From May
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .chart-card {
    padding: 15px 20px;
    background-color: #000000;
    border: 2px solid var(--color-border);
    border-radius: 15px;
  }

  .inner-chart-card {
    background-color: #000000;
    border: 1px solid #535353;
    border-radius: 13px;
  }

  .inner-chart-card__body {
    padding: 16px;
  }

  .chart-card__select {
    --_padding-inline: 9px;
    --_arrow-size: 16px;
    -webkit-appearance: initial;
    -moz-appearance: initial;
    appearance: initial;
    font-size: 12px;
    color: #000000;
    background-color: #f7f7f7;
    border: 0;
    border-radius: 9px;
    padding: var(--_padding-inline);
    padding-right: calc(var(--_padding-inline) + var(--_arrow-size));
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23000000' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708'/%3E%3C/svg%3E");
    background-position: calc(100% - (var(--_padding-inline) / 2)) center;
    background-repeat: no-repeat;
    background-size: var(--_arrow-size);
  }

  .chart-card__icon {
    --_size: 35px;
    width: var(--_size);
    height: var(--_size);
    font-size: 20px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 10px;
    color: #000000;
    background-color: #e8e8e8;
  }

  .chart-card__large-text {
    font-size: 18px;
  }

  .chart-card__regular-text {
    font-size: 13px;
  }

  .chart-card__title {
    font-size: 20px;
    font-weight: 700;
  }

  @media (min-width: 668px) {
    .chart-card__title {
      font-size: 28px;
    }
  }

  @media (min-width: 1800px) {
    .chart-card__title {
      font-size: 32px;
    }
  }

  .chart-card__small-text {
    font-size: 12px;
  }

  .inline-icon {
    display: inline-block;
  }

  .success {
    color: #1eab2c;
  }

  .danger {
    color: #c01616;
  }

  .bg-success {
    background-color: #166f00;
  }

  .bg-danger {
    background-color: #ff0000;
  }

  .badge {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    gap: 6px;
    padding: 4px 7px;
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 7px;
  }

  .chart-icon {
    font-size: 55px;
  }
</style>
