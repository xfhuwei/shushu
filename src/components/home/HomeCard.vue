<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="userinfo">
        <div class="acater-wrapper">
          <ImageView
            src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
            round
          />
        </div>
        <div class="nickname">{{ '米老鼠' }}</div>
        <div class="shelf-text">书架共有{{3}}本好书</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别精选</div>
      </div>
      <div class="bookinfo">
        <div class="book-wrapper">
          <div class="book-img-wrapper">
            <ImageView
              src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
            />
          </div>
          <div class="book-img-wrapper">
            <ImageView
              src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
            />
          </div>
          <div class="book-img-wrapper">
            <ImageView
              src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
            />
          </div>
        </div>
        <div class="shelf-wrapper">
          <div class="shelf">书架</div>
          <van-icon class="arrow" name="arrow" size="11" color="#828489"></van-icon>
        </div>
      </div>
      <div class="feedback-wrapper" @click="onFeedBackClick">反馈</div>
    </div>
    <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  import Dialog from 'vant-weapp/dist/dialog/dialog'

  export default {
    components: {ImageView},
    props: {
      data: Object,
      // num: {
      //   type: Number,
      //   default: 0
      // },
      hasSign: { // 签到天数
        type: Boolean,
        default: false
      },
      signDay: { // 签到天数
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        platform: mpvuePlatform
      }
    },
    methods: {
      gotoShelf () {
        // 跳转到书架页
        // this.$router.push('/pages/shelf/main')
      },
      onBookClick (book) {
        this.$emit('onBookClick', book)
      },
      sign () {
        this.$emit('onSignClick')
      },
      showChapter () {

      },
      onFeedBackClick () {
        Dialog.confirm({
          title: '反馈',
          message: '您是否确认提交反馈信息？',
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          console.log('点击是之后的事件')
        }).catch(() => {
          console.log('点击否之后的事件')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-card {
    background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
    border-radius: 15px;
    margin: 22px 20px 0;
    .home-card-inner {
      padding: 21.5px 17px 20px 20px;
      box-sizing: border-box;
      position: relative;
      .userinfo {
        display: flex;
        align-items: center;
        .acater-wrapper {
          width: 20px;
          height: 20px;
        }
        .nickname {
          color: #fff;
          font-size: 12px;
          margin: 8.5px;
        }
        .shelf-text {
          color: #fff;
          font-size: 12px;
          opacity: 0.7;
        }
        .round-item {
          width: 4px;
          height: 4px;
          background: #a2a2a2;
          border-radius: 50%;
          margin: 0 8px;
        }
      }
      .bookinfo {
        display: flex;
        margin-top: 16.5px;
        .book-wrapper {
          display: flex;
          flex: 1;
          justify-content: space-between;
          .book-img-wrapper {
            width: 72px;
            height: 101px;
          }
        }
        .shelf-wrapper {
          display: flex;
          align-items: center;
          margin-left: 15px;
          .shelf {
            font-size: 10.5px;
            color: #fff;
            width: 11px;
            word-break: break-word;
            opacity: 0.8;
          }
        }
      }
      .feedback-wrapper {
        width: 44.4px;
        height: 23.5px;
        background: #707070;
        border-radius: 100px 0 0 100px;
        color: #fff;
        font-size: 11px;
        position: absolute;
        right: 0;
        top: 19.5px;
        line-height: 23.5px;
        text-align: center;
      }
    }
  }
</style>
