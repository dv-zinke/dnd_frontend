<template>
    <div>
        <naver-maps
                :height="400"
                :initLayers="initLayers"
                :mapOptions="mapOptions"
                :width="400"
        >

            <naver-circle :lat="35.2051917" :lng="129.1231357" :radius="12"/>
        </naver-maps>
    </div>
</template>

<script>
    import NaverApi from "../api/NaverApi";
    import GoogleApi from "../api/GoogleApi";

    export default {
        name: "MapComponent",

        data() {
            return {
                mapOptions: {
                    lat: 35.2051917,
                    lng: 129.1231357,
                    zoom: 16,
                    zoomControl: false,
                    zoomControlOptions: {position: 'TOP_RIGHT'},
                    mapTypeControl: false,
                },
                initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
            }
        },
        mounted() {
            console.log("A");
            GoogleApi().getAddress()
                .then(res => {
                    return NaverApi().getAddress(`${res.data.location.lng},${res.data.location.lat}`)
                })
                .then(f =>{
                    console.log(f)
                })


        }
    }
</script>

<style scoped>

</style>
