<template>
    <div class="choose_area">
        <div 
            class='btn' 
            @click="onChooseBtnClick"
            :style='{
                color: btnColor,
                border: "1px solid " + btnColor,
                boxShadow: "0px 0px 5px " + btnColor
            }'
        >
            {{btnContent}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        btnContent: {
            type: String,
            default: ''
        },
        btnColor: {
            type: String,
            default: '#cccccc'
        },
        btnCotrolStatus: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            btnContent: this.btnContent,
            btnCotrolStatus: this.btnCotrolStatus,
            btnColor: this.btnColor
        };
    },
    
    methods: {
        onChooseBtnClick() {
            this.$emit("onChooseBtnClick", this.btnCotrolStatus);
        }
    }
};
</script>

<style lang="less" scoped>
    .choose_area{
        display: flex;
        width: 100%;
        height: 120px;
        justify-content: center;
        align-items: center;
        .btn{
            display: block;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            text-align: center;
            line-height: 100px;
        }
    }    
</style>