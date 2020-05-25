import { getOpenId } from '@/api/index'

export function getSetting (auth, onSuccess, onFail) {
  mpvue.getSetting({
    success (res) {
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      const { userInfo } = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

export function setStorageSync (key, data) {
  mpvue.setStorageSync(key, data)
}

export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}

export function getUserOpenId (callback) {
  mpvue.login({
    success (res) {
      if (res.code) {
        getOpenId(res.code).then(response => {
          const openid = response.data.data.openid
          setStorageSync('openid', openid)
          callback && callback(openid)
        }).catch(err => {
          console.log(err)
        })
      } else {
        console.log(res)
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

export function showLoading (title) {
  mpvue.showLoading({
    title,
    mask: true
  })
}

export function hideLoading (title) {
  mpvue.hideLoading()
}
