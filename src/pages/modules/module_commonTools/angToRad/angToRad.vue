<template>
    <div class="angToRad">
        <van-toast id="van-toast"/>
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">角度弧度转换</div>
            </div>
            <div class="body">

                <div class="canvas_area">
                    <canvas canvas-id="runCanvas" id="runCanvas" class='canvas'></canvas>
                </div>
                
                <div class="stepper_area">
                    <div class="label">精度</div>
                    <div class="desc">
                        <van-stepper 
                            :value="precision" 
                            min="0"
                            max="4"
                            disable-input="true"
                            input-width="10px"
                            @change="handleFloatChange" 
                        />
                    </div>
                </div>

                <!-- 选择角度弧度 -->
                <div class="choose_area">
                    <van-tabs 
                        :active="curTab" 
                        color="#5abaff"
                        nav-class="vant_nav"
                        @change="handleTabsChange"
                    >
                        <van-tab title="角度转弧度">
                            <div class="tab_wrapper">
                                <div class="tab_input angle">
                                    <ul>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="deg"
                                                    type="digit"
                                                    label="度"
                                                    placeholder="请输入度"
                                                    clearable="true"
                                                    @change="handleDegChange"
                                                    @clear="handleInputClear('deg')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="min"
                                                    type="digit"
                                                    label="分"
                                                    placeholder="请输入分"
                                                    clearable="true"
                                                    @change="handleMinChange"
                                                    @clear="handleInputClear('min')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="sec"
                                                    type="digit"
                                                    label="秒"
                                                    placeholder="请输入秒"
                                                    clearable="true"
                                                    @change="handleSecChange"
                                                    @clear="handleInputClear('sec')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab_btn deg">
                                    <div class="btn_area">
                                        <div 
                                            class="reset" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToResetByDms"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToConfirmByDms"
                                        >
                                            <div>确定</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-tab>

                        <van-tab title="弧度转角度">
                            <div class="tab_wrapper">
                                <div class="tab_input rad">
                                    <ul>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="rad"
                                                    type="digit"
                                                    label="弧度"
                                                    placeholder="请输入弧度"
                                                    clearable="true"
                                                    @change="handleRadChange"
                                                    @clear="handleInputClear('rad')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab_btn rad">
                                    <div class="btn_area">
                                        <div  
                                            class="reset" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToResetByRad"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToConfirmByRad"
                                        >
                                            <div>确定</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {add, subtract, multiply, divide} from '../../../../utils';
import Canvas from './canvas';

export default {
    data () {
        return {
            tabsType:[
                {value: '1', label: '角度转弧度'},
                {value: '2', label: '弧度转角度'}
            ],
            curTab:'0',
            deg: '',
            min: '',
            sec: '',
            rad: '',
            precision: 2,
        }
    },

    onLoad (e) {
        Object.assign(this, this.$options.data());
    },


    mounted() {
        this.handleCanvasDraw([0, 0]);
    },

    methods: {
        handleCanvasDraw(parameter){
            let canvas = new Canvas('runCanvas');
            canvas.canvsDraw(parameter);
        },
        /* myMethods */
        // tab切换
        handleTabsChange() {
            this.deg = '';
            this.min = '';
            this.sec = '';
            this.rad = '';
            this.handleCanvasDraw([0, 0]);
        },

        // 输入清空
        handleInputClear(type) {
            switch(type) {
                case 'deg':
                    this.deg = '';
                    break;
                case 'min':
                    this.min = '';
                    break;
                case 'sec':
                    this.sec = '';
                    break;
                case 'rad':
                    this.rad = '';
                    break;
                default:
                    break;
            }
        },

        // 输入度
        handleDegChange(e) {
            this.deg = e.mp.detail;
        },

        // 输入分
        handleMinChange(e) {
            this.min = e.mp.detail;
        },

        // 输入秒
        handleSecChange(e) {
            this.sec = e.mp.detail;
        },

        // 输入弧度
        handleRadChange(e) {
            this.rad = e.mp.detail;
        },

        // 精度选择
        handleFloatChange(e){
            this.precision = e.mp.detail;
        },

        /******  度分秒转弧度区域 ******/
        // 点击清空 度分秒
        sureToResetByDms() {
            this.deg = '';
            this.min = '';
            this.sec = '';
            this.handleCanvasDraw([0, 0]);
        },

        // 未填选项置为0
        processValTo0ByDms() {
            let {deg, min, sec} = this;
            if(!deg){
                this.deg = 0;
            };
            if(!min){
                this.min = 0;
            };
            if(!sec){
                this.sec = 0;
            };
        },

        // 点击确定 度分秒
        sureToConfirmByDms() {
            this.processValTo0ByDms();
            let {deg, min, sec, angleFloat, radFloat, precision} = this;
            let angle = parseFloat(deg) + (parseFloat(min) / 60) + (parseFloat(sec) / 3600);
            let rad = angle * Math.PI / 180;
            let parameter = [
                parseFloat(angle).toFixed(precision),
                parseFloat(rad).toFixed(precision)
            ];
            this.handleCanvasDraw(parameter);
        },

        /******  弧度转度分秒区域 ******/
        // 点击清空 弧度
        sureToResetByRad() {
            this.rad = '';
            this.handleCanvasDraw([0, 0]);
        },

        // 未填选项置为0
        processValTo0ByRad() {
            let {rad} = this;
            if(!rad){
                this.rad = 0;
            };
        },

        // 点击确定 弧度
        sureToConfirmByRad() {
            this.processValTo0ByRad();
            let {rad, angleFloat, radFloat, precision} = this;
            let angle = rad * 180 / Math.PI;
            let parameter = [
                parseFloat(angle).toFixed(precision),
                parseFloat(rad).toFixed(precision)
            ];
            this.handleCanvasDraw(parameter);
        },
    },
}    
</script>

<style lang="less">
    @import url('../../../../utils/theme.less');
    .angToRad{ 
        height: 100%;       
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
                background: #efefef;
                .title{
                    text-align: center;
                    color: @mainTitleColor;
                    font-size: 18px;
                    width: 100%;
                }
            }
            .body{
                z-index: 1;
                position: relative;
                padding: 20px 7.5px 0;
                .canvas_area{
                    z-index: 1;
                    position: relative;
                    margin-top: 10px;
                    width: 100%;
                    height: 200px;
                    .canvas {
                        width: 200px;
                        height: 200px;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                        z-index: 5;
                    }
                }
                .stepper_area{
                    z-index: 5;
                    position: absolute;
                    display: flex;
                    height: 15px;
                    align-items: center;
                    top: 15px;
                    left: 7.5px;
                    .label{
                        color: @textColor;
                        font-size: 16px;
                    }
                    .desc{
                        margin-left: 5px;
                    }
                }
                .choose_area{
                    position: relative;
                    margin-top: 10px;
                    width: 100%;
                    .tab_input{
                        &.angle{
                            margin-top: 10px;
                        }
                        &.rad{
                            margin-top: 55px;
                        }
                    }
                     .tab_btn{
                        margin-top: 30px;
                        width: 100%;
                        &.rad{
                            margin-top: 75px;
                        }
                        .btn_area{
                            padding: 0 7.5px;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            font-size: 18px;
                            .reset{
                                flex: 1;
                                display: flex;
                                justify-content: flex-start;
                                &.hover{
                                    div{
                                        opacity: 0.9;
                                    }
                                }
                                div{
                                    text-align: center;
                                    width: 80%;
                                    padding: 5px 10px;
                                    color: @themeColor;
                                    border: 0.5px solid @themeColor;
                                }
                            }
                            .confirm{
                                flex: 1;
                                display: flex;
                                justify-content: flex-end;
                                &.hover{
                                    div{
                                        opacity: 0.9;
                                    }
                                }
                                div{
                                    text-align: center;
                                    width: 80%;
                                    padding: 5px 10px;
                                    background: @themeColor;
                                    color: white;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>