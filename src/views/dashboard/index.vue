<template>
    <section class="dashboard bgmain center">
        <!-- {{ name }} -->
        <img class="nothing" src="/img/nothing.png" />
    </section>
</template>
<script lang="ts" setup name="/">
/** 可以获取dom, data也已经渲染到html */
onMounted(() => {
    console.log('hello, dashboard 2~~~')
})
</script>
<style lang="scss">
.dashboard {
    img {
        width: 400px;
    }
}
</style>