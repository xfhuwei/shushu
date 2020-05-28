<template>
    <div class="search">
      <searchBar
        :hot-search="hotSearchKeyWord"
        :focus="searchFocus"
        @onChange="onChange"
        @onClear="onClear"
        @onConfirm="onConfirm"
        ref="searchBar"
      ></searchBar>
      <TagGroup
        :value="historySearch"
        header-text="历史搜索"
        btn-text="清空"
        @onTagClick="searchKeyWord"
        @onBtnClick="clearHistorySearch"
        v-if="historySearch.length > 0 && !showList"
      ></TagGroup>
      <TagGroup
        :value="hotSearchArray"
        header-text="热门搜索"
        btn-text="换一批"
        @onTagClick="searchKeyWord"
        @onBtnClick="changeHotSearch"
        v-if="hotSearchArray.length > 0 && !showList"
      ></TagGroup>
      <searchList
        :data="searchList"
        v-if="showList"
      ></searchList>
    </div>
</template>

<script>
  import TagGroup from '../../components/base/TagGroup'
  import SearchList from '../../components/search/SearchList'
  import SearchBar from '../../components/home/SearchBar'
  import {getStorageSync, setStorageSync, showToast} from '../../api/wechat'
  import {search, hotSearch} from '../../api/index'

  export default {
    components: {SearchBar, SearchList, TagGroup},
    computed: {
      showList () {
        const keys = Object.keys(this.searchList)
        return keys.length > 0
      },
      hotSearchArray () {
        const _hotSearch = []
        this.hotSearch.forEach(item => {
          _hotSearch.push(item.title)
        })
        return _hotSearch
      }
    },
    data () {
      return {
        hotSearch: [],
        hotSearchKeyWord: '',
        historySearch: [],
        searchList: {},
        searchFocus: true,
        openId: '',
        page: '1'
      }
    },
    methods: {
      onConfirm (keyword) {
        if (!keyword || keyword.trim().length === 0) {
          keyword = this.hotSearchKeyWord
        } else {
          this.$refs.searchBar.setValue(keyword)
        }
        this.onSearch(keyword)
        if (!this.historySearch.includes(keyword)) {
          this.historySearch.push(keyword)
          setStorageSync('historySearch', this.historySearch)
        }
        // console.log(111)
        this.searchFocus = false
      },
      onClear () {
        this.searchList = {}
      },
      onChange (keyword) {
        this.searchFocus = true
        if (!keyword || keyword.trim().length === 0) {
          this.searchList = {}
          return
        }
        this.page = 1
        this.onSearch(keyword)
      },
      onSearch (keyword) {
        search({
          keyword,
          openId: this.openId,
          page: this.page
        }).then(res => {
          this.searchList = res.data.data
        })
      },
      showBookDetail (text, index) {
        console.log('click tag')
        console.log(text)
        console.log(index)
      },
      changeHotSearch () {
        hotSearch().then(res => {
          this.hotSearch = res.data.data
        })
      },
      searchKeyWord (text, index) {
        this.$refs.searchBar.setValue(text)
        this.onSearch(text)
      },
      clearHistorySearch () {
        this.historySearch = []
        setStorageSync('historySearch', [])
      }
    },
    mounted () {
      this.page = 1
      this.openId = getStorageSync()
      hotSearch().then(res => {
        this.hotSearch = res.data.data
      })
      this.hotSearchKeyWord = this.$route.query.hotSearch
      this.historySearch = getStorageSync('historySearch') || []
    },
    onPageScroll () {
      if (this.searchFocus) {
        this.searchFocus = false
      }
    },
    onReachBottom () {
      if (this.showList) {
        this.page++
        const searchWord = this.$refs.searchBar.getValue()
        search({
          keyword: searchWord,
          openId: this.openId,
          page: this.page
        }).then(res => {
          const { book } = res.data.data
          if (book && book.length > 0) {
            this.searchList.book.push(...book)
          } else {
            showToast('没有更多数据了')
          }
        })
      }
    }
  }
</script>
