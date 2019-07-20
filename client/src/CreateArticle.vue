<template>
    <v-layout wrap mt-5>
        <v-flex xs6 offset-xs5>
            <v-progress-circular
            indeterminate
            color="primary"
            class="ml-4"
            v-show="submitLoading"
            ></v-progress-circular>
        </v-flex>
        <v-flex xs12>
        <h1>Create Article</h1>

        </v-flex>

        <v-flex xs12>
        <v-text-field
        label="Title"
        prepend-icon="title"
        v-model="title"
        ></v-text-field>

        <v-flex xs12>
            <v-text-field
            label="Upload Image"
            prepend-icon="far fa-images"
            @click='pickFile' 
            v-model='imageName'
            >
                
            </v-text-field>

            <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
            >


        </v-flex>

        <v-flex xs12 align-self-center class="text-xs-center">
            <v-progress-circular
            indeterminate
            color="primary"
            v-show="loading"
            ></v-progress-circular>
        <img :src="imageUrl" height="150" v-if="imageUrl"/>

        </v-flex>

        <v-combobox 
            multiple
            v-model="tags" 
            label="Tags" 
            prepend-icon="fas fa-tags"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            >
          </v-combobox>

       <editor v-model="content" api-key='tui4y4bazzyrqipcnit6gp9y1g2c0ey1g9binywg47fgnm9v' :init="{menubar: false}"></editor>
        <v-expansion-panel>
            <v-expansion-panel-content
            >
            <template v-slot:header>
                <div>Preview content before posting</div>
            </template>
            <v-card>
                <v-card-text v-html="content"></v-card-text>
            </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
        </v-flex>
        <v-flex xs1 offset-xs5 class="mt-2">
            <v-btn @click="createArticle">Submit</v-btn>
        </v-flex>


        <v-snackbar
         v-model="snackbar"
         top
         color="red lighten-1"
        >
        {{errorMessage}}
        </v-snackbar>
    </v-layout>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import axios from "axios"

export default {
    name: "CreateArticle",
    components: {
        Editor
    },
    created() {
    
    },
    mounted() {
       
    },
    data () {
        return {
            loading: false,
            submitLoading: false,
            title: "",
            tags: [],
            content: "",
            imageName: "",
            imageFile: "",
            imageUrl: "",
            imageLinkFromGCS: "",
            baseUrl: "http://localhost:3000/api",
            snackbar: false,
            errorMessage: ""

        }
    },
    methods: {
       pickFile () {
            this.$refs.image.click ()
        },
        onFilePicked (e) {
            this.loading = true
            this.imageUrl = ""
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
                    this.imageFile = files[0] // this is an image file that can be sent to server...
                    const formData = new FormData()
                        formData.append('image',this.imageFile)
                        axios.post(`${this.baseUrl}/googleCloudStorage`, formData)
                          .then(({ data }) =>{
                            this.loading = false
                            this.imageUrl = fr.result
                            this.imageLinkFromGCS = data
                            })
                          .catch(err =>{
                            this.snackbarError(err.response.data)
                            this.loading = false
                            })
                })
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
        },
        createArticle: function() {
            this.submitLoading = true
            axios.request({
                method: "POST",
                url: `${this.baseUrl}/articles/addarticle`,
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    title: this.title,
                    content: this.content,
                    image: this.imageLinkFromGCS,
                    tags: this.tags
                }
            })
            .then(response =>{
                this.submitLoading = false
                this.$router.push("/")
            })
            .catch(err =>{
                this.snackbarError(err.response.data)
                this.submitLoading = false
            })
        },
        snackbarError: function(errMessage) {
            this.snackbar = true
            this.errorMessage = errMessage
            setTimeout(() =>{
                this.snackbar = false
                this.errorMessage = ""
            }, 3000)
        }

    }
}
</script>

<style>
.tag-input span.v-chip {
  content: "label";
  background-color: #607D8B;
  color: #fff;
  font-size:1em;
  padding-left:7px;
}

.tag-input span.v-chip::before {
    content: "label";
    font-family: 'Material Icons';
}

</style>
