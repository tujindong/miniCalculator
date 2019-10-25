<template>
    <div class="appStore">
        <div class="tools_container">
            <div class="app_tools">
                <div class="header">转换工具</div>
                <div class="body">
                    <ul>
                        <li 
                            v-for="item in appTransLists" 
                            :key="item.appId" 
                            @click="handleToGoCommonToolsPage(item)"
                        >
                            <div class="icon">
                                <img v-bind:src="item.iconPath">
                            </div>
                            <div class="name">{{item.appName}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="app_tools">
                <div class="header">计算工具</div>
                <div class="body">
                    <ul>
                        <li 
                            v-for="item in appCalcLists" 
                            :key="item.appId" 
                            @click="handleToGoCommonToolsPage(item)"
                        >
                            <div class="icon">
                                <img v-bind:src="item.iconPath">
                            </div>
                            <div class="name">{{item.appName}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Loading v-if="isLoading"/>
    </div>
</template>

<script>
import Loading from "../components/loading";
export default {
    components: {Loading},

    data () {
        return {
            appLists:[
                {
                    appId:'1', 
                    appName:'角度弧度转换', 
                    iconPath:'./images/icon_angToRad.png',
                    type:'trans',
                    path:'../modules/module_commonTools/angToRad/main'
                },
                {
                    appId:'2', 
                    appName:'进制转换', 
                    iconPath:'./images/icon_sysConvert.png',
                    type:'trans',
                    path:'../modules/module_commonTools/sysConvert/main'
                },
                {
                    appId:'3', 
                    appName:'长度转换', 
                    iconPath:'./images/icon_length.png',
                    type:'trans',
                    path:'../modules/module_commonTools/length/main'
                },
                {
                    appId:'4', 
                    appName:'面积转换', 
                    iconPath:'./images/icon_area.png',
                    type:'trans',
                    path:'../modules/module_commonTools/area/main'
                },
                {
                    appId:'5', 
                    appName:'体积转换', 
                    iconPath:'./images/icon_volume.png',
                    type:'trans',
                    path:'../modules/module_commonTools/volume/main'
                },
                {
                    appId:'6', 
                    appName:'质量转换', 
                    iconPath:'./images/icon_kg.png',
                    type:'trans',
                    path:'../modules/module_commonTools/weight/main'
                },
                {
                    appId:'7', 
                    appName:'温度转换', 
                    iconPath:'./images/icon_temperature.png',
                    type:'trans',
                    path:'../modules/module_commonTools/temperature/main'
                },
                {
                    appId:'8', 
                    appName:'功/能/热转换', 
                    iconPath:'./images/icon_energy.png',
                    type:'trans',
                    path:'../modules/module_commonTools/energy/main'
                },
                {
                    appId:'9', 
                    appName:'圆', 
                    iconPath:'./images/icon_circle.png',
                    type:'calc',
                    path:'../modules/module_calcTools/circle/main'
                },
                {
                    appId:'9', 
                    appName:'矩形', 
                    iconPath:'./images/icon_rectangle.png',
                    type:'calc',
                    path:'../modules/module_calcTools/rectangle/main'
                },
                {
                    appId:'10', 
                    appName:'三角形', 
                    iconPath:'./images/icon_triangle.png',
                    type:'calc',
                    path:'../modules/module_calcTools/triangle/main'
                },
                {
                    appId:'11', 
                    appName:'多边形', 
                    iconPath:'./images/icon_polygon.png',
                    type:'calc',
                    path:'../modules/module_calcTools/polygon/main'
                },
                {
                    appId:'12', 
                    appName:'生辰八字', 
                    iconPath:'./images/icon_character.png',
                    type:'calc',
                    path:'../modules/module_calcTools/character/main'
                },
            ],
            appTransLists: [],
            appCalcLists: [],
            isLoading: true
        }
    },

    mounted() {
        this.initClassifyLists();
    },

    methods: {
        // 初始化列表
        initClassifyLists() {
            let { appLists } = this;
            this.appTransLists = appLists.filter(item => item.type == 'trans');
            this.appCalcLists = appLists.filter(item => item.type == 'calc');
            if(this.appTransLists.length && this.appCalcLists.length){
                this.isLoading = false
            }
        },

        // 点击图标跳转到相应页面
        handleToGoCommonToolsPage(item) {
            wx.navigateTo({url: item.path});
        },
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
    .appStore{
        background: @baseColor;
        padding: 5px 7.5px 0;
        .app_tools{
            margin-bottom: 5px;
            width: 100%;
            .header{
                display: flex;
                align-items: center;
                color: @mainTitleColor;
                height: 50px;
                font-size: 16px;
                background: #ffffff;
                padding: 0 20px;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
            .body{
                margin-top: 0.5px;
                background: #ffffff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        position: relative;
                        width: 33.3333333%;
                        height: 105px;
                        &:before{
                            position: absolute;
                            content:'';
                            display: block;
                            width: 0.5px;
                            height: 100%;
                            top: -0.5px;
                            right: -0.5px;
                            border-right: 0.5px solid @baseColor;
                        }
                        &:after{
                            position: absolute;
                            content: '';
                            display: block;
                            width: 100%;
                            height: 0.5px;
                            bottom: 0;
                            left: 0;
                            border-bottom: 0.5px solid @baseColor;
                        }
                        .icon{
                            margin-top: 25px;
                            width: 100%;
                            height: 30px;
                            text-align: center;
                            img{
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                            }
                        }
                        .name{
                            margin-top: 15px;
                            font-size: 14px;
                            color: @textColor;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>