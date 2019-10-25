<template>
    <div class="angToRad">
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">功/能/热转换</div>
            </div>
            <div class="body">
                <div class="choose_wrap">
                    <ChooseBtn 
                        @onChooseBtnClick="handleChooseBtnClick" 
                        :btn-content="'选择单位'" 
                        :btn-cotrol-status="isModalShow"
                        :btn-color="'#ff8247'"
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
import { add, subtract, multiply, divide } from '../../../../utils';
import ChooseBtn from '../../../components/chooseBtn';
import ShowLists from '../../../components/showLists';

export default {

    components:{ ChooseBtn, ShowLists },

    data () {
        return {
            isModalShow: false,
            unitLists: [
                {value: '1000', label: '公斤·米', unit: 'kg·m'},
                {value: '9803.92157', label: '焦耳', unit: 'J'},
                {value: '0.0037027', label: '米制马力·时', unit: 'ps·h'},
                {value: '0.003652', label: '英制马力·时', unit: 'hp·h'},
                {value: '0.0027233', label: '千瓦·时', unit: 'kW·h'},
                {value: '0.0027233', label: '度', unit: 'kW·h'},
                {value: '2342.1568631', label: '卡', unit: 'cal'},
                {value: '2.3421568631', label: '千卡', unit: 'kcal'},
                {value: '9.2923247', label: '英热单位', unit: 'btu'},
            ],
            modalLists: [],
            showLists: [],
            index: 0,
            curUnitObj: {
                value: '1000', label: '公斤·米', unit: 'kg·m'
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
                            color: @myOrange;
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