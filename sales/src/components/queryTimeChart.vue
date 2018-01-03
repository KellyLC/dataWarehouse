<template>
    <div class="chart">
        <IEcharts ref="chart" class="chart" :option="bar" @ready="onReady" />
    </div>
</template>

<script type="text/ecmascript-6">
    import IEcharts from 'vue-echarts-v3/src/full.js';
    export default {
        data() {
            return {
                bar:{}
            }
        },
        components: {
            IEcharts
        },
        props: ['queryTimes', 'total'],
        methods: {
            onReady(instance, echarts) {
                console.log(this.queryTimes)
                const self = this
                self.ins = instance
                self.echarts = echarts
                self.bar = {
                    xAxis: {
                        data: [self.queryTimes[0].databaseType + '(ms)', self.queryTimes[1].databaseType + '(ms)', self.queryTimes[2].databaseType + '(ms)'],
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                interval: 0,
                                color: '#fff',
                                fontSize: 12
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        z: 10
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#999'
                            }
                        }
                    },
                    dataZoom: [{
                        type: 'inside'
                    }],
                    tooltip: {},
                    series: [{
                        type: 'bar',
                        data: [{
                                value: this.queryTimes[0].queryTime,
                                itemStyle: {
                                    normal: {
                                        color: '#9E9E9E'
                                    }
                                }
                            },
                            {
                                value: this.queryTimes[1].queryTime,
                                itemStyle: {
                                    normal: {
                                        color: '#757575'
                                    }
                                }
                            }, {
                                value: this.queryTimes[2].queryTime,
                                itemStyle: {
                                    normal: {
                                        color: '#616161'
                                    }
                                }
                            }
                        ]
                    }],
                    title: {
                        text: 'Query Time Compared',
                        x: 'center',
                        textStyle: {
                            //文字颜色
                            color: '#424242',
                            //字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 400,
                            //字体系列
                            fontFamily: 'sans-serif',
                        },
                        subtext: '共计查询' + this.total + '部电影',
                    }
                }
            },
            refreshData(data, databaseType, title) {
                var option = this.$refs.chart.getOption()
                switch (databaseType) {
                    case 'MySQL':
                        option.series[0].data[0].value = data
                        option.xAxis[0] = title + 'ms'
                        break
                    case 'Hive':
                        option.series[0].data[1].value = data
                        option.xAxis[1] = title + 'ms'
                        break
                    case 'HBase':
                        option.series[0].data[2].value = data
                        option.xAxis[2] = title + 'ms'
                        break
                }
                this.$refs.chart.setOption(option)
            }
        }
    }
</script>

<style>
    .chart {
        position: relative;
        height: 400px;
    }
</style>
