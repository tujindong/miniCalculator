<template>
    <div class="loading">
        <div class="spinner">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        
    },

    methods: {}
};
</script>

<style lang="less" scoped>
.loading{
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: #e0e0eb;
}
.spinner {
    margin: 20px;
    display: inline-block;
    position: relative;
    height: 60px;
    width: 60px;
    margin: 150px auto;
    display: block;
}

.spinner span {
    height: 3px;
    width: 3px;
    border-radius: 50%;
    position: absolute;
    background: #7389AE;
}

.spinner > span:nth-child(1) {
    top: 28px;
    left: 8px;
    animation: bounce 2s linear 0s infinite;
}

.spinner > span:nth-child(2) {
    top: 28px;
    left: 14px;
    animation: bounce 2s linear 0.09s infinite;
}

.spinner > span:nth-child(3) {
    top: 28px;
    left: 20px;
    animation: bounce 2s linear 0.18s infinite;
}

.spinner > span:nth-child(4) {
    top: 28px;
    left: 26px;
    animation: bounce 2s linear 0.27s infinite;
}

.spinner > span:nth-child(5) {
    top: 28px;
    left: 32px;
    animation: bounce 2s linear 0.36s infinite;
}

.spinner > span:nth-child(6) {
    top: 28px;
    left: 38px;
    animation: bounce 2s linear 0.45s infinite;
}

.spinner > span:nth-child(7) {
    top: 28px;
    left: 44px;
    animation: bounce 2s linear 0.54s infinite;
}

.spinner > span:nth-child(8) {
    top: 28px;
    left: 50px;
    animation: bounce 2s linear 0.63s infinite;
}

@keyframes bounce {
    0%, 10%, 100% {
        top: 28px;
        transform: scale(1);
    }
    5% {
        top: 20px;
        transform: scale(2);
    }
}
</style>