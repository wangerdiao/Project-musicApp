<template>
    <div class="topNav">
        <div class="topLeft">
             <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-hanbaocaidan"></use>
            </svg>
        </div>
        <div class="topContent">
            <sapn>我的</sapn>
            <sapn class="active">发现</sapn>
            <sapn>云村</sapn>
            <sapn>视频</sapn>
        </div>
        <div class="topRight">
             <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .topNav{
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topContent{
            width: 65%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            font-size: .36rem;
            align-items: center;
            .active{
                font-weight: 900;
            }
        }
    }
</style>