<template>
    <div class="angToRad">
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">质量转换</div>
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
                        :value="volume"
                        type="digit"
                        placeholder="请输入转换数值"
                        clearable="true"
                        @change="handleVolumeChange"
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
                {value: '1', label: '千克', unit: 'kg'},
                {value: '1000', label: '克', unit: 'g'},
                {value: '1000000', label: '毫克', unit: 'mg'},
                {value: '1000000000', label: '微克', unit: 'μg'},
                {value: '0.001', label: '吨', unit: 't'},
                {value: '0.01', label: '公担', unit: 'q'},
                {value: '5000', label: '克拉', unit: 'ct'},
                {value: '2.2046226', label: '磅', unit: 'lb'},
                {value: '35.2739619', label: '盎司', unit: 'oz'},
                {value: '15432.3583529', label: '格令', unit: 'gr'},
                {value: '0.0196841', label: '英担', unit: 'lh'},
                {value: '0.0220462', label: '美担', unit: 'sh'},
                {value: '0.157473', label: '英石', unit: 'st'},
                {value: '564.3833912', label: '打兰', unit: 'dr'},
                {value: '2', label: '斤', unit: ''},
                {value: '0.02', label: '担', unit: ''},
                {value: '20', label: '两', unit: ''},
                {value: '200', label: '钱', unit: ''}
            ],
            modalLists: [],
            showLists: [],
            index: 0,
            curUnitObj: {
                value: '1', label: '千克', unit: 'kg'
            },
            volume:'',
            isFixed: false,
            offsetTop: 175
        }
    },

    onLoad (e) {
        // 小程序页面卸载，vue组件状态清空
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

        handleVolumeChange(e) {
            this.volume = e.mp.detail;
            this.processTrans();
        },

        processTrans() {
            let {volume, index, curUnitObj, showLists} = this;
            if(!volume){
                showLists.forEach(item => {item.targetValue = '--'})
            };
            if(volume){
                showLists.forEach((item, index) => {
                    let ratio = divide(parseFloat(item.value), parseFloat(curUnitObj.value));
                    item.targetValue = multiply(parseFloat(volume), parseFloat(ratio));
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
                            color: @myPink;
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