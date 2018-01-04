<template>
    <div class="page">
        <el-container id="container">
            <el-header style="background-color:#505F7C ">
            </el-header>
            <el-container>
                <el-aside style="border: 1px solid #eee">
                    <el-menu default-active="1" class="el-menu-vertical-demo" style="text-align: left; border: none" unique-opened>
                        <el-submenu index="1">
                            <div slot="title">
                                <i class="el-icon-document"></i>
                                <span slot="title">查询电影信息</span>
                            </div>
                            <el-menu-item-group>
                                <el-submenu index="1-1">
                                    <span slot="title">按时间查询</span>
                                    <el-submenu index="1-1-1">
                                        <span slot="title">根据年份查询</span>
                                        <el-menu-item index="1-1-1-1">
                                            <el-date-picker @change="emptySearchingParams('year')" v-model="year" style="width: 200px" align="right" type="year" placeholder="选择一个年份" size="small" :picker-options="pickerOption" default-value="2017-12-12" value-format="yyyy">
                                            </el-date-picker>
                                        </el-menu-item>
                                    </el-submenu>
                                    <el-submenu index="1-1-2">
                                        <span slot="title">根据季节查询</span>
                                        <el-menu-item index="1-1-2-1">
                                            <el-date-picker @change="emptySearchingParams('season')" v-model="seasonOfYear" style="width: 200px" align="right" type="year" placeholder="选择一个年份" size="small" :picker-options="pickerOption" default-value="2017-12-12" value-format="yyyy">
                                            </el-date-picker>
                                        </el-menu-item>
                                        <el-checkbox-group v-model="season" @change="emptySearchingParams('season')">
                                            <el-menu-item index="1-1-2-2">
                                                <el-checkbox label="春季"></el-checkbox>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-2-3">
                                                <el-checkbox label="夏季"></el-checkbox>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-2-4">
                                                <el-checkbox label="秋季"></el-checkbox>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-2-5">
                                                <el-checkbox label="冬季"></el-checkbox>
                                            </el-menu-item>
                                        </el-checkbox-group>
                                    </el-submenu>
                                    <el-submenu index="1-1-3">
                                        <span slot="title">根据月份查询</span>
                                        <el-menu-item index="1-1-3-1">
                                            <el-date-picker @change="emptySearchingParams('month')" v-model="month" style="width: 200px" align="right" type="month" placeholder="选择一个月份" size="small" :picker-options="pickerOption" default-value="2017-12-12" value-format="yyyy-MM">
                                            </el-date-picker>
                                        </el-menu-item>
                                    </el-submenu>
                                    <el-submenu index="1-1-4">
                                        <span slot="title">根据星期查询</span>
                                        <el-menu-item index="1-1-4-1">
                                            <el-date-picker @change="emptySearchingParams('date')" v-model="weekdayOfYearMonth" style="width: 200px" align="right" type="month" format="yyyy-MM" placeholder="选择一个年份" size="small" :picker-options="pickerOption" value-format="yyyy-MM">
                                            </el-date-picker>
                                        </el-menu-item>
                                        <el-checkbox-group v-model="weekday" @change="emptySearchingParams('date')">
                                            <el-menu-item index="1-1-4-2">
                                                <el-checkbox label="周一"></el-checkbox>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-4-3">
                                                <el-checkbox label="周二"></el-checkbox>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-4-4">
                                                <el-checkbox label="周三"></el-checkbox>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-4-5">
                                                <el-checkbox label="周四"></el-checkbox>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-4-6">
                                                <el-checkbox label="周五"></el-checkbox>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-4-7">
                                                <el-checkbox label="周六"></el-checkbox>
                                            </el-menu-item>
                                            <el-menu-item index="1-1-4-8">
                                                <el-checkbox label="周日"></el-checkbox>
                                            </el-menu-item>
                                        </el-checkbox-group>
                                    </el-submenu>
                                </el-submenu>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-submenu index="1-2">
                                    <span slot="title">按电影名称查询</span>
                                    <el-menu-item-group title="输入电影名称进行查询">
                                        <el-menu-item index="1-2-1">
                                            <el-input @change="emptySearchingParams('movieName')" placeholder="电影名称" prefix-icon="el-icon-search" v-model="inputMovie" size="small">
                                            </el-input>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-submenu index="1-3">
                                    <span slot="title">按导演名称查询</span>
                                    <el-menu-item-group title="输入导演名称进行查询">
                                        <el-menu-item index="1-3-1">
                                            <el-autocomplete v-model="inputDirector" @select="handleSelect" @change.native="emptySearchingParams('director')" prefix-icon="el-icon-search" :fetch-suggestions="querySearch" placeholder="导演" :trigger-on-focus="false" size="small"></el-autocomplete>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-submenu index="1-4">
                                    <span slot="title">按演员名称查询</span>
                                    <el-menu-item-group title="输入参演人员名称进行查询">
                                        <el-menu-item index="1-4-1">
                                            <el-autocomplete v-model="inputActor" @select="handleSelect" @change.native="emptySearchingParams('actor')" prefix-icon="el-icon-search" :fetch-suggestions="querySearch" placeholder="演员" :trigger-on-focus="false" size="small"></el-autocomplete>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-submenu index="1-5">
                                    <span slot="title">按电影类型查询</span>
                                    <el-menu-item-group title="输入电影类型进行查询">
                                        <el-menu-item index="1-5-1">
                                            <el-autocomplete v-model="inputType" @select="handleSelect" @change.native="emptySearchingParams('type')" prefix-icon="el-icon-search" :fetch-suggestions="querySearch" placeholder="电影类型" :trigger-on-focus="false" size="small"></el-autocomplete>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-submenu index="1-6">
                                    <span slot="title">按电影排名查询</span>
                                    <el-menu-item-group title="选择电影排名下限（0-25000名）">
                                        <el-menu-item index="1-7-1">
                                            <el-input-number v-model="inputRank.min" @change="emptySearchingParams('rank')" :min="0" :max="25000" size="small"></el-input-number>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                    <el-menu-item-group title="选择电影排名上限（0-25000名）">
                                        <el-menu-item index="1-7-2">
                                            </el-input>
                                            <el-input-number v-model="inputRank.max" @change="emptySearchingParams('rank')" :min="inputRank.min" :max="25000" size="small"></el-input-number>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-submenu index="1-7">
                                    <span slot="title">按电影评分查询</span>
                                    <el-menu-item-group title="选择电影评分下限（0-50分）">
                                        <el-menu-item index="1-7-1">
                                            <el-input-number v-model="inputMark.min" @change="emptySearchingParams('mark')" :min="0" :max="50" size="small"></el-input-number>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                    <el-menu-item-group title="选择电影评分上限（0-50分）">
                                        <el-menu-item index="1-7-2">
                                            <el-input-number v-model="inputMark.max" @change="emptySearchingParams('mark')" :min="inputMark.min" :max="50" size="small"></el-input-number>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-submenu index="1-8">
                                    <span slot="title">组合查询</span>
                                    <el-submenu index="1-8-1">
                                        <span slot="title">高级查询1</span>
                                        <el-menu-item-group title="按演员和导演进行查询">
                                            <el-menu-item index="1-8-1-1">
                                                <el-autocomplete v-model="combinedSearch1.director" @select="handleSelect" @change.native="emptySearchingParams('combinedSearch1')" prefix-icon="el-icon-search" :fetch-suggestions="querySearch" placeholder="导演" :trigger-on-focus="false" size="small"></el-autocomplete>
                                            </el-menu-item>
                                            <el-menu-item index="1-8-1-2">
                                                <el-autocomplete v-model="combinedSearch1.actor" @select="handleSelect" @change.native="emptySearchingParams('combinedSearch1')" prefix-icon="el-icon-search" :fetch-suggestions="querySearch" placeholder="演员" :trigger-on-focus="false" size="small"></el-autocomplete>
                                            </el-menu-item>
                                        </el-menu-item-group>
                                    </el-submenu>
                                    <el-submenu index="1-8-2">
                                        <span slot="title">高级查询2</span>
                                        <el-menu-item-group title="按演员和年份进行查询">
                                            <el-menu-item index="1-8-2-1">
                                                <el-autocomplete v-model="combinedSearch2.actor" @select="handleSelect" @change.native="emptySearchingParams('combinedSearch2')" prefix-icon="el-icon-search" :fetch-suggestions="querySearch" placeholder="演员" :trigger-on-focus="false" size="small"></el-autocomplete>
                                            </el-menu-item>
                                            <el-menu-item index="1-8-2-2">
                                                <el-date-picker @change="emptySearchingParams('combinedSearch2')" v-model="combinedSearch2.year" style="width: 172px;" type="year" placeholder="选择一个年份" size="small" :picker-options="pickerOption" default-value="2017-12-12" value-format="yyyy">
                                                </el-date-picker>
                                            </el-menu-item>
                                        </el-menu-item-group>
                                    </el-submenu>
                                </el-submenu>
                            </el-menu-item-group>
                            <el-button size="default" type="text" style="position: relative; margin: 0 5%; float: right" @click="searchMovies">查询</el-button>
                        </el-submenu>
                        <el-menu-item index="2" @click="enterOrderPage">
                            <div slot="title">
                                <i class="el-icon-search"></i>
                                <span slot="title">查看历史订单</span>
                            </div>
                        </el-menu-item>
                        <el-menu-item index="3" @click="enterInfoPage">
                            <i class="el-icon-setting"></i>
                            <span slot="title">修改个人信息</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div v-if="ifChartShows" style="height: 60%">
                        <query-time-chart :queryTimes="queryTimes" :total="total"></query-time-chart>
                    </div>
                    <el-collapse-transition>
                        <div v-show="ifMovieQueryShow">
                            <el-table v-loading="loading" :height="700" :data="searchResult" style="width: 100%; text-align: left">
                                <el-table-column type="expand">
                                    <div slot-scope="searchResult">
                                        <el-form label-position="left">
                                            <el-form-item label="ASIN：">
                                                <span>{{ searchResult.row.ASIN }}</span>
                                            </el-form-item>
                                            <el-form-item label="电影名称：">
                                                <span>{{ searchResult.row.title }}</span>
                                            </el-form-item>
                                            <el-form-item label="发行日期：">
                                                <span>{{ searchResult.row.release_date }}</span>
                                            </el-form-item>
                                            <el-form-item label="主要演员：">
                                                <span>{{ searchResult.row.actors }}</span>
                                            </el-form-item>
                                            <el-form-item label="版本：">
                                                <span>{{ searchResult.row.format_all_json }}</span>
                                            </el-form-item>
                                            <el-form-item label="销量排名：">
                                                <span>{{ searchResult.row.ranking }}</span>
                                            </el-form-item>
                                            <el-form-item label="类别：">
                                                <span>{{ searchResult.row.categories }}</span>
                                            </el-form-item>
                                            <el-form-item label="快照id：">
                                                <span>{{ searchResult.row.snapshot_id }}</span>
                                            </el-form-item>
                                            <el-form-item v-if="ifSearchByOtherFactors" label="所有数据：">
                                                <span>{{ searchResult.row }}</span>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </el-table-column>
                                <el-table-column label="电影名称" prop="title">
                                </el-table-column>
                                <el-table-column label="发行日期" prop="release_date">
                                </el-table-column>
                                <el-table-column label="主要演员" prop="actors">
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="100">
                                    <div slot-scope="scope">
                                        <el-button @click="movieBuying(scope.row)" type="text" size="small">购买</el-button>
                                    </div>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-transition>
                    <el-collapse-transition>
                        <div v-show="ifHitoryOrderShow">
                            <!-- <el-table :data="searchResult" style="width: 100%; text-align: left"> -->
                            <el-table :data="historyOrders" style="width: 100%; text-align: left">
                                <el-table-column type="expand">
                                    <div slot-scope="searchResult">
                                        <el-form label-position="left">
                                            <el-form-item label="ASIN：">
                                                <span>{{ searchResult.row.ASIN }}</span>
                                            </el-form-item>
                                            <el-form-item label="电影名称：">
                                                <span>{{ searchResult.row.title }}</span>
                                            </el-form-item>
                                            <el-form-item label="发行日期：">
                                                <span>{{ searchResult.row.release_date }}</span>
                                            </el-form-item>
                                            <el-form-item label="主要演员：">
                                                <span>{{ searchResult.row.actors }}</span>
                                            </el-form-item>
                                            <el-form-item label="版本：">
                                                <span>{{ searchResult.row.format_all_json }}</span>
                                            </el-form-item>
                                            <el-form-item label="销量排名：">
                                                <span>{{ searchResult.row.ranking }}</span>
                                            </el-form-item>
                                            <el-form-item label="类别：">
                                                <span>{{ searchResult.row.categories }}</span>
                                            </el-form-item>
                                            <el-form-item label="快照id：">
                                                <span>{{ searchResult.row.snapshot_id }}</span>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </el-table-column>
                                <el-table-column label="订单ID" prop="id">
                                </el-table-column>
                                <el-table-column label="订单名" prop="title">
                                </el-table-column>
                                <el-table-column label="订单描述" prop="description">
                                </el-table-column>
                                <el-table-column label="订单地址" prop="address">
                                </el-table-column>
                                <el-table-column label="电影ID" prop="productId">
                                </el-table-column>
                                <el-table-column label="价格" prop="price">
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="100">
                                    <div slot-scope="scope">
                                        <el-button @click="orderReturns(scope.row)" type="text" size="small">退货</el-button>
                                        <el-button @click="feedbackVisible=true" type="text" size="small">投诉</el-button>
                                            <el-dialog title="反馈" :visible.sync="feedbackVisible">
                                                <el-form :model="feedbackData">
                                                    <el-form-item label="反馈标题" label-width="120">
                                                    <el-input v-model="feedbackData.title"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="反馈内容" label-width="120">
                                                        <el-input v-model="feedbackData.content"></el-input>
                                                    </el-form-item>
                                                </el-form>
                                                <div slot="footer" class="dialog-footer">
                                                    <el-button @click="feedbackVisible = false">取 消</el-button>
                                                    <el-button type="primary" @click="createFeedback()">确 定</el-button>
                                                </div>
                                            </el-dialog>
                                    </div>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-transition>
                    <el-collapse-transition>
                        <div v-show="ifInfoShow">
                            <div id="userInfo">
                                <h1 id="user-name">{{username}}</h1>
                                <p id="introduction">{{introduction}}</p>
                            </div>
                            <el-collapse style="text-align: left;">
                                <el-collapse-item title="修改简介" name="1">
                                    <el-button class="button-font" type="text" @click="changeIntroduction">修改简介</el-button>
                                </el-collapse-item>
                                <el-collapse-item title="修改密码" name="2">
                                    <el-button class="button-font" type="text" @click="dialogFormVisible = true">修改密码</el-button>
                                </el-collapse-item>
                                <div>
                                    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
                                        旧密码
                                        <el-input v-model="form.oldPwd" auto-complete="off" placeholder="请输入您的旧密码"></el-input>
                                        <p> </p>
                                        新密码
                                        <el-input v-model="form.newPwd" auto-complete="off" placeholder="请输入您的新密码"></el-input>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="changePwd">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                            </el-collapse>
                        </div>
                    </el-collapse-transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
    import Actor from '../js/Actor.json'
    import Category from '../js/Category.json'
    import Director from '../js/Director.json'
    import Movie from '../js/Movie.json'
    import queryTimeChart from './queryTimeChart.vue'
    export default {
        data() {
            return {
                year: '',
                season: [],
                seasonOfYear: '',
                weekday: [],
                weekdayOfYearMonth: '',
                month: '',
                week: '',
                pickerOption: {
                    disabledDate(time) {
                        let now = Date.now()
                        let cur = time.getTime()
                        let timeSpace = cur > now
                        return timeSpace
                    }
                },
                inputMovie: '',
                inputDirector: '',
                inputActor: '',
                inputType: '',
                inputRank: {
                    min: 0,
                    max: 0
                },
                inputMark: {
                    min: 0,
                    max: 0
                },
                combinedSearch1: {
                    director: '',
                    actor: ''
                },
                combinedSearch2: {
                    year: '',
                    actor: ''
                },
                searchResult: [],
                paramFlags: [],
                isCollapse: false,
                ifMovieQueryShow: true,
                ifHitoryOrderShow: false,
                ifInfoShow: false,
                username: "bibi",
                introduction: "个人简介",
                dialogFormVisible: false,
                dialogVisible: false,
                form: {
                    oldPwd: '',
                    verificationCode: '',
                    newPwd: ''
                },
                dialogImageUrl: '',
                queryTimes: [{
                    databaseType: 'MySQL',
                    queryTime: 0
                }, {
                    databaseType: 'Hive',
                    queryTime: 0
                }, {
                    databaseType: 'HBase',
                    queryTime: 0
                }],
                ifSearchByOtherFactors: false,
                ifClickSuggestionList: false,
                loading: false,
                ifChartShows: false,
                total: 0,
                historyOrders: [],
                feedTitle: '',
                feedContent: '',
                feedbackVisible: false,
                feedbackData: {
                    content: '',
                    title: ''
                },
            }
        },
        components: {
            'query-time-chart': queryTimeChart,
        },
        methods: {
            searchMovies: function() {
                let self = this
                var searchParam
                var flags = self.paramFlags
                //清空上次搜索结果
                this.searchResult = []
                //清空上次记录的查询时间
                for (var i = 0; i < this.queryTimes.length; i++) {
                    this.queryTimes[i].queryTime = 0
                }
                this.queryTimes[1].databaseType = 'Hive'
                //增加遮罩
                this.loading = true
                //清空图像
                this.ifChartShows = false
                //根据其他因素查询电影
                function searchMoviesAccordingToOtherFactors(urlBottom, data) {
                    self.ifSearchByOtherFactors = true
                    //使用mysql查询获取数据和查询时间
                    $.ajax({
                        crossDomain: true,
                        contentType: 'application/json;charset=UTF-8',
                        url: self.urlHeader + '/api/m/' + urlBottom,
                        data: data,
                        type: 'post',
                        success: function(data) {
                            console.log(data)
                            //拿到数据
                            if (data.movies) {
                                self.searchResult = data.movies
                            } else if (data.movie) {
                                self.searchResult = data.movie
                            } else {
                                self.searchResult = data.staring
                                for (var i in data.supporting) {
                                    self.searchResult.push(i)
                                }
                            }
                            //拿到查询花费时间
                            self.queryTimes[0].queryTime = parseInt(data.queryTime.substring(0, data.queryTime.length - 2))
                            //裁剪数据至50条
                            self.total = self.searchResult.length
                            if (self.searchResult.length > 50) {
                                self.searchResult = self.searchResult.slice(0, 49)
                            }
                            //检查是否HBase无法进行查询
                            if (self.queryTimes[2].databaseType != "HBase") {
                                    self.ifChartShows = true
                                    self.loading = false
                                }
                        },
                        error: function(err) {
                            console.log(err)
                        },
                        dataType: 'json',
                    })
                    //HBASE查询获取查询时间
                    $.ajax({
                        crossDomain: true,
                        contentType: 'application/json;charset=UTF-8',
                        url: self.urlHeader + '/api/p/' + urlBottom,
                        data: data,
                        type: 'post',
                        success: function(data) {
                            console.log(data)
                            //拿到查询花费时间
                            if (data.Error) {
                                self.queryTimes[2].queryTime = -1
                                self.queryTimes[2].databaseType = data.Error
                            } else {
                                //拿到查询花费时间
                                self.queryTimes[2].queryTime = parseInt(data.queryTime.substring(0, data.queryTime.length - 2))
                                //如果hive不支持该查询
                                if (self.queryTimes[1].databaseType != "Hive") {
                                    self.ifChartShows = true
                                    self.loading = false
                                }
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            //TODO: 处理status， http status code，超时 408
                            // 注意：如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能
                            //是"timeout", "error", "notmodified" 和 "parsererror"
                            self.queryTimes[2].queryTime = -1
                            if (textStatus == "timeout") {
                                self.queryTimes[2].databaseType = "HBase查询timeout"
                            } else {
                                self.queryTimes[2].databaseType = "网络错误"
                            }
                        },
                        dataType: 'json',
                    })
                    //HIVE查询获取查询时间
                    $.ajax({
                        crossDomain: true,
                        contentType: 'application/json;charset=UTF-8',
                        url: self.urlHeader + '/api/h/' + urlBottom,
                        data: data,
                        type: 'post',
                        success: function(data) {
                            console.log(data)
                            if (data.Error) {
                                self.queryTimes[1].queryTime = -1
                                self.queryTimes[1].databaseType = data.Error
                            } else {
                                //拿到查询花费时间
                                self.queryTimes[1].queryTime = parseInt(data.queryTime.substring(0, data.queryTime.length - 2))
                                self.loading = false
                                self.ifChartShows = true
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            //TODO: 处理status， http status code，超时 408
                            // 注意：如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能
                            //是"timeout", "error", "notmodified" 和 "parsererror"
                            self.loading = false
                            self.queryTimes[1].queryTime = -1
                            if (textStatus == "timeout") {
                                self.queryTimes[1].databaseType = "Hive查询timeout"
                            } else {
                                self.queryTimes[1].databaseType = "网络错误"
                            }
                        },
                        dataType: 'json',
                        timeout: 50000,
                    })
                    //Neo4j查询获取查询时间
                    $.ajax({
                        crossDomain: true,
                        contentType: 'application/json;charset=UTF-8',
                        url: self.urlHeader + '/api/n/' + urlBottom,
                        data: data,
                        type: 'post',
                        success: function(data) {
                            console.log(data)
                            //拿到查询花费时间
                            // self.queryTimes.push({
                            //     databaseType: data.databaseType,
                            //     queryTime: data.queryTime
                            // })
                        },
                        error: function(err) {
                            console.log(err)
                        },
                        dataType: 'json',
                    })
                }
                //根据时间查询电影
                function searchMoviesAccordingToTime(urlBottom, year, season, month, day) {
                    self.ifSearchByOtherFactors = false
                    //使用mysql查询获取数据和查询时间
                    $.ajax({
                        crossDomain: true,
                        contentType: 'application/json;charset=UTF-8',
                        // url: this.urlHeader + '/api/m/year',
                        url: self.urlHeader + '/api/m/' + urlBottom,
                        data: JSON.stringify({
                            year: year,
                            season: season,
                            month: month,
                            day: day,
                        }),
                        type: 'post',
                        success: function(data) {
                            console.log(data)
                            //拿到数据
                            if (data.movies) {
                                self.searchResult = data.movies
                            } else {
                                self.searchResult = data.movie
                            }
                            //拿到查询花费时间
                            self.queryTimes[0].queryTime = parseInt(data.queryTime.substring(0, data.queryTime.length - 2))
                            //裁剪数据
                            if(self.searchResult.length > 50) {
                                self.searchResult = self.searchResult.slice(0, 49)
                            }
                        },
                        error: function(err) {
                            console.log(err)
                        },
                        dataType: 'json',
                    })
                    //HBASE查询获取查询时间
                    $.ajax({
                        crossDomain: true,
                        contentType: 'application/json;charset=UTF-8',
                        // url: this.urlHeader + '/api/p/year',
                        url: self.urlHeader + '/api/p/' + urlBottom,
                        data: JSON.stringify({
                            year: year,
                            season: season,
                            month: month,
                            day: day,
                        }),
                        type: 'post',
                        success: function(data) {
                            console.log(data)
                            //拿到查询花费时间
                            if (data.Error) {
                                self.queryTimes[2].queryTime = -1
                                self.queryTimes[2].databaseType = data.Error
                            } else {
                                //拿到查询花费时间
                                self.queryTimes[2].queryTime = parseInt(data.queryTime.substring(0, data.queryTime.length - 2))
                                //如果hive不支持该查询
                                if (self.queryTimes[1].databaseType != "Hive") {
                                    self.ifChartShows = true
                                    self.loading = false
                                }
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            //TODO: 处理status， http status code，超时 408
                            // 注意：如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能
                            //是"timeout", "error", "notmodified" 和 "parsererror"
                            self.queryTimes[2].queryTime = -1
                            if (textStatus == "timeout") {
                                self.queryTimes[2].databaseType = "HBase查询timeout"
                            } else {
                                self.queryTimes[2].databaseType = "网络错误"
                            }
                        },
                        dataType: 'json',
                    })
                    //HIVE查询获取查询时间
                    $.ajax({
                        crossDomain: true,
                        contentType: 'application/json;charset=UTF-8',
                        // url: this.urlHeader + '/api/h/year',
                        url: self.urlHeader + '/api/h/' + urlBottom,
                        data: JSON.stringify({
                            year: year,
                            season: season,
                            month: month,
                            day: day,
                        }),
                        type: 'post',
                        success: function(data) {
                            console.log(data)
                            if (data.Error) {
                                self.queryTimes[1].queryTime = -1
                                self.queryTimes[1].databaseType = data.Error
                            } else {
                                //拿到查询花费时间
                                self.queryTimes[1].queryTime = parseInt(data.queryTime.substring(0, data.queryTime.length - 2))
                                self.loading = false
                                self.ifChartShows = true
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            //TODO: 处理status， http status code，超时 408
                            // 注意：如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能
                            //是"timeout", "error", "notmodified" 和 "parsererror"
                            self.loading = false
                            self.queryTimes[1].queryTime = -1
                            if (textStatus == "timeout") {
                                self.queryTimes[1].databaseType = "Hive查询timeout"
                            } else {
                                self.queryTimes[1].databaseType = "网络错误"
                            }
                        },
                        dataType: 'json',
                        timeout: 50000,
                    })
                    //Neo4j查询获取查询时间
                    $.ajax({
                        crossDomain: true,
                        contentType: 'application/json;charset=UTF-8',
                        // url: this.urlHeader + '/api/n/year',
                        url: self.urlHeader + '/api/n/' + urlBottom,
                        data: JSON.stringify({
                            year: year,
                            season: season,
                            month: month,
                            day: day,
                        }),
                        type: 'post',
                        success: function(data) {
                            console.log(data)
                            //拿到查询花费时间
                            // self.queryTimes.push({
                            //     databaseType: data.databaseType,
                            //     queryTime: data.queryTime
                            // })
                        },
                        error: function(err) {
                            console.log(err)
                        },
                        dataType: 'json',
                    })
                }
                if (!flags[0]) {
                    //根据年份查找电影并且将拿到的值赋给searchresult
                    searchMoviesAccordingToTime('year', parseInt(this.year), [false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false])
                } else if (!flags[1]) {
                    //根据季节查找电影并且将拿到的值赋给searchresult
                    //检查必要条件
                    if (this.season.length == 0) {
                        alert("请至少选择一个季节！")
                        return
                    } else if (this.seasonOfYear.length == 0) {
                        alert("请选择一个年份进行查询！")
                        return
                    }
                    //根据填入的季节填写传递参数
                    var seasonChosen = [false, false, false, false]
                    if (this.season.indexOf("春季") + 1) {
                        seasonChosen[0] = true
                    }
                    if (this.season.indexOf("夏季") + 1) {
                        seasonChosen[1] = true
                    }
                    if (this.season.indexOf("秋季") + 1) {
                        seasonChosen[2] = true
                    }
                    if (this.season.indexOf("冬季") + 1) {
                        seasonChosen[3] = true
                    }
                    searchMoviesAccordingToTime('year/season', parseInt(this.seasonOfYear), seasonChosen, [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false])
                } else if (!flags[2]) {
                    //根据月查找电影并且将拿到的值赋给searchresult
                    //解析年月
                    var time = self.month.split('-')
                    var monthChosen = [false, false, false, false, false, false, false, false, false, false, false, false]
                    monthChosen[parseInt(time[1]) - 1] = true
                    searchMoviesAccordingToTime('year/month', parseInt(time[0]), [false, false, false, false], monthChosen, [false, false, false, false, false, false, false])
                } else if (!flags[3]) {
                    //解析年月
                    var time = self.weekdayOfYearMonth.split('-')
                    var monthChosen = [false, false, false, false, false, false, false, false, false, false, false, false]
                    monthChosen[parseInt(time[1]) - 1] = true
                    //根据填入的weekday填写传递参数
                    var weekdayChosen = [false, false, false, false, false, false, false]
                    if (this.weekday.indexOf("周一") + 1) {
                        weekdayChosen[0] = true
                    }
                    if (this.weekday.indexOf("周二") + 1) {
                        weekdayChosen[1] = true
                    }
                    if (this.weekday.indexOf("周三") + 1) {
                        weekdayChosen[2] = true
                    }
                    if (this.weekday.indexOf("周四") + 1) {
                        weekdayChosen[3] = true
                    }
                    if (this.weekday.indexOf("周五") + 1) {
                        weekdayChosen[4] = true
                    }
                    if (this.weekday.indexOf("周六") + 1) {
                        weekdayChosen[5] = true
                    }
                    if (this.weekday.indexOf("周日") + 1) {
                        weekdayChosen[6] = true
                    }
                    //根据日查找电影并且将拿到的值赋给searchresult
                    searchMoviesAccordingToTime('year/month/day', parseInt(time[0]), [false, false, false, false], monthChosen, weekdayChosen)
                } else if (!flags[4]) {
                    //根据电影名查找电影并且将拿到的值赋给searchresult
                    searchMoviesAccordingToOtherFactors('movie/name/like', JSON.stringify({
                        name: self.inputMovie
                    }))
                } else if (!flags[5]) {
                    //判断必要条件
                    if (!self.ifClickSuggestionList) {
                        alert("请在自动补全中选择")
                    }
                    //根据导演查找电影并且将拿到的值赋给searchresult
                    let directors = Director.director
                    for (var i = 0; i < directors.length; i++) {
                        if (directors[i].key == this.inputDirector) {
                            searchMoviesAccordingToOtherFactors('movie/director/id', JSON.stringify({
                                director_id: directors[i].id
                            }))
                        }
                    }
                } else if (!flags[6]) {
                    //判断必要条件
                    if (!self.ifClickSuggestionList) {
                        alert("请在自动补全中选择")
                    }
                    //根据演员查找电影并且将拿到的值赋给searchresult
                    let actors = Actor.actor
                    for (var i = 0; i < actors.length; i++) {
                        if (actors[i].key == this.inputActor) {
                            searchMoviesAccordingToOtherFactors('movie/actor/id', JSON.stringify({
                                actor_id: actors[i].id,
                                staring: true,
                                supporting: true
                            }))
                        }
                    }
                } else if (!flags[7]) {
                    //判断必要条件
                    if (!self.ifClickSuggestionList) {
                        alert("请在自动补全中选择")
                    }
                    //组合查询1
                    //根据演员查找电影并且将拿到的值赋给searchresult
                    let actors = Actor.actor
                    var actor_id = 0
                    for (var i = 0; i < actors.length; i++) {
                        if (actors[i].key == this.combinedSearch1.actor) {
                            actor_id = actors[i].id
                        }
                    }
                    //根据导演查找电影并且将拿到的值赋给searchresult
                    let directors = Director.director
                    var director_id = 0
                    for (var i = 0; i < directors.length; i++) {
                        if (directors[i].key == this.combinedSearch1.director) {
                            director_id = directors[i].id
                        }
                    }
                    searchMoviesAccordingToOtherFactors('movie/director/with/actor', JSON.stringify({
                        actor_id: parseInt(actor_id),
                        director_id: parseInt(director_id),
                    }))
                } else if (!flags[11]) {
                    //判断必要条件
                    if (!self.ifClickSuggestionList) {
                        alert("请在自动补全中选择")
                    }
                    //组合查询2
                    //根据演员查找电影并且将拿到的值赋给searchresult
                    let actors = Actor.actor
                    var actor_id
                    for (var i = 0; i < actors.length; i++) {
                        if (actors[i].key == this.combinedSearch2.actor) {
                            actor_id = actors[i].id
                        }
                    }
                    searchMoviesAccordingToOtherFactors('movie/actor/id/year', JSON.stringify({
                        actor_id: actor_id,
                        year: this.combinedSearch2.year,
                    }))
                } else if (!flags[8]) {
                    //判断必要条件
                    if (!self.ifClickSuggestionList) {
                        alert("请在自动补全中选择")
                    }
                    //根据电影类型查找电影并且将拿到的值赋给searchresult
                    let categories = Category.category
                    for (var i = 0; i < categories.length; i++) {
                        if (categories[i].key == this.inputType) {
                            searchMoviesAccordingToOtherFactors('movie/category/id', JSON.stringify({
                                category_id: categories[i].id
                            }))
                        }
                    }
                } else if (!flags[9]) {
                    //根据电影排名查找电影并且将拿到的值赋给searchresult
                    searchMoviesAccordingToOtherFactors('movie/ranking/between', JSON.stringify({
                        max: self.inputRank.max,
                        min: self.inputRank.min
                    }))
                } else if (!flags[10]) {
                    //根据电影排名查找电影并且将拿到的值赋给searchresult
                    searchMoviesAccordingToOtherFactors('movie/review/between', JSON.stringify({
                        max: self.inputMark.max,
                        min: self.inputMark.min
                    }))
                } else {
                    //未输入任何查询关键字
                    alert("请选择关键字进行查询")
                }
                self.ifMovieQueryShow = true
                self.ifHitoryOrderShow = false
                self.ifInfoShow = false
            },
            movieBuying: function() {
                //购买电影 调用支付宝接口
            },
            emptySearchingParams: function(keyword) {
                let self = this
                var flags
                function emptySpecifiedParam() {
                    flags = self.paramFlags
                    if (flags[0]) {
                        self.year = ''
                    }
                    if (flags[1]) {
                        self.season = []
                        self.seasonOfYear = ''
                    }
                    if (flags[2]) {
                        self.month = ''
                    }
                    if (flags[3]) {
                        self.weekday.length = 0
                        self.weekdayOfYearMonth = ''
                    }
                    if (flags[4]) {
                        self.inputMovie = ''
                    }
                    if (flags[5]) {
                        self.ifClickSuggestionList = false
                        self.inputDirector = ''
                    }
                    if (flags[6]) {
                        self.ifClickSuggestionList = false
                        self.inputActor = ''
                    }
                    if (flags[7]) {
                        self.ifClickSuggestionList = false
                        self.combinedSearch1.director = ''
                        self.combinedSearch1.actor = ''
                    }
                    if (flags[8]) {
                        self.ifClickSuggestionList = false
                        self.inputType = ''
                    }
                    if (flags[9]) {
                        self.inputRank.min = 0
                        self.inputRank.max = 0
                    }
                    if (flags[10]) {
                        self.inputMark.min = 0
                        self.inputMark.max = 0
                    }
                    if (flags[11]) {
                        self.ifClickSuggestionList = false
                        self.combinedSearch2.year = ''
                        self.combinedSearch2.actor = ''
                    }
                }
                switch (keyword) {
                    case 'year':
                        self.paramFlags = [false, true, true, true, true, true, true, true, true, true, true, true]
                        break
                    case 'season':
                        self.paramFlags = [true, false, true, true, true, true, true, true, true, true, true, true]
                        break
                    case 'month':
                        self.paramFlags = [true, true, false, true, true, true, true, true, true, true, true, true]
                        break
                    case 'date':
                        self.paramFlags = [true, true, true, false, true, true, true, true, true, true, true, true]
                        break
                    case 'movieName':
                        self.paramFlags = [true, true, true, true, false, true, true, true, true, true, true, true]
                        break
                    case 'director':
                        self.paramFlags = [true, true, true, true, true, false, true, true, true, true, true, true]
                        break
                    case 'actor':
                        self.paramFlags = [true, true, true, true, true, true, false, true, true, true, true, true]
                        break
                    case 'combinedSearch1':
                        self.paramFlags = [true, true, true, true, true, true, true, false, true, true, true, true]
                        break
                    case 'type':
                        self.paramFlags = [true, true, true, true, true, true, true, true, false, true, true, true]
                        break
                    case 'rank':
                        self.paramFlags = [true, true, true, true, true, true, true, true, true, false, true, true]
                        break
                    case 'mark':
                        self.paramFlags = [true, true, true, true, true, true, true, true, true, true, false, true]
                        break
                    case 'combinedSearch2':
                        self.paramFlags = [true, true, true, true, true, true, true, true, true, true, true, false]
                        break
                }
                emptySpecifiedParam()
            },
            enterOrderPage: function() {
                this.ifMovieQueryShow = false
                this.ifInfoShow = false
                this.ifHitoryOrderShow = true
            },
            enterInfoPage: function() {
                this.ifMovieQueryShow = false
                this.ifInfoShow = true
                this.ifHitoryOrderShow = false
            },
            changeIntroduction() {
                this.$prompt('请输入您的新简介', '修改简介', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                    value
                }) => {
                    this.$message({
                        type: 'success',
                        message: '修改成功！'
                    });
                    this.introduction = value
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            changePwd() {
                let self = this;
                $.post(this.urlHeader + '/users/login', {
                        userName: "test",
                        passWord: "newtest"
                    },
                    function(data) {
                        console.log(data);
                        self.rs = data.rspCode;
                        // console.log(self.rs)
                        console.log(self.rs)
                        if (self.rs == "200") {
                            $.post(self.urlHeader + '/users/newPassword', {
                                    oldPassword: 'test',
                                    newPassword: 'newtest'
                                },
                                function(data) {
                                    console.log(data)
                                });
                        }
                    });
            },
            querySearch: function(queryString, cb) {
                let self = this
                var suggestionList = []
                function getSuggesrionList(keyword) {
                    suggestionList = []
                    //决定keyword
                    switch (keyword) {
                        case 'director':
                            var directors = Director.director
                            for (var i = 0; i < directors.length; i++) {
                                if (directors[i].key.toLowerCase().indexOf(queryString) == 0) {
                                    suggestionList.push({
                                        value: directors[i].key
                                    })
                                }
                            }
                            break
                        case 'actor':
                            var actors = Actor.actor
                            for (var i = 0; i < actors.length; i++) {
                                if (actors[i].key.toLowerCase().indexOf(queryString) == 0) {
                                    suggestionList.push({
                                        value: actors[i].key
                                    })
                                }
                            }
                            break
                        case 'category':
                            var categories = Category.category
                            for (var i = 0; i < categories.length; i++) {
                                if (categories[i].key.toLowerCase().indexOf(queryString) == 0) {
                                    suggestionList.push({
                                        value: categories[i].key
                                    })
                                }
                            }
                            break
                    }
                }
                if (self.inputDirector.length != 0 || self.combinedSearch1.director.length != 0) {
                    getSuggesrionList('director')
                } else if (self.inputActor.length != 0 || self.combinedSearch1.actor.length != 0 || self.combinedSearch2.actor.length != 0) {
                    getSuggesrionList('actor')
                } else if (self.inputType.length != 0) {
                    getSuggesrionList('category')
                }
                // 调用 callback 返回建议列表的数据
                cb(suggestionList);
            },
            handleSelect: function() {
                this.ifClickSuggestionList = true
            },
            createOrder(){
                let self = this;
                $.ajax({
                    crossDomain: true,
                    // xhrFields: {
                    //     withCredentials: true
                    // },
                    dataType: "json",
                    data: JSON.stringify({
                        title: "order3",
                        description: "order3des",
                        address: "orderAddress",
                        productIds: [5,7,3,4],
                        total_price: 50,
                        quantity: 3
                    }),
                    contentType: "application/json;charset=UTF-8",
                    url: "http://10.60.43.111:16666/createOrder",
                    type: "post",
                    success: function(data) {
                        console.log(data)

                    }
                });
            },
            queryForHistoryOrder() {
                let self = this;
                $.ajax({
                    crossDomain: true,
                    // xhrFields: {
                    //     withCredentials: true
                    // },
                    dataType: "json",
                    data: JSON.stringify({
                        userName: "buyer",
                        passWord: "buyer"
                    }),
                    contentType: "application/json;charset=UTF-8",
                    url: "http://10.60.43.111:16666/getOrdersOfBuyer",
                    type: "post",
                    success: function(data) {
                        console.log(data)
                        var i
                        for (i in data) {
                            var j
                            for(j in data[i]){
                                var temp = {id:'',
                                            title:'',
                                            description: '',
                                            address: '',
                                            productId: '',
                                            price: ''}
                                temp.id = data[i][j].ID
                                temp.title = data[i][j].TITLE
                                temp.description = data[i][j].DESCRIPTION
                                temp.address = data[i][j].ADDRESS
                                temp.productId = data[i][j].PRODUCTIDS
                                temp.price = data[i][j].TOTAL_PRICE
                                self.historyOrders.push(temp)
                            }
                        }
                    }
                });
            },
            orderReturns(id) {
                let self = this;
                console.log(id.id)
                $.ajax({
                    crossDomain: true,
                    // xhrFields: {
                    //     withCredentials: true
                    // },
                    dataType: "json",
                    data: JSON.stringify({
                        id: id.id,
                    }),
                    contentType: "application/json;charset=UTF-8",
                    url: "http://10.60.43.111:16666/returnOrder",
                    type: "post",
                    success: function(data) {
                        console.log(data)
                        self.$message({
                            message: "成功发起退货！",
                            type: 'success'
                        })
                    }
                });
            },
            createFeedback(){
                this.feedbackVisible = false
                let self = this;
                // console.log(self.feedbackData.content, self.feedbackData.title)
                $.ajax({
                    crossDomain: true,
                    dataType: "json",
                    data: JSON.stringify({
                        feedbackAdvice: self.feedbackData.content,
                        feedbackName: self.feedbackData.title
                    }),
                    contentType: "application/json;charset=UTF-8",
                    url: "http://10.60.43.111:16666/feedback",
                    type: "post",
                    success: function(data) {
                        console.log(data)
                        self.$message({
                            message: "反馈成功",
                            type: 'success'
                        })
                    }
                });
            }

        },
        mounted() {
            this.queryForHistoryOrder()
        }
    }
</script>

<style scoped>
    #container {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    #user-name {
        position: relative;
        /* left: 25%; */
        /* top: 13%; */
        text-align: left;
        color: #505F7C;
        font-weight: 300;
        font-size: 48px;
        margin: 0;
    }
    #introduction {
        position: relative;
        /* left: 25%; */
        text-align: left;
        top: 20%;
        color: #505F7C;
        font-weight: 300;
        font-size: 18px;
        width: 50%;
    }
    #userInfo {
        position: relative;
        top: 5%;
    }
    .button-font {
        /* background: #616161; */
        font-size: 0.6em;
        color: rgb(153, 169, 190);
        font-family: Arial, Helvetica, sans-serif;
        border: none;
        font-weight: 200;
        transition: all 0.4s;
    }
    .button-font:hover {
        /* transform: scale(1.2) */
        color: #505F7C;
    }
    .change-part {
        position: relative;
        left: 25%;
        top: 40%;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>
