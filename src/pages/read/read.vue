<template>
  <div>
    <web-view :src="url" @load="loadend"></web-view>
  </div>
</template>

<script>
  import {setNavigationBarTitle} from '../../api/wechat'
  export default {
    data () {
      return {
        url: '',
        title: ''
      }
    },
    methods: {
      // loadend () {
      //   setNavigationBarTitle(this.title)
      //   setTimeout(() => {
      //     setNavigationBarTitle('222')
      //     console.log(111)
      //   }, 2000)
      // }
    },
    onShow () {
      const {query} = this.$route
      let _url = 'http://www.youbaobao.xyz/book/#/ebook'
      if (query.fileName) {
        // this.title = query.fileName
        _url = `${_url}/${query.fileName}`
        if (query.opf) {
          _url = `${_url}?opf=${query.opf}`
        }
        if (query.navigation && query.opf) {
          _url = `${_url}&navigation=${query.navigation}`
        } else if (query.navigation) {
          _url = `${_url}?navigation=${query.navigation}`
        }
        this.url = _url
      }
      setNavigationBarTitle(this.title)
    }
  }
</script>
