<template>
    <div class="angToRad">
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">面积转换</div>
            </div>
            <div class="body">
                <div class="choose_wrap">
                    <ChooseBtn 
                        @onChooseBtnClick="handleChooseBtnClick" 
                        :btn-content="'选择单位'" 
                        :btn-cotrol-status="isModalShow"
                        :btn-color="'#ff5252'"
                    />
                </div>

                <div class="input_area" id="input_area" :class="{'is_fixed' : isFixed}">
                    <van-field
                        :value="inputVal"
                        type="digit"
                        placeholder="请输入转换数值"
                        clearable="true"
                        @change="handleInputValChange"
                        @clear="handleInputClear"
                        custom-style="background: transparent; border-bottom: 1px solid #adb8ca"
                        adjust-position='true'
                        input-align="center"
                    />
                    <div class="cur_unit">
                        <span class="chinese">{{curUnitObj.label}}</span>
                        <span class="abbr">{{curUnitObj.unit}}</span>
                    </div>
                </div>

                <div class="showLists_wrap">
                    <ShowLists :lists="showLists"/>
                </div>

                <div class="popup_area">
                    <van-popup
                        :show="isModalShow"
                        position="bottom"
                        :overlay="false"
                        close-on-click-overlay="false"
                        @close="handleModalHide"
                    >
                        <van-picker 
                            show-toolbar
                            title="单位"
                            :columns="modalLists"
                            @cancel="handleModalHide"
                            @confirm="handleUnitListsSelect"
                        />
                    </van-popup>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {add, subtract, multiply, divide} from '../../../../utils';
import ChooseBtn from '../../../components/chooseBtn';
import ShowLists from '../../../components/showLists';
export default {

    components:{ ChooseBtn, ShowLists },

    data () {
        return {
            isModalShow: false,
            unitLists: [
                {value: '1', label: '平方米', unit: '㎡'}, 
                {value: '0.000001', label: '平方千米', unit: 'k㎡'}, 
                {value: '0.0001', label: '公顷', unit: 'ha'},
                {value: '0.01', label: '公亩', unit: 'are'},
                {value: '100', label: '平方分米', unit: 'd㎡'},
                {value: '10000', label: '平方厘米', unit: 'c㎡'},
                {value: '1000000', label: '平方毫米', unit: 'm㎡'},
                {value: '0.0002471', label: '英亩', unit: 'acre'},
                {value: '0.0000004', label: '平方英里', unit: 'sq.mi'},
                {value: '1.19599', label: '平方码', unit: 'sq.yd'},
                {value: '10.7639104', label: '平方英尺', unit: 'sq.ft'},
                {value: '1550.0031', label: '平方英寸', unit: 'sq.in'},
                {value: '0.0395369', label: '平方竿', unit: 'sq.rd'},
                {value: '0.000015', label: '顷', unit: ''},
                {value: '0.0015', label: '亩', unit: ''},
                {value: '9', label: '平方尺', unit: ''},
                {value: '900', label: '平方寸', unit: ''},
            ],
            modalLists: [],
            showLists: [],
            index: 0,
            curUnitObj: {
                value: '1', label: '平方米', unit: '㎡'
            },
            inputVal:'',
            isFixed: false,
            offsetTop: 175
        }
    },

    onLoad (e) {
        Object.assign(this, this.$options.data());
    },

    mounted(){
        this.initModalLists();
        this.initShowLists();
    },

    onPageScroll: function(e) {
        let scrollTop = e.scrollTop;
        this.isFixed = scrollTop > this.offsetTop;
    },

    methods: {

        initModalLists() {
            let {unitLists, modalLists} = this;
            this.modalLists = unitLists.map(item => item.label);
        },

        initShowLists() {
            let {unitLists, showLists} = this;
            for(let obj of unitLists){
                obj.targetValue = '--';
                this.showLists.push(obj);
            };
        },

        handleChooseBtnClick(data){
            this.handleModalShow()
        },

        handleModalShow() {
            this.isModalShow = true;
        },

        handleModalHide() {
            this.isModalShow = false;
        },

        handleUnitListsSelect(e) {
            let {index, value} = e.mp.detail;
            let {unitLists} = this;
            this.index = index;
            this.curUnitObj = unitLists[index];
            this.isModalShow = false;
            this.processTrans();
        },

        handleInputValChange(e) {
            this.inputVal = e.mp.detail;
            this.processTrans();
        },

        processTrans() {
            let {inputVal, index, curUnitObj, showLists} = this;
            if(!inputVal){
                showLists.forEach(item => {item.targetValue = '--'})
            };
            if(inputVal){
                showLists.forEach((item, index) => {
                    let ratio = divide(parseFloat(item.value), parseFloat(curUnitObj.value));
                    item.targetValue = multiply(parseFloat(inputVal), parseFloat(ratio));
                });
            };
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
            overflow: scroll;
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
                padding: 5px 7.5px 0;
                .choose_wrap{
                    padding-bottom: 20px;
                }
                .input_area{
                    &.is_fixed{
                        width: 100%;
                        height: 94px;
                        position: fixed;
                        top: 0;
                        left: 0;
                        background: #efefef;
                        &::after{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            content:'';
                            display: block;
                            width: 100%;
                            border-bottom: 0.5px solid #dddddd;
                        }
                    }
                    .cur_unit{
                        height: 50px;
                        line-height: 50px;
                        font-size: 16px;
                        text-align: center;
                        .chinese{
                            font-size: 18px;
                            color: @textColor;
                        }
                        .abbr{
                            margin-left: 2px;
                            color: @myRed;
                        }
                    }
                }
                .showLists_wrap{
                    margin-top: 40px;
                }
            }
        }
    }
</style>