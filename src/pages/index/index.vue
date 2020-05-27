<template>
  <div>
    <div class="home">
      <SearchBar
        disabled
        @onClick="onSearchBarClick"
        :hot-search="hotSearch"
      />
      <HomeCard
        :data="homeCard"
        @onClick="onHomeBookClick"
      />
      <HomeBanner
        title="mpvue"
        subTitle="立即体验"
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        @onClick="onBannerClick"
      />
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="为你推荐"
          :row="1"
          :col="3"
          :data="recommend"
          mode="col"
          btn-text="换一批"
          @onMoreClick="recommendChange('recommend')"
          @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="免费阅读"
          :row="2"
          :col="2"
          :data="freeRead"
          mode="row"
          btn-text="换一批"
          @onMoreClick="recommendChange('freeRead')"
          @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="当前最热"
          :row="1"
          :col="4"
          :data="hotBook"
          mode="col"
          btn-text="换一批"
          @onMoreClick="recommendChange('hotBook')"
          @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="分类"
          :row="3"
          :col="2"
          :data="category"
          mode="category"
          btn-text="查看全部"
          @onMoreClick="onCategoryMoreClick"
          @onBookClick="onHomeBookClick"
        />
      </div>
    </div>
    <Auth v-if="showAuth" @getUserInfo="init"></Auth>
  </div>
</template>

<script>
  import Auth from '../../components/base/Auth'
  import SearchBar from '../../components/home/SearchBar'
  import HomeCard from '../../components/home/HomeCard'
  import HomeBanner from '../../components/home/HomeBanner'
  import HomeBook from '../../components/home/HomeBook'
  import { getHomeData, recommend, freeRead, hotBook, register } from '@/api/index'
  import {
    getSetting,
    getUserInfo,
    setStorageSync,
    getStorageSync,
    getUserOpenId,
    showLoading,
    hideLoading
  } from '@/api/wechat'

  export default {

    components: {
      HomeBook,
      HomeBanner,
      HomeCard,
      SearchBar,
      Auth
    },
    data () {
      return {
        showAuth: false,
        hotSearch: '',
        homeCard: {},
        banner: {},
        recommend: [],
        freeRead: [],
        hotBook: [],
        category: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.getSetting()
      },
      getUserInfo () {
        getUserInfo(
          (userInfo) => {
            setStorageSync('userInfo', userInfo)
            const openId = getStorageSync('openid')
            if (!openId || openId.length <= 0) {
              getUserOpenId((openId) => {
                this.getHomeData(openId, userInfo)
                register(openId, userInfo)
              })
            } else {
              this.getHomeData(openId, userInfo)
              register(openId, userInfo)
            }
          },
          (res) => {
            console.log('获取用户信息失败')
          }
        )
      },
      getSetting () {
        getSetting(
          'userInfo',
          (res) => {
            this.showAuth = false
            showLoading('正在加载')
            this.getUserInfo()
          },
          (res) => {
            this.showAuth = true
          }
        )
      },
      recommendChange (key) {
        switch (key) {
          case 'recommend':
            recommend().then((res) => {
              this.recommend = res.data.data
            })
            break
          case 'freeRead':
            freeRead().then((res) => {
              this.freeRead = res.data.data
            })
            break
          case 'hotBook':
            hotBook().then((res) => {
              this.hotBook = res.data.data
            })
            break
        }
      },
      getHomeData (openId, userInfo) {
        getHomeData({openId}).then((response) => {
          console.log(response)
          const {
            data: {
              data: {
                hotSearch: { keyword },
                shelf,
                shelfCount,
                banner,
                recommend,
                freeRead,
                hotBook,
                category
              }
            }
          } = response
          this.hotSearch = keyword
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo
          }
          this.banner = banner
          this.recommend = recommend
          this.freeRead = freeRead
          this.hotBook = hotBook
          this.category = category
          hideLoading()
        }).catch(err => {
          console.log(err)
          hideLoading()
        })
      },
      onCategoryMoreClick () {
        // console.log('点击了换一批')
      },
      onHomeBookClick (book) {
        this.$router.push({
          path: '/pages/detail/main',
          query: {
            fileName: book.fileName
          }
        })
      },
      onSearchBarClick () {
        this.$router.push({
          path: '/pages/search/main',
          query: {
            hotSearch: this.hotSearch
          }
        })
      },
      onBannerClick () {
        console.log('点击了Banner')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
