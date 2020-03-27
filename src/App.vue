<template>
  <div class="jyArea">
        <!--留言-->
        <TakeComment></TakeComment>
        <!--已留-->
        <CommentOn></CommentOn>
    </div>
</template>
<script>
export default {
  name:"app",
  components:{
    TakeComment:()=>import("@/components/TakeComment"),
    CommentOn:()=>import("@/components/CommentOn")
  }
}
</script>