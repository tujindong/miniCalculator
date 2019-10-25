<template>
    <div class="angToRad">
        <van-toast id="van-toast"/>
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">圆</div>
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

                <!-- 选择半径面积周长 -->
                <div class="choose_area">
                    <van-tabs 
                        :active="curTab" 
                        color="#5abaff"
                        nav-class="vant_nav"
                        @change="handleTabsChange"
                    >
                        <van-tab title="半径">
                            <div class="tab_wrapper">
                                <div class="tab_input">
                                    <ul>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="radius"
                                                    type="digit"
                                                    label="半径"
                                                    placeholder="请输入半径"
                                                    clearable="true"
                                                    @change="handleRadiusChange"
                                                    @clear="handleInputClear('radius')"
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
                                            @click="sureToResetByRadius"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToConfirmByRadius"
                                        >
                                            <div>确定</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-tab>

                        <van-tab title="面积">
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
                                    </ul>
                                </div>
                                <div class="tab_btn">
                                    <div class="btn_area">
                                        <div  
                                            class="reset"
                                            hover-class="hover" 
                                            hover-stay-time="30"
                                            @click="sureToResetByArea"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm"
                                            hover-class="hover"
                                            hover-stay-time="30" 
                                            @click="sureToConfirmByArea"
                                        >
                                            <div>确定</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-tab>

                        <van-tab title="周长">
                            <div class="tab_wrapper">
                                <div class="tab_input">
                                    <ul>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="perimeter"
                                                    type="digit"
                                                    label="周长"
                                                    placeholder="请输入周长"
                                                    clearable="true"
                                                    @change="handlePerimeterChange"
                                                    @clear="handleInputClear('perimeter')"
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
                                            @click="sureToResetByPerimeter"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm" 
                                            hover-class="hover"
                                            hover-stay-time="30" 
                                            @click="sureToConfirmByPerimeter"
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
            radius: '',
            area: '',
            perimeter: '',
            precision: 2,
        }
    },

    onLoad (e) {
        Object.assign(this, this.$options.data());
    },

    mounted() {
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
            this.radius = '';
            this.area = '';
            this.perimeter = '';
            this.handleCanvasDraw();
        },

        // 输入清空
        handleInputClear(type) {
            switch(type) {
                case 'radius':
                    this.radius = '';
                    break;
                case 'area':
                    this.area = '';
                    break;
                case 'perimeter':
                    this.perimeter = '';
                    break;
                default:
                    break;
            }
        },

        // 输入半径
        handleRadiusChange(e) {
            this.radius = e.mp.detail;
        },

        // 输入面积
        handleAreaChange(e) {
            this.area = e.mp.detail;
        },

        // 输入周长
        handlePerimeterChange(e) {
            this.perimeter = e.mp.detail;
        },

        // 精度选择
        handleFloatChange(e){
            this.precision = e.mp.detail;
        },

        // 未填默认0
        processDefaultValue(){
            let {radius, area, perimeter} = this;
            if(!radius){
                this.radius = 0;
            };
            if(!area){
                this.area = 0;
            };
            if(!perimeter){
                this.perimeter = 0;
            };
        },

        // 点击确定（半径）
        sureToConfirmByRadius(){
            this.processDefaultValue();
            let {radius, precision} = this;
            let parameter = [
                parseFloat(radius).toFixed(precision),
                multiply(Math.PI, multiply(radius, radius)).toFixed(precision),
                multiply(Math.PI, multiply(2, radius)).toFixed(precision)
            ];
            this.handleCanvasDraw(parameter);
        },

        // 点击清空（半径）
        sureToResetByRadius(){
            this.radius = '';
            this.handleCanvasDraw();
        },

        // 点击确定（面积）
        sureToConfirmByArea(){
            this.processDefaultValue();
            let {area, precision} = this;
            let tempRadius = Math.sqrt(divide(area, Math.PI)).toFixed(precision);
            let parameter = [
                tempRadius,
                parseFloat(area).toFixed(precision),
                multiply(Math.PI, multiply(2, tempRadius)).toFixed(precision)
            ];
            this.handleCanvasDraw(parameter);
        },

        // 点击清空（面积）
        sureToResetByArea(){
            this.area = '';
            this.handleCanvasDraw();
        },

        // 点击确定（周长）
        sureToConfirmByPerimeter(){
            this.processDefaultValue();
            let {perimeter, precision} = this;
            let tempRadius = divide(perimeter, multiply(2, Math.PI));
            let parameter = [
                tempRadius.toFixed(precision),
                multiply(Math.PI, multiply(tempRadius, tempRadius)).toFixed(precision),
                parseFloat(perimeter).toFixed(precision)
            ];
            this.handleCanvasDraw(parameter);
        },

        // 点击清空（周长）
        sureToResetByPerimeter(){
            this.perimeter = '';
            this.handleCanvasDraw();
        }
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
                    margin-top: 50px;
                    width: 100%;
                    .tab_input{
                        margin-top: 30px;
                    }
                     .tab_btn{
                        margin-top: 60px;
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