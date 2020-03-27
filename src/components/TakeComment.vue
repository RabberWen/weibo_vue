<template>
    <div class="takeComment">
        <textarea ref="comment" name="textarea" class="takeTextField" id="tijiaoText"></textarea>
        <div class="takeSbmComment">
            <input @click="addWeibo" type="button" class="inputs" value="" />
        </div>
    </div>
</template>
<script>
export default {
    name:"TakeComment",
    data(){
        return {
            comment:""
        }
    },
    methods:{
        addWeibo(){
            if(this.$refs.comment.value){
                this.$http.post("http://127.0.0.1:80/weibo",{comment:this.$refs.comment.value})
                .then(res=>{
                    if(res.code===1){
                        this.$refs.comment.value = null;
                        this.$bus.$emit("getWeibo");
                    }
                })
            }
        }
    }
}
</script>