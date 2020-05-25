<template>
  <div class="image-view" @click="onClick">
    <img 
      :class="round? 'round image' : 'image'"
      :style="{ height }"
      :src="src"
      :mode="mode"
      :lazy-load="lazyload"
      @load="onLoad"
      @error="onError"
      v-show="!isLoading && !error"
    />
    <img 
      :class="round? 'round image' : 'image'"
      :style="{ height }"
      src="/static/images/loading.jpeg"
      :mode="mode"
      :lazy-load="lazyload"
      v-show="isLoading || error"
    />
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: ''
      },
      mode: { // 图片加载模式
        type: String,
        default: 'widthFix'
      },
      lazyload: {// 是否要懒加载
        type: Boolean,
        default: true
      },
      round: { // 是否是圆形图片
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: 'auto'
      }
    },
    watch: {
      src (newValue, oldValue) {}
    },
    data () {
      return {
        isLoading: true,
        error: false
      }
    },
    methods: {
      onClick () {
        this.$emit('onClick')
      },
      onError () {
        this.isLoading = false
        this.error = true
      },
      onLoad () {
        this.isLoading = false
        this.error = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image-view {
    width: 100%;
    .image {
      width: 100%;
      &.round {
        border-radius: 50%;
      }
    }
  }
</style>
