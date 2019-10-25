<template>
    <div class="angToRad">
        <van-toast id="van-toast"/>
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">矩形</div>
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

                <!-- 选择面积和边长 -->
                <div class="choose_area">
                    <van-tabs 
                        :active="curTab" 
                        color="#5abaff"
                        nav-class="vant_nav"
                        @change="handleTabsChange"
                    >
                        <van-tab title="两条边长">
                            <div class="tab_wrapper">
                                <div class="tab_input">
                                    <ul>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="length1"
                                                    type="digit"
                                                    label="边长1"
                                                    placeholder="请输入边长1"
                                                    clearable="true"
                                                    @change="handleLength1Change"
                                                    @clear="handleInputClear('length1')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="length2"
                                                    type="digit"
                                                    label="边长2"
                                                    placeholder="请输入边长2"
                                                    clearable="true"
                                                    @change="handleLength2Change"
                                                    @clear="handleInputClear('length2')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab_btn">
                                    <div class="btn_area">
                                        <div 
                                            class="reset" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToResetByWL"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToConfirmByWL"
                                        >
                                            <div>确定</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-tab>

                        <van-tab title="面积和一边">
                            <div class="tab_wrapper">
                                <div class="tab_input">
                                    <ul>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="area"
                                                    type="digit"
                                                    label="面积"
                                                    placeholder="请输入面积"
                                                    clearable="true"
                                                    @change="handleAreaChange"
                                                    @clear="handleInputClear('area')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="length0"
                                                    type="digit"
                                                    label="边长"
                                                    placeholder="请输入边长"
                                                    clearable="true"
                                                    @change="handleLength0Change"
                                                    @clear="handleInputClear('length0')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab_btn">
                                    <div class="btn_area">
                                        <div  
                                            class="reset" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToResetByAL"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToConfirmByAL"
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
            curTab:'0',
            area:'',
            length0: '',
            length1: '',
            length2: '',
            precision: 2,
            canvas_length: 0,
            canvas_width: 0,
            canvas_area: 0
        }
    },

    onLoad (e) {
        Object.assign(this, this.$options.data());
    },

    mounted() {
        // 绘制canvas
        this.handleCanvasDraw();
    },

    methods: {
        handleCanvasDraw(parameter){
            let canvas = new Canvas('runCanvas');
            canvas.canvasDraw(parameter);
        },
        /* myMethods */
        // tab切换
        handleTabsChange() {
            this.area = '';
            this.length0 = '';
            this.length1 = '';
            this.length2 = '';
            this.handleCanvasDraw();
        },

        // 输入清空
        handleInputClear(type) {
            switch(type) {
                case 'length0':
                    this.length0 = '';
                    break;
                case 'length1':
                    this.length1 = '';
                    break;
                case 'length2':
                    this.length2 = '';
                    break;
                case 'area':
                    this.area = '';
                    break;
                default:
                    break;
            };
        },

        // 输入长 length1
        handleLength1Change(e) {
            this.length1 = e.mp.detail;
        },

        // 输入宽 length2
        handleLength2Change(e) {
            this.length2 = e.mp.detail;
        },

        // 输入面积 area
        handleAreaChange(e) {
            this.area = e.mp.detail;
        },

        // 输入边长 length0
        handleLength0Change(e) {
            this.length0 = e.mp.detail;
        },

        // 精度选择
        handleFloatChange(e){
            this.precision = e.mp.detail;
        },

        // 未填默认0
        processDefaultValue(){
            let {length0, length1, length2, area} = this;
            if(!length0){
                this.length0 = 0;
            };
            if(!length1){
                this.length1 = 0;
            };
            if(!length2){
                this.length2 = 0;
            };
            if(!area){
                this.area = 0;
            }
        },

        // 点击确定（长length1 和 宽lenght2）
        sureToConfirmByWL(){
            this.processDefaultValue();
            let { length1, length2, precision, canvas_length, canvas_width, canvas_area} = this;
            let length = Math.max(parseFloat(length1), parseFloat(length2));
            let width = Math.min(parseFloat(length1), parseFloat(length2));
            let area = multiply(length, width);
            let parameter = [
                canvas_length = length.toFixed(precision),
                canvas_width = width.toFixed(precision),
                canvas_area = area.toFixed(precision),
            ];
            this.handleCanvasDraw(parameter);
        },

        // 点击清空（长length1 和 宽length2）
        sureToResetByWL(){
            this.length1 = '';
            this.length2 = '';
            this.handleCanvasDraw();
        },

        // 点击确定（面积area 和 边长length0）
        sureToConfirmByAL(){
            this.processDefaultValue();
            let {length0, area, precision, canvas_length, canvas_width, canvas_area} = this;
            let length_cal = 0;
            if(length0 != 0){
                length_cal = divide(area, length0);
            };
            let length = Math.max(length0, length_cal);
            let width = Math.min(length0, length_cal);
            let parameter = [
                length.toFixed(precision),
                width.toFixed(precision),
                parseFloat(area).toFixed(precision)
            ];
            this.handleCanvasDraw(parameter);
        },

        // 点击清空（面积area 和 边长length0）
        sureToResetByAL(){
            this.area = '';
            this.length0 = '';
            this.handleCanvasDraw();
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
                        width: 100%;
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
                    margin-top: 20px;
                    width: 100%;
                    .tab_input{
                        margin-top: 30px;
                    }
                     .tab_btn{
                        margin-top: 50px;
                        width: 100%;
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