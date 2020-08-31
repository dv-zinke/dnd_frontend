<template>
    <v-autocomplete
            v-model="model"
            :items="items"
            :search-input.sync="search"
            hide-no-data
            hide-details
            item-text="Description"
            item-value="id"
            label="궁금한 점을 해쉬태그로 검색하세요."
            rounded
            return-object
            outlined
            @focus="searchAll"
            color="#3ad9ac"
            full-width="320px"
            class="search_bar"
    >
        <template v-slot:prepend-inner>
            <v-icon
                    color="#3ad9ac"
            >mdi-magnify</v-icon>
        </template>
    </v-autocomplete>
</template>

<script>
    import WriteApi from "../../api/WriteApi";

    export default {
        name: "MainSearchBar",
        data() {
            return {
                descriptionLimit: 40,
                entries: [],
                isLoading: false,
                model: null,
                search: null,
            }
        },
        computed: {
            items () {
                return this.entries.map(entry => {
                    const Description = entry.name.length > this.descriptionLimit
                        ? entry.name.slice(0, this.descriptionLimit) + '...'
                        : entry.name;

                    return Object.assign({}, entry, { Description })
                })
            },
        },
        mounted(){

        },
        methods: {
            searchAll() {
                // Items have already been loaded
                if (this.items.length > 0) return;

                // Items have already been requested
                if (this.isLoading) return;

                this.isLoading = true;
                WriteApi().getContainHashTag("")
                    .then(res => {
                        this.entries = res.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => (this.isLoading = false))
            }
        },
        watch: {
            search (val) {
                // Items have already been loaded
                if (this.items.length > 0) return;

                // Items have already been requested
                if (this.isLoading) return;

                this.isLoading = true;

                // Lazily load input items
                WriteApi().getContainHashTag(val)
                    .then(res => {
                        this.entries = res.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => (this.isLoading = false))
            },
        },
    }
</script>

<style scoped lang="scss">
    .search_bar {
        width: 90%;
    }
    .search_bar fieldset {
        border-color:#3ad9ac;
        border-width: 2px;
    }
</style>
