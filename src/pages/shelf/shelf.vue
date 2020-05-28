<template>
  <div class="shelf">
    <ShlefUserInfo
      :num="shelfList.length"
      :read-day="day"
      :user-info="userInfo"
    ></ShlefUserInfo>
    <ShlefList
      :shelf-list="shelfList"
    ></ShlefList>
  </div>
</template>

<script>
  import ShlefUserInfo from '../../components/shelf/ShlefUserInfo'
  import {getStorageSync} from '../../api/wechat'
  import {bookShelf, userDay} from '../../api'
  import ShlefList from '../../components/shelf/ShlefList'
  export default {
    components: {ShlefList, ShlefUserInfo},
    data () {
      return {
        userInfo: {},
        day: 0,
        shelfList: []
      }
    },
    onShow () { // mounted只调用一次，onshow是出现一次页面就调用一次
      this.userInfo = getStorageSync('userInfo')
      const openId = getStorageSync('openid')
      userDay({openId}).then((res) => {
        this.day = res.data.data.day
      })
      bookShelf({openId}).then(res => {
        this.shelfList = res.data.data
        this.shelfList.push({})
      })
    }
  }
</script>
