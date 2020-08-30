<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        {{this.data}}
    </div>
</template>

<script>
    var count = 0;
    export default {
        name: "Comment",
        data() {
            return {
                data: [],
                busy: false
            }
        },
        methods: {
            loadMore: function() {
                this.busy = true;

                setTimeout(() => {
                    for (let i = 0, j = 10; i < j; i++) {
                        this.data.push({ name: count++ });
                    }
                    this.busy = false;
                }, 1000);
            }
        },
    }
</script>

<style scoped>

</style>
