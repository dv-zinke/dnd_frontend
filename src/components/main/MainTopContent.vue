<template>
    <div class="top_content">
        <div class="bell_icon">
            <v-icon>mdi-bell-outline</v-icon>
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
        background: #c7f4ef;
        width:100%;
        height: 250px;
        position: relative;
        .bell_icon {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }
</style>
