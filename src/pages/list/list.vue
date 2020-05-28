<template>
  <div class="list">
    <search-table
      :data="data"
    ></search-table>
  </div>
</template>

<script>
  import { CATEGORY } from '@/utils/const'
  import {searchList} from '../../api/index'
  import {setNavigationBarTitle, showToast} from '../../api/wechat'
  import SearchTable from '../../components/search/SearchTable'
  export default {
    components: {SearchTable},
    data () {
      return {
        data: [],
        page: 1
      }
    },
    methods: {
      getSearchList () {
        const { key, text } = this.$route.query
        const params = {
          page: this.page
        }
        if (key && text) {
          params[key] = text
        }
        searchList(params).then((res) => {
          const book = res.data.data
          if (book && book.length > 0) {
            this.data.push(...book)
          } else {
            showToast('没有更多数据了')
          }
        })
      }
    },
    mounted () {
      this.page = 1
      this.getSearchList()
      let { title } = this.$route.query
      title = CATEGORY[title.toLowerCase()] || title
      setNavigationBarTitle(title)
    },
    onReachBottom () {
      this.page++
      this.getSearchList()
    }
  }
</script>
