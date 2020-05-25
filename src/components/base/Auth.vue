<template>
  <div class="auth-wrapper">
    <div class="auth">
      <div class="auth-info">
        <div class="auth-img">
          <ImageView
            height="100%"
            mode="scaleToFill"
            round
            src="/static/images/shusu.jpg"></ImageView>
        </div>
        <div class="sub-title">登录书束</div>
        <div class="title">全球好书免费读</div>
      </div>
      <button
        class="auth-btn"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
      >授权登录</button>
    </div>
  </div>
</template>

<script>
  import ImageView from './ImageView'
  export default {
    components: {ImageView},
    methods: {
      getUserInfo () {
        this.$emit('getUserInfo')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .auth-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: rgba(0,0,0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    .auth {
      width: 270px;
      height: 248px;
      background: #f5f5f5;
      border-radius: 18px;
      position: relative;
      .auth-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 22px;
        .auth-img {
          width: 74px;
          height: 74px;
        }
        .sub-title {
          font-size: 13px;
          color: #999;
          line-height: 18.5px;
          margin-top: 18px;
        }
        .title {
          font-size: 16.5px;
          color: #333;
          line-height: 22.5px;
          margin-top: 3.5px;
        }
      }
      .auth-btn {
        background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
        border-radius: 0 0 18px 18px;
        color: #fff;
        position: absolute;
        bottom: 0;
        width: 100%;
        font-size: 15px;
        line-height: 49px;
        height: 49px;
      }
    }
  }
</style>
