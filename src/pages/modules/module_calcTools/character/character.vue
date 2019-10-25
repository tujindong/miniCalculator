<template>
    <div class="angToRad">
        <van-toast id="van-toast"/>
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">生辰八字</div>
            </div>
            <div class="body">
                <div class="input_area">
                    <ul>
                        <li>
                            <van-field
                                :value="name"
                                type="text"
                                label="姓名"
                                placeholder="请输入姓名"
                                clearable="true"
                                @change="handleNameChange"
                                @clear="handleNameClear"
                                custom-style="background: rgba(255, 255, 255, 1);"
                                adjust-position='true'
                                input-align="right"
                            />
                        </li>
                        <li>
                            <div class="list_item"  @click="handleModalShow">
                                <div class="label">出生日期(阳历)</div>
                                <div v-if="birthday_solar" class="value">
                                    {{birthday_solar}}
                                </div>
                                <div v-else class="value lighter">
                                    请选择出生日期
                                </div>
                            </div>
                        </li>
                        <li>
                            <div 
                                class="list_btn" 
                                hover-class="hover" 
                                hover-stay-time="30"
                                @click="sureToCalc"
                            >
                                开始测算
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="show_area basic_info">
                    <div class="title">
                        <img src="./images/icon_book.png">
                        基本信息
                    </div>
                    <ul>
                        <li>
                            <div class="label">姓名</div>
                            <div class="value">{{personInfo.name}}</div>
                        </li>
                        <li>
                            <div class="label">出生日期</div>
                            <div class="value">{{personInfo.birthday_solar}}</div>
                        </li>
                        <li>
                            <div class="label">农历</div>
                            <div class="value">{{personInfo.birthday_lunar}}</div>
                        </li>
                        <li>
                            <div class="label">八字</div>
                            <div class="value">{{personInfo.bazi}}</div>
                        </li>
                        <li>
                            <div class="label">五行</div>
                             <div class="value">{{personInfo.wuxing}}</div>
                        </li>
                        <li>
                            <div class="label">方位</div>
                             <div class="value">{{personInfo.fangwei}}</div>
                        </li>
                        <li>
                            <div class="label">生肖</div>
                             <div class="value">{{personInfo.shengxiao}}</div>
                        </li>
                        <li>
                            <div class="label">星座</div>
                             <div class="value">{{personInfo.xingzuo}}</div>
                        </li>
                    </ul>
                </div>

                 <div class="show_area chart_analysis">
                    <div class="title">
                        <img src="./images/icon_table.png">
                        五行强度
                    </div>
                    <div class="echart_container">
                        <mpvue-echarts :echarts="echarts" :onInit="initChart" />
                        <div v-if="!wuxingLists.length" class="emptyLay">
                            <img src="./images/img_empty.png" alt="">
                        </div>
                    </div>
                </div>
                
                <div class="popup_area">
                    <van-popup
                        :show="isModalShow"
                        position="bottom"
                        :overlay="false"
                        close-on-click-overlay="false"
                        @close="handleModalHide"
                    >
                        <van-datetime-picker
                            type="datetime"
                            :value="chooseDate"
                            :min-date="minDate"
                            :max-date="maxDate"
                            @input="onInput"
                            @cancel="handleDateCancel"
                            @confirm="handleDateConfirm"
                        />
                    </van-popup>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Lunar from './Lunar';
import BaZi from './Bazi';
import {formatTime} from '../../../../utils/index.js';
import Validator from '../../../../utils/validator';
import * as echarts from 'echarts/dist/echarts.min';
import mpvueEcharts from 'mpvue-echarts';
import Toast from '../../../../../static/vant-weapp/toast/toast';
Toast.setDefaultOptions({duration: 1500});
let chart = null;

export default {

    components: { mpvueEcharts },

    data () {
        return {
            echarts,
            name: '',
            chooseDate: '',
            birthday_solar: '',
            isModalShow: false,
            minDate: new Date('1901/01/01').getTime(),
            maxDate: new Date('2049/12/30').getTime(),
            personInfo: {
                name: '--',
                birthday_solar: '--',
                birthday_lunar: '--',
                bazi: '--',
                wuxing: '--',
                fangwei: '--',
                shengxiao: '--',
                xingzuo: '--',
            },
            wuxingLists:[]
        }
    },

    onLoad (e) {
        Object.assign(this, this.$options.data());
    },

    mounted() {
    },

    methods: {
        handleNameChange (e) {
            this.name = e.mp.detail
        },

        handleNameClear () {
            this.name = ''
        },

        handleModalShow () {
            this.chooseDate = new Date('1993/04/04 09:23:00').getTime()
            this.isModalShow = true
        },

        handleModalHide () {
            this.isModalShow = false
        },

        handleDateCancel () {
            this.handleModalHide();
        },

        handleDateConfirm (e) {
            this.chooseDate = e.mp.detail;
            this.birthday_solar =  formatTime(new Date(this.chooseDate));
            this.handleModalHide();
        },

        processPersonInfo () {
            let info = BaZi.calc(new Date(this.chooseDate));
            let lunar = Lunar.calc(new Date(this.chooseDate));
            this.personInfo = {
                name: this.name,
                birthday_solar: this.birthday_solar,
                birthday_lunar: lunar.str,
                bazi: info.bazi,
                wuxing: info.wuxing,
                fangwei: info.fangwei,
                shengxiao: info.shengxiao,
                xingzuo: info.xingzuo,
            };
            this.processWuxingStrength();
        },

        processWuxingStrength () {
            let wuxing = this.personInfo.wuxing;
            let charObj = {};
            let wuxingArr = ['木', '水', '金', '土', '火'];
            let wuxingLists = [0, 0, 0, 0, 0];
            for(let i = 0; i < wuxing.length; i++){
                let charAt = wuxing.charAt(i);
                if(charObj[charAt]){
                    charObj[charAt] ++;
                }else{
                    charObj[charAt] = 1;
                };
            };
            Object.keys(charObj).forEach(key => {
                for(let i = 0; i < wuxingArr.length; i++){
                    if(wuxingArr[i] == key){
                        wuxingLists[i] = charObj[key];
                    };
                };
            });
            this.wuxingLists = wuxingLists;
        },

        initChart (canvas, width, height) {
            chart = echarts.init(canvas, null, { // 注意:不要添加局部变量申明
                width: width,
                height: height
            })
            canvas.setChart(chart);
            return chart;
        },

        setOption () {
            let option = {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                color: ['#5abaff'],
                radar: {
                    indicator: [
                        {name: '木', max: 5},
                        {name: '水', max: 5},
                        {name: '金', max: 5},
                        {name: '土', max: 5},
                        {name: '火', max: 5}
                    ]},
                    series: [{
                    name: '五行强度',
                    type: 'radar',
                    data: [{
                        value: this.wuxingLists,
                        name: '五行强度'
                    }]
                }]
            }
            chart.setOption(option)
        },

        vaildateFunc () {
            let validator = new Validator();
            validator.add(this.name, [{
                strategy: 'isNonEmpty',
                errorMsg: '请输入姓名'
            }]);
            validator.add(this.chooseDate, [{
                strategy: 'isNonEmpty',
                errorMsg: '请选择出生日期'
            }]);
            let errorMsg = validator.start();
            return errorMsg;
        },

        sureToCalc () {
            let errorMsg = this.vaildateFunc();
            if(errorMsg){
                Toast({message:`${errorMsg}`, duration: '1000'});
                return false
            }else{
                this.processPersonInfo();
                this.setOption();
            }
        },
    }
}
</script>

<style lang="less" scoped>
    @import url('../../../../utils/theme.less');
    .angToRad{        
        .background{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: #efefef;
            img{
                position: fixed;
                width: 100%;
                bottom: 0;
            }
        }
        .container{
            .header{
                display: flex;
                width: 100%;
                height: 50px;
                align-items: center;
                justify-content: center;
                border-bottom: 0.5px solid @textLightColor;
                .title{
                    text-align: center;
                    color: @mainTitleColor;
                    font-size: 18px;
                    width: 100%;
                }
            }
            .body{
                padding: 10px 7.5px 0;
                .input_area{
                    ul{
                        width: 100%;
                        li{
                            width: 100%;
                            background: #ffffff;
                            .list_item{
                                display: flex;
                                height: 24px;
                                font-size: 14px;
                                padding: 10px 15px;
                                color: #333333;
                                background: rgba(255, 255, 255, 1);
                                .label{
                                    display: flex;
                                    flex: 2;
                                    align-items: center;
                                }
                                .value{
                                    display: flex;
                                    flex: 3;
                                    align-items: center;
                                    justify-content: flex-end;
                                    &.lighter{
                                        color: #999999;
                                    }
                                }
                            }
                            .list_btn{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 24px;
                                font-size: 16px;
                                padding: 10px 15px;
                                color: @myOrange;
                                background: rgba(255, 130, 71, 0.1);
                                &.hover{
                                    background: rgba(255, 130, 71, 0.3);
                                    color: #ffffff;
                                }
                            }
                        }
                    }
                }
                .show_area{
                    margin-top: 10px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 2px;
                    padding: 0 15px;
                    .title{
                        width: 100%;
                        height: 50px;
                        display: flex;
                        font-size: 16px;
                        color: @mainTitleColor;
                        align-items: center;
                        img{
                            width: 20px;
                            height: 20px;
                            margin-right: 5px;
                        }
                    }
                    &.basic_info{
                        padding-bottom: 10px;
                        ul{
                            font-size: 15px;
                            li{
                                display: flex;
                                height: 40px;
                                align-items: center;
                                &:not(:last-child){
                                    border-bottom: 1px solid @baseColor;
                                }
                                .label{
                                    flex: 1;
                                    color: @textColor;
                                }
                                .value{
                                    flex: 3;
                                    color: @mainTitleColor;
                                }
                            }
                        }
                    }
                    &.chart_analysis{
                        .echart_container{
                            position: relative;
                            width: 100%;
                            height: 300px;
                            .emptyLay{
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                img{
                                    display: block;
                                    width: 100px;
                                    height: 100px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>