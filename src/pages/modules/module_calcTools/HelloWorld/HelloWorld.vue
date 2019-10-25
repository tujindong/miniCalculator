<template>
    <div class="angToRad">
        <div class="background">
            <img src="../../../../../static/images/bg_mountain.jpg">
        </div>
        <div class="container">
            <div class="header">
                <div class="title">角度弧度转换</div>
            </div>
            <div class="body">
                <div class="canvas_area">
                    画布区域
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },

    methods: {
        
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
                padding: 5px 7.5px 0;
               
            }
        }
    }
</style>