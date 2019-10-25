<template>
    <div class="sysConvert">
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">温度转换</div>
            </div>
            <div class="body">
                <div class="choose_area">
                    <ul>
                        <li 
                            v-for="item in sysChooseLists" 
                            :key="item.value"
                            :class="{ active: item.value == curChooseVal }"
                            @click="handleChooseValChange(item)"
                        >
                            <div>{{item.name}}</div>
                        </li>
                    </ul>
                </div>

                <div class="input_area">
                    <van-field
                        :value="curInputVal"
                        type="text"
                        placeholder="请输入转换数值"
                        border= "false"
                        clearable="true"
                        @change="handleInputValChange"
                        @clear="handleInputClear"
                        custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                        adjust-position='true'
                    />
                </div>

                <div class="msg_area">
                    <div class="msg" v-show="isErrorMsgShow">不是有效数值，请重新输入</div>
                </div>

                <div class="show_area">
                    <ul>
                        <li>
                            <div class="label">摄氏度</div>
                            <div class="value">{{tem_C}}</div>
                            <div class="unit">°C</div>
                        </li>
                        <li>
                            <div class="label">华氏度</div>
                            <div class="value">{{tem_F}}</div>
                            <div class="unit">°F</div>
                        </li>
                        <li>
                            <div class="label">兰氏度</div>
                            <div class="value">{{tem_R}}</div>
                            <div class="unit">°R</div>
                        </li>
                         <li>
                            <div class="label">开尔文</div>
                            <div class="value">{{tem_K}}</div>
                            <div class="unit">K</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {add, subtract, multiply, divide} from '../../../../utils';

export default {
    data () {
        return {
            sysChooseLists:[
                {name:'摄氏度', value: 'c', unit: '°C'},
                {name:'华氏度', value: 'f', unit: '°F'},
                {name:'兰氏度', value: 'r', unit: '°R'},
                {name:'开尔文', value: 'k', unit: 'K'},
            ],
            curChooseVal: 'c',
            curInputVal:'',
            tem_C:'--',
            tem_F:'--',
            tem_R:'--',
            tem_K:'--',
            isErrorMsgShow: false
        }
    },

    onLoad (e) {
        Object.assign(this, this.$options.data());
    },


    methods: {
        // 进制方法选择改变
        handleChooseValChange(item) {
            this.curChooseVal = item.value;
            this.processChooseVal();
        },

        // 数值输入改变
        handleInputValChange(e) {
            this.curInputVal = e.mp.detail;
            this.processChooseVal();
        },

        // 数值清空
        handleInputClear() {
            this.resetTem()
        },

        // 显示值置空
        resetTem() {
            this.tem_C = '--';
            this.tem_F = '--';
            this.tem_R = '--';
            this.tem_K = '--';
        },

        // 进制渲染改变
        processChooseVal() {
            let {curChooseVal} = this;
            switch(curChooseVal){
                case 'c':
                    this.whenChooseIsC();
                    break;
                case 'f':
                    this.whenChooseIsF();
                    break;
                case 'r':
                    this.whenChooseIsR();
                    break;
                case 'k':
                    this.whenChooseIsK();
                    break;
                default:
                    break;
            }   
        }, 

        isInputOk(str) {
            if(isNaN(str)){
                return false;
            }else{
                return true;
            };
        },

        // 当前选择摄氏度
        whenChooseIsC() {
            let { curInputVal } = this;
            this.isErrorMsgShow = !this.isInputOk(curInputVal);
            if(this.isErrorMsgShow){
                this.resetTem();
                return;
            };
            if(curInputVal){
                if(curInputVal < -273.15){
                    this.isErrorMsgShow = true;
                    this.resetTem();
                    return;
                }else{
                    this.tem_C = curInputVal;
                    this.tem_F = add(multiply(1.8, curInputVal), 32);
                    this.tem_R = multiply(divide(9, 5), add(curInputVal, 273.15));
                    this.tem_K = add(curInputVal, 273.15);
                };
            }else{
                this.resetTem();
            };
        },

        // 当前选择华氏度
        whenChooseIsF() {
            let { curInputVal } = this;
            this.isErrorMsgShow = !this.isInputOk(curInputVal);
            if(this.isErrorMsgShow){
                this.resetTem();
                return;
            };
            if(curInputVal){
                let tem_c = multiply(divide(5, 9), subtract(curInputVal, 32));
                if(tem_c < -273.15){
                    this.isErrorMsgShow = true;
                    this.resetTem();
                    return;
                }else{
                    this.tem_C = tem_c;
                    this.tem_F = curInputVal;
                    this.tem_R = multiply(divide(9, 5), add(tem_c, 273.15));
                    this.tem_K = add(tem_c, 273.15);
                }
            }else{
                this.resetTem();
            };
        },

        // 当前选择兰氏度
        whenChooseIsR() {
            let { curInputVal } = this;
            this.isErrorMsgShow = !this.isInputOk(curInputVal);
            if(this.isErrorMsgShow){
                this.resetTem();
                return;
            };
            if(curInputVal){
                let tem_c = subtract(multiply(divide(5, 9), curInputVal), 273.15);
                if(tem_c < -273.15){
                    this.isErrorMsgShow = true;
                    this.resetTem();
                    return;
                }else{
                    this.tem_C = tem_c;
                    this.tem_F = add(multiply(1.8, tem_c), 32);
                    this.tem_R = curInputVal;
                    this.tem_K = add(tem_c, 273.15);
                }  
            }else{
                this.resetTem();
            };
        },

        // 当前选择开尔文
        whenChooseIsK() {
            let { curInputVal } = this;
            this.isErrorMsgShow = !this.isInputOk(curInputVal);
            if(this.isErrorMsgShow){
                this.resetTem();
                return;
            };
            if(curInputVal) {
                let tem_c = subtract(curInputVal, 273.15);
                if(tem_c < -273.15){
                    this.isErrorMsgShow = true;
                    this.resetTem();
                    return;
                }else{
                    this.tem_C = tem_c;
                    this.tem_F = add(multiply(1.8, tem_c), 32);
                    this.tem_R = multiply(divide(9, 5), add(tem_c, 273.15));
                    this.tem_K = add(tem_c, 273.15);
                }
                
            }else{
                this.resetTem();
            };
        },
    }
}
</script>

<style lang="less" scoped>
    @import url('../../../../utils/theme.less');
    .sysConvert{        
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
                    color: @mainTitleColor;
                    font-size: 18px;
                    width: 80px;
                }
            }
            .body{
                padding: 5px 7.5px 0;
                .choose_area{
                    width: 100%;
                    ul{
                        display: flex;
                        width: 100%;
                        li{
                            display: flex;
                            width: 25%;
                            height: 100px;
                            align-items: center;
                            justify-content: center;
                            &.active{
                                &:nth-child(1){
                                    div{
                                        border: 1px solid @myRed;
                                        color: @myRed;
                                    }
                                }
                                &:nth-child(2){
                                    div{
                                        border: 1px solid @myPurple;
                                         color: @myPurple;
                                    }
                                }
                                &:nth-child(3){
                                    div{
                                        border: 1px solid @myOrange;
                                        color: @myOrange;
                                    }
                                }
                                 &:nth-child(4){
                                    div{
                                        border: 1px solid @myPink;
                                        color: @myPink;
                                    }
                                }
                            }
                            div{
                                display: flex;
                                width: 70px;
                                height: 70px;
                                border-radius: 50%;
                                border: 1px solid @textLightColor;
                                align-items: center;
                                justify-content: center;
                                color: @textColor;
                            }
                        }
                    }
                }
                .input_area{
                    margin-top: 20px;
                }
                .msg_area{
                    height: 20px;
                    text-align: center;
                    .msg{
                        height: 20px;
                        line-height: 40px;
                        font-size: 16px;
                        color: @textColor;
                    }
                }
                .show_area{
                    margin-top: 40px;
                    ul{
                        li{
                            display: flex;
                            min-height: 60px;
                            width: 100%;
                            border-bottom: 0.5px dashed @textLightColor;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                            color: @textColor;
                            .label{
                                width: 60px;
                            }
                            .value{
                                word-break: break-all;
                                width: 250px;
                                text-align: right;
                                flex: 4;
                            }
                            .unit{
                                color: @textLightColor;
                            }
                        }
                    }
                }
            }
        }
    }
</style>