<template>
    <div class="about">
        <div class="background">
            <img src="../../../static/images/bg_cloud.jpg">
        </div>
        <div class="body">
            <div class="cloud_container">
                <ul>
                    <li 
                        v-for="item in tabsLists"
                        :key="item.value"
                        @click="handleTabsChange(item.value)"
                    >
                        <img :src="item.imgurl" alt="">
                        <div class="label" :class="tabIndex == item.value? 'active': ''">
                            {{item.label}}
                        </div>
                    </li>
                </ul>
            </div>

            <div class="intro_container">
                <van-transition 
                    name="slide-right" 
                    v-if="tabIndex == '0'" 
                    custom-class="block"
                    duration='300'
                >
                    <div class="img_wrap">
                        <img src="./images/qrcode.jpg" alt="">
                        <div class="desc">
                            <p>扫描上方二维码添加作者微信</p> 
                            <p>知乎：涂小图</p> 
                        </div>
                    </div>
                </van-transition>

                <van-transition 
                    name="slide-right" 
                    v-if="tabIndex == '1'" 
                    custom-class="block"
                    duration='300'
                >
                    <div class="version_wrap">
                        <div class="title">版本v1.1.1</div>
                        <div class="desc">
                            <p>1、添加了多边形相关计算</p> 
                            <p>2、功能部分移植，还未移植的功能正在研发中。</p> 
                            <p>3、基本计算均支持图形展示，效果更直观。</p>
                            <p>4、欢迎添加微信和我讨论。</p>
                        </div>
                    </div>
                </van-transition>

                <van-transition 
                    name="fade" 
                    v-if="tabIndex == '2'" 
                    custom-class="block"
                    duration='300'
                >
                    <div class="share_wrap">
                        <div class="desc">觉得不错，欢迎分享给您的好友</div>
                        <button open-type="share" class="btn">分享</button>
                    </div>
                </van-transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tabsLists: [
                {value: '0', label:'作者', imgurl:'./images/cloud_01.png'},
                {value: '1', label:'版本', imgurl:'./images/cloud_02.png'},
                {value: '2', label:'分享', imgurl:'./images/cloud_03.png'}
            ],
            tabIndex: '2',
        }
    },

    onLoad (e) {
        Object.assign(this, this.$options.data());
    },

    methods: {
        handleTabsChange(type) {
            this.tabIndex = type
        }
    }
}
</script>

<style lang="less" scoped>
    @themeColor: #4a8cff;
    @baseColor: #eef0f3;
    @textLightColor: #adb8ca;
    @textColor: #5e6b80;
    @mainTitleColor: #282c32;
    @myRed: #ff5252;
    @myOrange: #ff8247;
    @myYellow: #ffb53f;
    @myBlue: #5abaff;
    @myPurple: #7853f0;
    @myPink: #ff5c7b;
    .about{
        .background{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: #e4e9ed;
            img{
                position: fixed;
                width: 100%;
                bottom: 0;
            }
        }
        .body{
            top: 0; left: 0;
            position: fixed;
            width: 100%;
            height: 100%;
            .cloud_container{
                margin-top: 100px;
                ul{
                    display: flex;
                    li{
                        display: flex;
                        position: relative;
                        width: 33.33%;
                        height: 120px;
                        align-items: center;
                        justify-content: center;
                        &:nth-child(1){
                            top: 20px;
                            animation: floaty1 3s linear infinite;
                        }
                        &:nth-child(2){
                            top: -10px;
                            animation: floaty2 3s linear infinite;
                            img{
                                width: 100px;
                                height: 100px;
                            }
                        }
                        &:nth-child(3){
                            top: 20px;
                            animation: floaty3 3s linear infinite;
                        }
                        img{
                            display: block;
                            width: 80px;
                            height: 80px;
                        }
                        .label{
                            position: absolute;
                            font-size: 14px;
                            color: @textLightColor;
                            &.active{
                                color: @mainTitleColor;
                            }
                        }
                    }
                    @keyframes floaty1{
                        0% {
                            transform: translate(0px, 0px)
                        }
                        50%{
                            transform: translate(0px, -8px)
                        }
                        100%{
                            transform: translate(0px, 0px)
                        }
                    }
                    @keyframes floaty2{
                        0% {
                            transform: translate(0px, -5px)
                        }
                        50%{
                            transform: translate(0px, 0px)
                        }
                        100%{
                            transform: translate(0px, -5px)
                        }
                    }
                    @keyframes floaty3{
                        0% {
                            transform: translate(0px, 0px)
                        }
                        50%{
                            transform: translate(0px, 6px)
                        }
                        100%{
                            transform: translate(0px, 0px)
                        }
                    }
                }
            }
            .intro_container{
                width: 100%;
                display: flex;
                justify-content: center;
                .img_wrap{
                    display: flex;
                    width: 180px;
                    height: 210px;
                    flex-wrap: wrap;
                    justify-content: center;
                    border: 1px solid #c7dfee;
                    border-radius: 5px;
                    background: #ffffff;
                    img{
                        display: block;
                        margin-top: 15px;
                        width: 150px;
                        height: 150px;
                    }
                    .desc{
                        text-align: center;
                        width: 100%;
                        p{
                            line-height: 18px;
                            font-size: 12px;
                            color: #4981a4;
                        }
                    }
                }
                .version_wrap{
                    width: 150px;
                    height: 190px;
                    border: 1px solid #c7dfee;
                    border-radius: 5px;
                    background: #ffffff;
                    padding: 15px;
                    color: #4981a4;
                    .title{
                        color: @textColor;
                        font-size: 13px;
                        text-align: center;
                        margin-bottom: 10px
                    }
                    .desc{
                        height: 160px;
                        font-size: 12px;
                        overflow-y: scroll;
                        p{
                            text-align: left;
                            line-height: 18px;
                            margin-bottom: 5px;
                        }
                    }
                }
            }
            .share_wrap{
                .desc{
                    font-size: 13px;
                    color: @textColor;
                    margin-bottom: 20px;
                }
                button{
                    display: block;
                    font-size: 12px;
                    width: 60px;
                    height: 30px;
                    line-height: 26px;
                    margin: 0 auto;
                    border: 2px solid #4981a4;
                    color: #4981a4;
                    padding: 0;
                    background: none;
                    border-radius: 0;
                    &::after{
                        border: none;
                    }
                }
            }
        }
    }
</style>