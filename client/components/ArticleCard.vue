<template>
    <v-hover class="mb-3">

        <v-card :class="`elevation-${hover ? 3 : 1}`" slot-scope="{ hover }" color="#F5F5F5">
            <v-layout row wrap>
                <v-flex xs9 style="">
                    <v-card-title>
                        <div class="headline" @click="viewContent">{{articleData.title}}</div>
                        <div v-show="$route.path ==='/myarticles'" style="margin-left: 2%;">
                            <v-icon class="editicon mr-1" @click="editArticle">edit</v-icon>
                            <v-icon class="deleteicon" @click="deleteArticle">delete</v-icon>
                        </div>

                        <div class="subheading grey--text text--darken-2 mt-2" style="min-width: 95%; height: 44px;" @click="viewContent" v-line-clamp:20="2" >
                            <p v-html="articleData.content">
                                
                            </p>
                        </div>


                        <div>
                        
                        <div class="body-1 font-weight-regular mt-2">{{articleData.author.username}}</div>
                        <div class="grey--text text--darken-2">{{formatDate}}</div>
                        
                        </div>

                            <v-spacer></v-spacer>
                        <v-card-actions>
                            <Tag :tagname="tag" v-for="(tag, index) in articleData.tags" :key="index"></Tag>
                        </v-card-actions>
                    </v-card-title>
                    
             
                </v-flex>
                <v-flex xs3>
                    <v-card-text>
                    <v-img :src="articleData.image"></v-img>

                    </v-card-text>
                </v-flex>
            </v-layout>
        </v-card>
        </v-hover>
</template>

<script>
import Tag from "../components/Tag"
import moment from "moment"
import axios from "axios"

export default {
    name: "ArticleCard",
    props: {
        articleData: Object
    },
    components: {
        Tag
    },
    data() {
        return {
            baseUrl: "https://miniwp-server.fildabert.com/api"
        }
    },
    methods: {
        viewContent: function() {
            this.$router.push({name: "ViewArticle", params:{id: this.articleData._id, title: this.articleData.title}})
        },
        deleteArticle: function() {
            axios.request({
                method: "DELETE",
                url: `${this.baseUrl}/articles/deletearticle?id=${this.articleData._id}`,
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(response =>{
                this.$emit("changed")
            })
            .catch(err =>{
                this.$emit("err", "Oops something is wrong")
                // console.log(err.response)
            })
        },
        editArticle: function() {
            // this.$router.push("/asd")
            this.$router.push({name: "EditArticle", params:{id: this.articleData._id, title: this.articleData.title}})
        }
    },
    computed: {
        formatDate: function() {
            return moment(this.articleData.createdAt).fromNow()
        }
    }

}
</script>

<style scoped>
.headline:hover {
    cursor: pointer;
}

.subheading:hover {
    cursor: pointer;
}

.deleteicon {
    font-size: 18px;
}

.editicon {
    font-size: 18px;
}

.deleteicon:hover {
    cursor: pointer;
    color: red;
    font-size: 23px;
}

.editicon:hover {
    cursor: pointer;
    color: orange;
    font-size: 23px;
}
</style>
