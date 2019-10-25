<template>
    <div class="angToRad">
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">体积转换</div>
            </div>
            <div class="body">
                <div class="choose_wrap">
                    <ChooseBtn 
                        @onChooseBtnClick="handleChooseBtnClick" 
                        :btn-content="'选择单位'" 
                        :btn-cotrol-status="isModalShow"
                        :btn-color="'#7853f0'"
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
                {value: '1', label: '立方米', unit: 'm³'}, 
                {value: '1000', label: '立方分米', unit: 'dm³'}, 
                {value: '1000000', label: '立方厘米', unit: 'cm³'}, 
                {value: '1000000000', label: '立方毫米', unit: 'mm³'},
                {value: '1000', label: '升', unit: 'L'},
                {value: '10000', label: '分升', unit: 'dL'},
                {value: '100000', label: '厘升', unit: 'cL'},
                {value: '1000000', label: '毫升', unit: 'mL'},
                {value: '10', label: '公石', unit: 'hL'},
                {value: '35.3147248', label: '立方英尺', unit: 'cu ft'},
                {value: '61023.8445022', label: '立方英寸', unit: 'cu in'},
                {value: '1.3079528', label: '立方码', unit: 'cu yd'},
                {value: '0.0008107', label: '亩英尺', unit: ''},
                {value: '219.9691573', label: '英制加仑', unit: 'UK gal'},
                {value: '264.1720524', label: '美制加仑', unit: 'US gal'},
                {value: '35198.873636', label: '英制盎司(液)', unit: 'UK fl oz'},
                {value: '33818.0588434', label: '美制盎司(液)', unit: 'US fl oz'},
                {value: '6.2898108', label: '美制桶(液)', unit: ''},
                {value: '1056.6882094', label: '美制夸脱(液)', unit: 'US qt'},
                {value: '2113.3764189', label: '美制品脱(液)', unit: 'US pt'},
                {value: '8453.5056755', label: '及耳', unit: 'gi'},
                {value: '270512.1816147', label: '打兰(液)', unit: 'fl dr'},
                {value: '2077533554.8012273', label: '量滴', unit: 'min'},
                {value: '8.6484898', label: '美制桶(干)', unit: ''},
                {value: '28.3775933', label: '美制蒲式耳(干)', unit: 'US bu'},
                {value: '113.510373', label: '美制配克(干)', unit: 'US pk'},
                {value: '908.0829843', label: '美制夸脱(干)', unit: 'US qt'},
                {value: '1816.1659685', label: '美制品脱(干)', unit: 'US pt'},
                {value: '4226.7528377', label: '美制烹调杯', unit: 'US c'},
                {value: '67628.0454037', label: '美制烹调汤勺', unit: 'US Tbs'},
                {value: '202884.136211', label: '美制烹调调羹', unit: 'US tsp'},
                {value: '6.1102569', label: '英制桶', unit: 'UK bbl'},
                {value: '27.496156', label: '英制蒲式耳', unit: 'UK bu'},
                {value: '1759.7539864', label: '英制品脱', unit: 'UK pt'},
                {value: '66666.6666667', label: '汤勺', unit: 'Table Spoon'},
                {value: '200000', label: '调羹', unit: 'Tea Spoon'},
                {value: '100', label: '十升', unit: ''}
            ],
            modalLists: [],
            showLists: [],
            index: 0,
            curUnitObj: {
                value: '1', label: '立方米', unit: 'm³'
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
                            color: @myPurple;
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