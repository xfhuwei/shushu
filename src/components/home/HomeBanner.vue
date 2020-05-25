<template>
  <div class="home-banner" @click="onClick">
    <div class="bg-img" :style="{backgroundImage: bgImage}">
      <div class="title">{{title}}</div>
      <div class="sub-title">{{subTitle}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      subTitle: String,
      img: String
    },
    computed: {
      bgImage () {
        return 'url(' + this.img + ')'
      }
    },
    methods: {
      onClick () {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-banner {
    width: 100%;
    margin-top: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    .bg-img {
      height: 125px;
      border-radius: 10px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .title {
        font-size: 18px;
        font-weight: 500;
        color: #fff;
      }
      .sub-title {
        margin-top: 10px;
        font-size: 14px;
        color: #fff;
        padding: 5px 15px;
        background: #4565ff;
        border: 1px solid #fff;
        border-radius: 50px;
      }
    }
  }
</style>
