<template>
  <div class="home">
    <SearchBar
      disabled
      @onClick="onSearchBarClick"
    />
    <HomeCard/>
    <HomeBanner
      title="这是 mpvue 写的小程序呀"
      subTitle="立即体验"
      img="http://www.youbaobao.xyz/book/res/bg.jpg"
      @onClick="onBannerClick"
    />
    <div :style="{marginTop: '23px'}">
      <HomeBook
        title="为你推荐"
        :row="2"
        :col="2"
        :data="data"
        mode="row"
        btn-text="换一批"
        @onMoreClick="onBookMoreClick"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div :style="{marginTop: '23px'}">
      <HomeBook
        title="分类"
        :row="3"
        :col="2"
        :data="data2"
        mode="category"
        btn-text="查看全部"
        @onMoreClick="onBookMoreClick"
        @onBookClick="onHomeBookClick"
      />
    </div>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import HomeCard from '../../components/home/HomeCard'
  import HomeBanner from '../../components/home/HomeBanner'
  import HomeBook from '../../components/home/HomeBook'
  import { getHomeData } from '@/api/index'

  export default {
    components: {
      HomeBook,
      HomeBanner,
      HomeCard,
      SearchBar
    },
    data () {
      return {

      }
    },
    methods: {
      getHomeData () {
        getHomeData({ openId: 1234 }).then((response) => {
          console.log(response)
        })
      },
      onBookMoreClick () {
        console.log('点击了换一批')
      },
      onHomeBookClick () {
        console.log('点击了书本')
      },
      onSeachBarkClick () {
        // 跳转到搜索页面
      },
      onBannerClick () {
        console.log('点击了Banner')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
