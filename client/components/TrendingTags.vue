<template>
    <v-card style="min-height: 200px;" color="#F5F5F5" class="ml-4">
        <v-card-title class="font-weight-medium" style="font-size: 20px; padding-bottom: 5px; padding-top: 8px;">Trending Tags</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="padding-top: 8px;">
            <Tag v-for="(tag, i) in tags" :key="i" :tagname="tag"></Tag>
        </v-card-text>
    </v-card>
</template>

<script>
import Tag from "./Tag"
import axios from "axios"


export default {
    name: "TrendingTags",
    components: {
        Tag
    },
    data () {
        return {
            baseUrl: "http://localhost:3000/api",
            tags: []
        }
    },
    created() {
        axios.request({
            method: "GET",
            url :`${this.baseUrl}/articles/trendingtags`
        })
        .then(response =>{
            this.tags = response.data
        })
        .catch(err =>{
            console.log(err.response)
        })
    }
}
</script>

<style>

</style>
