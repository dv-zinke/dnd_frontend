<template>
    <v-container>
        <span>댓글</span>
        <div infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-infinite-scroll="loadMore">
            <v-card
                    :key="item"
                    class="mx-auto mb-3"
                    max-width="400"
                    outlined
                    v-for="item in data"
            >
                <v-card-title>
                    <v-list-item-avatar color="grey darken-3" size="30">
                        <v-img
                                class="elevation-6"
                                max-width="30"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                        ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="font-size12">Evan You</v-list-item-title>
                    </v-list-item-content>
                </v-card-title>

                <v-card-text class="headline font-size12">
                    "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type
                    invalid as well."
                    "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type
                    invalid as well."
                    "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type
                    invalid as well."
                    "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type
                    invalid as well."
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-row
                                align="center"
                                justify="end"
                        >
                            <v-icon class="mr-1">mdi-heart</v-icon>
                            <span class="subheading mr-2 font-size12">256</span>
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>

<script>
    var count = 0;
    export default {
        name: "Comment",
        data() {
            return {
                data: [{},{},{}],
                busy: false,

            }
        },
        mounted(){

        },
        methods: {

            loadMore: function () {
                this.busy = true;

                setTimeout(() => {
                    for (let i = 0, j = 10; i < j; i++) {
                        this.data.push({name: count++});
                    }
                    this.busy = false;
                }, 1000);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .font-size12 {
        font-size: 12px !important;
        line-height: 16px !important;
    }
</style>
