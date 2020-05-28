<template>
  <div>
    <DetailBottom
      :isInShelf="isInShelf"
      @handleShelf="handleShelf"
      @readBook="readBook"
    ></DetailBottom>

    <DetailBook
      :book="data"
    ></DetailBook>

    <DetailStat
      :readers="data.readers"
      :readerNum="data.readerNum"
      :rankNum="data.rankNum"
      :rankAvg="data.rankAvg"
    ></DetailStat>

    <DetailRate
      :rateValue="data.rankAvg"
      @onRateChange="onRateChange"
    ></DetailRate>

    <DetailContents
      :contents="contentsData"
      @readBook="readBook"
    ></DetailContents>

  </div>
</template>

<script>
  import DetailBook from '../../components/detail/DetailBook'
  import DetailStat from '../../components/detail/DetailStat'
  import DetailRate from '../../components/detail/DetailRate'
  import DetailBottom from '../../components/detail/DetailBottom'
  import DetailContents from '../../components/detail/DetailContents'
  import {
    bookDetail,
    bookRankSave,
    bookContents,
    bookShelf,
    bookShelfSave,
    bookShelfRemove
  } from '../../api/index'
  import { getStorageSync } from '../../api/wechat'
  export default {
    components: {
      DetailBottom,
      DetailContents,
      DetailRate,
      DetailStat,
      DetailBook
    },
    data () {
      return {
        data: {},
        contentsData: [],
        isInShelf: false
      }
    },
    methods: {
      onRateChange (value) {
        const openId = getStorageSync('openid')
        const { fileName } = this.$route.query
        bookRankSave({
          openId, fileName, rank: value
        }).then(res => {
          this.getBookDetail()
        })
      },
      getBookDetail () {
        const openId = getStorageSync('openid')
        const { fileName } = this.$route.query
        if (openId && fileName) {
          bookDetail({openId, fileName}).then(res => {
            this.data = res.data.data
          })
        }
      },
      getBookContents () {
        const { fileName } = this.$route.query
        if (fileName) {
          bookContents({ fileName }).then(res => {
            this.contentsData = res.data.data
          })
        }
      },
      readBook (href) {
        const query = {
          fileName: this.data.fileName,
          opf: this.data.opf
        }
        if (href) {
          const index = href.indexOf('/')
          if (index >= 0) {
            query.navigation = href.slice(index + 1)
          } else {
            query.navigation = href
          }
        }
        if (this.data && this.data.fileName) {
          console.log(this.data)
          this.$router.push({
            path: '/pages/read/main',
            query
          })
        }
      },
      handleShelf () {
        const openId = getStorageSync('openid')
        const { fileName } = this.$route.query
        if (!this.isInShelf) {
          if (openId && fileName) {
            bookShelfSave({openId, fileName}).then(res => {
              this.getbookIsInShelf()
            })
          }
        } else {
          const _this = this
          mpvue.showModal({
            title: '提示',
            content: `是否确认将《${this.data.title}》移出书架？`,
            success (res) {
              if (res.confirm) {
                if (openId && fileName) {
                  bookShelfRemove({openId, fileName}).then(res => {
                    _this.getbookIsInShelf()
                  })
                }
              }
            }
          })
        }
      },
      getbookIsInShelf () {
        const openId = getStorageSync('openid')
        const { fileName } = this.$route.query
        if (openId && fileName) {
          bookShelf({openId, fileName}).then(res => {
            const data = res.data.data
            data.length === 0 ? this.isInShelf = false : this.isInShelf = true
          })
        }
      }
    },
    mounted () {
      this.getBookDetail()
      this.getBookContents()
      this.getbookIsInShelf()
    }
  }
</script>

<style lang="scss" scoped></style>
