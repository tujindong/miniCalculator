<template>
    <div class="angToRad">
        <van-toast id="van-toast"/>
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">三角形</div>
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

                <div class="error_area">
                    <div class="msg" v-show="errMessage">{{errMessage}}</div>
                </div>

                <!-- 选择面积和边长 -->
                <div class="choose_area">
                    <van-tabs 
                        :active="curTab" 
                        color="#5abaff"
                        nav-class="vant_nav"
                        @change="handleTabsChange"
                    >
                        <van-tab title="三条边长">
                            <div class="tab_wrapper">
                                <div class="tab_input">
                                    <ul>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="size.a"
                                                    type="digit"
                                                    label="边长1"
                                                    placeholder="请输入边长1"
                                                    clearable="true"
                                                    @change="(e) => this.handleInputChange(e, 'sizea')"
                                                    @clear="handleInputClear('sizea')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="size.b"
                                                    type="digit"
                                                    label="边长2"
                                                    placeholder="请输入边长2"
                                                    clearable="true"
                                                    @change="(e) => this.handleInputChange(e, 'sizeb')"
                                                    @clear="handleInputClear('sizeb')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="size.c"
                                                    type="digit"
                                                    label="边长3"
                                                    placeholder="请输入边长3"
                                                    clearable="true"
                                                    @change="(e) => this.handleInputChange(e, 'sizec')"
                                                    @clear="handleInputClear('sizec')"
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
                                            @click="sureToResetBySize"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm" 
                                            hover-class="hover"
                                            hover-stay-time="30"
                                            @click="sureToConfirmBySize"
                                        >
                                            <div>确定</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-tab>

                        <van-tab title="两边及夹角">
                            <div class="tab_wrapper">
                                <div class="tab_input">
                                    <ul>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="s2a1.a"
                                                    type="digit"
                                                    label="边长1"
                                                    placeholder="请输入边长1"
                                                    clearable="true"
                                                    @change="(e) => handleInputChange(e, 's2a1a')"
                                                    @clear="handleInputClear('s2a1a')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="s2a1.b"
                                                    type="digit"
                                                    label="边长2"
                                                    placeholder="请输入边长2"
                                                    clearable="true"
                                                    @change="(e) => handleInputChange(e, 's2a1b')"
                                                    @clear="handleInputClear('s2a1b')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                         <li>
                                            <div class="input">
                                                <van-field
                                                    :value="s2a1.C"
                                                    type="digit"
                                                    label="夹角"
                                                    placeholder="请输入夹角"
                                                    clearable="true"
                                                    @change="(e) => handleInputChange(e, 's2a1C')"
                                                    @clear="handleInputClear('s2a1C')"
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
                                            @click="sureToResetByS2a1"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm" 
                                            hover-class="hover" 
                                            hover-stay-time="30"
                                            @click="sureToConfirmByS2a1"
                                        >
                                            <div>确定</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-tab>

                        <van-tab title="两角及一边">
                            <div class="tab_wrapper">
                                <div class="tab_input">
                                    <ul>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="a2s1.A"
                                                    type="digit"
                                                    label="角度1"
                                                    placeholder="请输入角度1"
                                                    clearable="true"
                                                    @change="(e) => handleInputChange(e, 'a2s1A')"
                                                    @clear="handleInputClear('a2s1A')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div class="input">
                                                <van-field
                                                    :value="a2s1.B"
                                                    type="digit"
                                                    label="角度2"
                                                    placeholder="请输入角度2"
                                                    clearable="true"
                                                    @change="(e) => handleInputChange(e, 'a2s1B')"
                                                    @clear="handleInputClear('a2s1B')"
                                                    custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                                                    adjust-position='true'
                                                    input-align="right"
                                                />
                                            </div>
                                        </li>
                                         <li>
                                            <div class="input">
                                                <van-field
                                                    :value="a2s1.c"
                                                    type="digit"
                                                    label="边长"
                                                    placeholder="请输入边长"
                                                    clearable="true"
                                                    @change="(e) => handleInputChange(e, 'a2s1c')"
                                                    @clear="handleInputClear('a2s1c')"
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
                                            @click="sureToResetByA2s1"
                                        >
                                            <div>清空</div>
                                        </div>
                                        <div 
                                            class="confirm" 
                                            hover-class="hover" 
                                            hover-stay-time="30"
                                            @click="sureToConfirmByA2s1"
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
            size: {a: '', b: '', c: ''},
            s2a1: {a: '', b: '', C: ''},
            a2s1: {A: '', B: '', c: ''},
            precision: 2,
            errMessage:''
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
            canvas.execute(parameter);
        },

        /* myMethods */
        handleTabsChange() {
            this.size = {a: '', b: '', c: ''};
            this.s2a1 = {a: '', b: '', C: ''};
            this.a2s1 = {A: '', B: '', c: ''};
            this.errMessage = '';
            let canvas = new Canvas('runCanvas');
            canvas.execute();
        },

        handleInputChange(e, type) {
            switch(type) {
                case 'sizea':
                    this.size.a = e.mp.detail;
                    break;
                case 'sizeb':
                    this.size.b = e.mp.detail;
                    break;
                case 'sizec':
                    this.size.c = e.mp.detail;
                    break;  
                case 's2a1a':
                    this.s2a1.a = e.mp.detail;
                    break;    
                case 's2a1b':
                    this.s2a1.b = e.mp.detail;
                    break;    
                case 's2a1C':
                    this.s2a1.C = e.mp.detail;
                    break;   
                case 'a2s1A':
                    this.a2s1.A = e.mp.detail;
                    break;
                case 'a2s1B':
                    this.a2s1.B = e.mp.detail;
                    break; 
                case 'a2s1c':
                    this.a2s1.c = e.mp.detail;
                    break;       
                default:
                    break;             
            }
        },

        handleInputClear(type) {
            switch(type) {
                case 'sizea':
                    this.size.a = '';
                    break;
                case 'sizeb':
                    this.size.b = '';
                    break;
                case 'sizec':
                    this.size.c = '';
                    break;
                case 's2a1a':
                    this.s2a1.a = ''; 
                    break;   
                case 's2a1b':
                    this.s2a1.b = ''; 
                    break   
                case 's2a1C':
                    this.s2a1.C = ''; 
                    break
                case 'a2s1A':
                    this.a2s1.A = '';
                    break;
                case 'a2s1B':
                    this.a2s1.B = '';
                    break; 
                case 'a2s1c':
                    this.a2s1.c = '';
                    break;         
                default:
                    break;
            };
        },

        handleFloatChange(e){
            this.precision = e.mp.detail;
        },

        processDefaultValue(obj){
            Object.keys(obj).forEach((key) => {
                if(!obj[key]){
                    obj[key] = 0
                };
            });
        },

        /** 三边 **/
        sureToConfirmBySize(){
            this.processDefaultValue(this.size);
            let {size, precision} = this;
            let parameter = {
                size: [size.a, size.b, size.c, precision]
            };
            let canvas = new Canvas('runCanvas');
            canvas.execute(parameter);
            this.errMessage = canvas.getError();
        },

        sureToResetBySize(){
            this.size = {a:'', b:'', c:''};
            this.errMessage = '';
            let canvas = new Canvas('runCanvas');
            canvas.execute();
        },

        /** 两边和夹角 **/
        sureToConfirmByS2a1() {
            this.processDefaultValue(this.s2a1);
            let {s2a1, precision} = this;
            let parameter = {
                s2a1:[s2a1.a, s2a1.b, s2a1.C, precision]
            };
            let canvas = new Canvas('runCanvas');
            canvas.execute(parameter);
            this.errMessage = canvas.getError();
        },

        sureToResetByS2a1() {
            this.s2a1 = {a: '', b: '', C: ''};
            this.errMessage = '';
            let canvas = new Canvas('runCanvas');
            canvas.execute();
        },

        /** 两角和一边 **/
        sureToConfirmByA2s1() {
            this.processDefaultValue(this.a2s1);
            let {a2s1, precision} = this;
            let parameter = {
                a2s1:[a2s1.A, a2s1.B, a2s1.c, precision]
            };
            let canvas = new Canvas('runCanvas');
            canvas.execute(parameter);
            this.errMessage = canvas.getError();
        },

        sureToResetByA2s1() {
            this.a2s1 = {A: '', B: '', c: ''};
            this.errMessage = '';
            let canvas = new Canvas('runCanvas');
            canvas.execute();
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
                .error_area{
                    text-align: center;
                    height: 20px;
                    .msg{
                        height: 20px;
                        line-height: 40px;
                        font-size: 16px;
                        color: @textColor;
                    }
                }
                .choose_area{
                    position: relative;
                    margin-top: 20px;
                    width: 100%;
                    .tab_input{
                        margin-top: 20px;
                    }
                     .tab_btn{
                        margin-top: 30px;
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