<template>
    <div class="sysConvert">
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">进制转换</div>
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
                            <div class="label">2进制</div>
                            <div class="value">{{sys2}}</div>
                        </li>
                        <li>
                            <div class="label">8进制</div>
                            <div class="value">{{sys8}}</div>
                        </li>
                        <li>
                            <div class="label">10进制</div>
                            <div class="value">{{sys10}}</div>
                        </li>
                         <li>
                            <div class="label">16进制</div>
                            <div class="value">{{sys16}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            sysChooseLists:[
                {name:'2进制', value: 2},
                {name:'8进制', value: 8},
                {name:'10进制', value: 10},
                {name:'16进制', value: 16},
            ],
            curChooseVal: 10,
            curInputVal:'',
            sys2:'--',
            sys8:'--',
            sys10:'--',
            sys16:'--',
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
            this.processSysVal();
        },

        // 数值输入改变
        handleInputValChange(e) {
            this.curInputVal = e.mp.detail;
            this.processSysVal();
        },

        // 数值清空
        handleInputClear() {
            this.resetSys()
        },

        // 显示值置空
        resetSys() {
            this.sys2 = '--';
            this.sys8 = '--';
            this.sys10 = '--';
            this.sys16 = '--';
        },

        // 判断输入是否合法
        isInputOk(str, type) {
            let arr = str.toLowerCase().split(''), arrBase = [];
            if(type == '2'){
                arrBase = ['0', '1'];
            }else if(type == '8'){
                arrBase = ['0', '1', '2', '3', '4', '5', '6', '7'];
            }else if(type == '10'){
                arrBase = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            }else if(type == '16'){
                arrBase = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            };
            let notRepeatArr = [];
            for(let i = 0; i < arr.length; i++){
                let obj1 = arr[i];
                let isExist = false;
                for(let j = 0; j < arrBase.length; j++){
                    let obj2 = arrBase[j];
                    if(arr[i] == arrBase[j]){
                       isExist = true;
                       break;
                    };
                };
                if(!isExist){
                    notRepeatArr.push(obj1);
                };
            };
            if(notRepeatArr.length){
                return false;
            }else{
                return true;
            };
        },

        // 进制渲染改变
        processSysVal() {
            let {curChooseVal} = this;
            switch(curChooseVal){
                case 2:
                    this.whenChooseIs2();
                    break;
                case 8:
                    this.whenChooseIs8();
                    break;
                case 10:
                    this.whenChooseIs10();
                    break;
                case 16:
                    this.whenChooseIs16();
                    break;
                default:
                    break;
            }   
        }, 

        // 当前选择2进制
        whenChooseIs2() {
            let {curInputVal} = this;
            this.isErrorMsgShow = !this.isInputOk(curInputVal, '2');
            if(this.isErrorMsgShow){
                this.resetSys();
                return;
            };
            if(curInputVal){
                this.sys2 = curInputVal;
                this.sys8 = parseInt(curInputVal, 2).toString(8);
                this.sys10 = parseInt(curInputVal, 2);
                this.sys16 = parseInt(curInputVal, 2).toString(16);
            }else{
                this.resetSys();
            };
        },

        // 当前选择8进制
        whenChooseIs8() {
            let {curInputVal} = this;
            this.isErrorMsgShow = !this.isInputOk(curInputVal, '8');
            if(this.isErrorMsgShow){
                this.resetSys();
                return;
            };
            if(curInputVal){
                this.sys2 = parseInt(curInputVal, 8).toString(2);
                this.sys8 = curInputVal;
                this.sys10 = parseInt(curInputVal, 8);
                this.sys16 = parseInt(curInputVal, 8).toString(16);
            }else{
                this.resetSys();
            };
        },

        // 当前选择10进制
        whenChooseIs10() {
            let {curInputVal} = this;
            this.isErrorMsgShow = !this.isInputOk(curInputVal, '10');
            if(this.isErrorMsgShow){
                this.resetSys();
                return;
            };
            if(curInputVal){
                this.sys2 = Number(curInputVal).toString(2);
                this.sys8 = Number(curInputVal).toString(8);
                this.sys10 = Number(curInputVal);
                this.sys16 = Number(curInputVal).toString(16);
            }else{
                this.resetSys();
            };
        },

        // 当前选择16进制
        whenChooseIs16() {
            let {curInputVal} = this;
            this.isErrorMsgShow = !this.isInputOk(curInputVal, '16');
            if(this.isErrorMsgShow){
                this.resetSys();
                return;
            };
            if(curInputVal){
                this.sys2 = parseInt(curInputVal, 16).toString(2);
                this.sys8 = parseInt(curInputVal, 16).toString(8);
                this.sys10 = parseInt(curInputVal, 16);
                this.sys16 = curInputVal;
            }else{
                this.resetSys();
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
                        }
                    }
                }
            }
        }
    }
</style>