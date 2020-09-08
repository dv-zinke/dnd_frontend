<template>
    <div class="top_content">
        <div class="ml-2 mt-5">
            <img src="@/assets/logo.png">
        </div>

        <div class="main_imag">
            <v-img src="@/assets/main_content.png"></v-img>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainTopContent"
    }
</script>

<style scoped lang="scss">
    .top_content {
        background: #F4F4E3;
        width:100%;
        height: 270px;
        position: relative;
        overflow: hidden;
        .bell_icon {
            position: absolute;
            top: 10px;
            right: 10px;
        }
        .main_imag{
            position: absolute;
            left: -70px;
            width: 140%;
            top: 16px;
            img{
                width:100%;
            }
        }

    }
</style>
