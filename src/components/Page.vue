<template>
    <div class="page">
        <a v-for="item in pageSum" :key="item" @click="getWeibo(item);$emit('update:pageIndex',item)" href="javascript:;" :class="{active:pageIndex===item}">{{item}}</a>
    </div>
</template>
<script>
export default {
    name:"Page",
    props:["getWeibo","pageSum","pageIndex"],
}
</script>