<template>
    <div class="commentOn">
        <div v-if="commentList.length<1" class="noContent">暂无留言</div>
        <div class="messList">
            <div v-for="item in commentList" :key="item._id" class="reply">
                <p class="replyContent">{{item.comment}}</p>
                <p class="operation">
                    <span class="replyTime">{{item.addTime|date}}</span>
                    <span class="handle">
                    	<a href="javascript:;" @click="setWeibo(item._id,1)" class="top">{{item.topNum}}</a>
                        <a href="javascript:;" @click="setWeibo(item._id,0)" class="down_icon">{{item.downNum}}</a>
                        <a href="javascript:;" @click="delWeibo(item._id)" class="cut">删除</a>
                    </span>
                </p>
            </div>
        </div>
        <Page :getWeibo="getWeibo" :commentList="commentList" :pageSum="pageSum" :pageIndex.sync="pageIndex"></Page>
    </div>
</template>
<script>
export default {
    name:"CommentOn",
    data(){
        return {
            commentList:[],
            pageIndex:1,
            pageSum:1
        }
    },
    methods:{
        async getWeibo(pageIndex=1){
            const res = await this.$http.get("http://127.0.0.1:80/weibo",{params:{pageIndex}})
            this.commentList=res.commentList
            this.pageIndex=res.pageIndex
            this.pageSum=res.pageSum
        },
        async setWeibo(id,type){
            const res = await this.$http.put("http://127.0.0.1:80/weibo",{params:{id,type}})
            if(res.code===1){
                this.getWeibo(this.pageIndex)
            }else{
                alert(res.msg)
            }
        },
        async delWeibo(id){
            const res = await this.$http.delete("http://127.0.0.1:80/weibo",{params:{id}})
            if(res.code===1){
                this.getWeibo(this.pageIndex)
            }else{
                alert(res.msg)
            }
        }
    },
    components:{
        Page:()=>import("./Page")
    },
    mounted(){
        this.getWeibo()
        this.$bus.$on("getWeibo",this.getWeibo)
    },
}
</script>