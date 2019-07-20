import CreateArticle from "./src/CreateArticle.vue"
import Home from "./src/Home.vue"
import MyArticles from "./src/MyArticles.vue"
import ViewArticle from "./src/ViewArticle.vue"
import TagPage from "./src/TagPage.vue"

const routes = [
    {path: "/", component: Home},
    {path: "/createarticle", component: CreateArticle},
    {path: "/myarticles", component: MyArticles},
    {name: "ViewArticle", path: "/viewarticle/:title", component: ViewArticle, props: true},
    {name: "TagPage", path: "/tag/:tag", component: TagPage, props: true}
]

export default routes