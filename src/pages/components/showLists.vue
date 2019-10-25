<template>
    <div class="show_area">
        <ul>
            <li v-for="item in lists" :key="item.value">
                <div class="label">{{item.label}}</div>
                <div class="value">{{item.targetValue}}</div>
                <div class="unit">{{item.unit}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        lists: {
            type: Array,
            default: []
        },
    },

    data() {
        return {
            lists: this.lists,
        };
    },

    mounted(){
        console.log('lists', this.lists)
    },
    
    methods: {
    }
};
</script>

<style lang="less" scoped>
    @textLightColor: #adb8ca;
    @textColor: #5e6b80;
    .show_area{
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
                    width: 100px;
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
</style>