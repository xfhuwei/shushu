<template>
  <div class="tag-wrapper" @click="onClick">
    <div class="tag">{{text}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
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
  .tag-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 17px;
    background: #f7f7f9;
    border-radius: 16px;
    width: 100%;
    box-sizing: border-box;
    .tag {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #272e37;
    }
  }
</style>
