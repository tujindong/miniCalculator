<template>
    <div class="angToRad">
        <van-dialog id="van-dialog" />
        <van-toast id="van-toast"/>
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">多边形</div>
            </div>
            <div class="body">
                <div class="stepper_area">
                    <div class="item">
                        <div class="label">精度</div>
                        <div class="desc">
                            <van-stepper 
                                :value="precision" 
                                min="0"
                                max="4"
                                disable-input="true"
                                input-width="30px"
                                @change="handleFloatChange" 
                            />
                        </div>
                    </div>
                </div>
                <div class="stepper_area">
                    <div class="item">
                        <div class="label">梯度X</div>
                        <div class="desc">
                            <van-stepper 
                                :value="xGradient" 
                                min="5"
                                step="5"
                                disable-input="true"
                                input-width="30px"
                                @change="(e) => handleGradientChange(e, 'x')" 
                            />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">梯度Y</div>
                        <div class="desc">
                            <van-stepper 
                                :value="yGradient" 
                                min="5"
                                step="5"
                                disable-input="true"
                                input-width="30px"
                                @change="(e) => handleGradientChange(e, 'y')" 
                            />
                        </div>
                    </div>
                </div>
                <div class="canvas_area">
                    <div class="canvas_wrap">
                        <canvas
                            canvas-id="runCanvas" 
                            id="runCanvas" 
                            class='canvas'
                        ></canvas>
                    </div>
                    <div class="btn_area">
                        <div 
                            class="reset" 
                            hover-class="hover"
                            hover-stay-time="30"
                            @click="sureToRest"
                        >
                            重置
                        </div>
                        <div 
                            class="confirm" 
                            hover-class="hover"
                            hover-stay-time="30"
                            @click="sureToConfirm"
                        >
                            确定
                        </div>
                    </div>
                </div>

                <div class="input_area">
                    <div class="input">
                        <van-field
                            :value="valueX"
                            type="digit"
                            label="X"
                            title-width="30px"
                            placeholder="X坐标"
                            clearable="true"
                            @change="(e) => handleInputChange(e, 'x')"
                            @clear="handleInputClear('x')"
                            custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                            adjust-position='true'
                            input-align="right"
                        />
                    </div>
                    <div class="input">
                        <van-field
                            :value="valueY"
                            type="digit"
                            label="Y"
                            title-width="30px"
                            placeholder="Y坐标"
                            clearable="true"
                            @change="(e) => handleInputChange(e, 'y')"
                            @clear="handleInputClear('y')"
                            custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                            adjust-position='true'
                            input-align="right"
                        />
                    </div>
                </div>

                <div class="show_area">
                    <scroll-view 
                        class="list" 
                        :scroll-x="true"
                        :scroll-into-view="scrollId"
                        v-if="dotLists.length"
                    >
                        <div
                            class="list_li"
                            :id="item.label"
                            v-for="(item, index) in dotLists" 
                            :key="item.label"
                            @click="handleDotSelect(item, index)"
                            :class="curIndex == index? 'active': ''"
                            hover-class="hover"
                            hover-stay-time="30"
                        >
                            <div class="dot_wrap">
                                {{item.label}}
                            </div>
                            <div 
                                v-if="curIndex == index"
                                class="icon_remove"
                                @click="(e) => handleDotRemove(e, item ,index)"
                            >
                                <img src="./images/icon_remove.png" alt="">
                            </div>
                        </div>
                    </scroll-view>
                    <div class="list_empty" v-else>点击右侧添加点</div>
                    <div class="add" @click="this.handleDotAdd">
                        <div>添加</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Canvas from './canvas';
import {classes, styles} from '../../../../utils/css';
import Dialog from '../../../../../static/vant-weapp/dialog/dialog';
import Toast from '../../../../../static/vant-weapp/toast/toast';
Toast.setDefaultOptions({duration: 1500});
export default {
    data () {
        return {
            valueX:'',
            valueY:'',
            dotLists:[],
            curIndex: 1,
            precision: 2,
            xGradient: 5,
            yGradient: 5,
        }
    },

    onLoad (e) {
        Object.assign(this, this.$options.data());
    },

    mounted() {
        let canvas = new Canvas('runCanvas');
        canvas.execute();
    },

    computed: {
        scrollId() {
            return `D${this.curIndex}`
        }
    },

    methods: {
        handleCanvasDraw(sureCalc) {
            let parameter = {
                precision: this.precision,
                dotLists: this.dotLists,
                curIndex: this.curIndex,
                xGradient: this.xGradient,
                yGradient: this.yGradient,
                sureCalc
            };
            let canvas = new Canvas('runCanvas');
            canvas.execute(parameter);
            if(parameter && canvas.getError()){
                Toast({message: canvas.getError(), duration: '1000'});
            }
        },

        handleFloatChange(e){
            this.precision = e.mp.detail;
        },

        handleGradientChange(e, type) {
            if(type == 'x'){
                this.xGradient = e.mp.detail;
            }
            if(type == 'y'){
                this.yGradient = e.mp.detail;
            }
            this.handleCanvasDraw();
        },

        handleInputChange(e, type) {
            switch(type){
                case 'x':
                    this.valueX = e.mp.detail;
                    break;
                case 'y':
                    this.valueY = e.mp.detail;
                    break;
                default:
                    break;        
            };
            let {valueX, valueY, curIndex, dotLists} = this;
            if(dotLists.length){
                dotLists[curIndex].x = valueX;
                dotLists[curIndex].y = valueY;
            }
            this.handleCanvasDraw();
        },

        handleInputClear(type) {
            switch(type){
                case 'x':
                    this.valueX = '';
                    break;
                case 'y':
                    this.valueY = '';
                    break;
                default:
                    break;        
            }
        },

        checkEmptyDot() {
            let {dotLists} = this, dotEmptyStr = '';
            dotEmptyStr = dotLists.map((item, index) => {
                return !Object.values(item).every(item => !!item) ? dotLists[index].label : false;
            }).filter(item => !!item).join('，');
            if(dotEmptyStr){
                Toast({message:`点${dotEmptyStr}未录入值`, duration: '1000'});
                return false;
            }else{
                return true;
            }
        },

        handleDotAdd() {
            let {dotLists, curIndex} = this;
            let checkEmptyDot = this.checkEmptyDot();
            if(checkEmptyDot){
                dotLists.push({
                    label: `D${dotLists.length + 1}`,
                    x: '',
                    y: ''
                })
                this.valueX = ''; this.valueY = '';
                this.dotLists = dotLists;
                this.curIndex  = dotLists.length - 1;
            }
            this.handleCanvasDraw();
        },

        handleDotSelect(item, index) {
            let {dotLists} = this;
            this.curIndex = index;
            this.valueX = dotLists[index].x;
            this.valueY = dotLists[index].y; 
            this.handleCanvasDraw();
        },

        handleDotRemove(e, item, index) {
            e.stopPropagation();
            let {dotLists} = this;
            dotLists.splice(index, 1);
            this.dotLists = dotLists;
            this.handleCanvasDraw();
        },

        sureToRest() {
            this.dotLists = [];
            this.valueX = '',
            this.valueY = '',
            this.precision = 2,
            this.xGradient = 5,
            this.yGradient = 5,
            this.handleCanvasDraw();
        },

        sureToConfirm() {
            this.handleCanvasDraw(true);
        }
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
                z-index: 1;
                position: relative;
                padding: 10px 7.5px 50px;
                .canvas_area{
                    position: relative;
                    display: flex;
                    z-index: 1;
                    width: 100%;
                    height: 280px;
                    .canvas_wrap{
                        width: 280px;
                        height: 280px;
                        .canvas {
                            width: 280px;
                            height: 280px;
                            left: 0;
                            top: 0;
                            bottom: 0;
                            right: 0;
                            z-index: 5;
                        }
                    }
                    .btn_area{
                        position: absolute;
                        height: 50%;
                        width: 52px;
                        top: 50px;
                        right: 0px;
                        div{
                            display: flex;
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                            align-items: center;
                            justify-content: center;
                            margin-bottom: 20px;
                            font-size: 15px;
                            &.reset{
                                border: 1px solid @themeColor;
                                color: @themeColor;
                                &.hover{
                                    opacity: 0.9;
                                }
                            }
                            &.confirm{
                                background: @themeColor;
                                color: white;
                                &.hover{
                                    opacity: 0.9;
                                }
                            }
                        }
                    }
                }
                .stepper_area{
                    display: flex;
                    margin-bottom: 10px;
                    .item{
                        z-index: 5;
                        display: flex;
                        align-items: center;
                        margin-right: 15px;
                        .label{
                            color: @textColor;
                            font-size: 14px;
                            width: 38px;
                        }
                        .desc{
                            margin-left: 5px;
                        }
                    }
                }
                .input_area{
                    padding: 0 10px;
                    display: flex;
                }
                .show_area{
                    display: flex;
                    width: 100%;
                    height: 62px;
                    margin-top: 40px;
                    .list{
                        width: 310px;
                        height: 62px;
                        white-space: nowrap;
                        display: flex;
                        .list_li{
                            position: relative;
                            height: 50px;
                            width: 50px;
                            margin: 0 5px;
                            display: inline-block;
                            &:last-child{
                                margin-right: 30px;
                            }
                            &.active{
                                position: relative;
                                .dot_wrap{
                                    border-color: @myBlue;
                                    background: rgba(90, 186, 255, 0.1);
                                }
                                .icon_remove{
                                    position: absolute;
                                    right: 0;
                                    top: 0;
                                    width: 15px;
                                    height: 15px;
                                    img{
                                        display: block;
                                        width: 15px;
                                        height: 15px;
                                    }
                                }
                            }
                            &.hover{
                                .dot_wrap{
                                    border-color: @myBlue;
                                    background: rgba(90, 186, 255);
                                    color: white;
                                }
                                .icon_remove{
                                    display: none;
                                }
                            }
                            .dot_wrap{
                                width: 100%;
                                height: 100%;
                                font-size: 14px;
                                color: @textLightColor;
                                border: 0.5px solid #d2d2d2;
                                border-radius: 50%;
                                background: rgba(255, 255, 255, 0.3);
                                text-align: center;
                                line-height: 50px;
                            }
                        }
                    }
                    .list_empty{
                        width: 310px;
                        height: 62px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        color: @textLightColor;    
                    }
                    .add{
                        position: relative;
                        width: 52px;
                        height: 50px;
                        div{
                            position: relative;
                            display: flex;
                            width: 48px;
                            height: 48px;
                            font-size: 15px;
                            color: @themeColor;
                            border: 1px solid @themeColor;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                            left: 1px;
                        }
                        &.hover{
                            opacity: 0.9;
                        }
                        &::before{
                            display: block;
                            content:'';
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 100%;
                            border-left: 0.5px solid white;
                            box-shadow: 0 0 3px white;
                        }
                    }
                }
            }
        }
    }
</style>