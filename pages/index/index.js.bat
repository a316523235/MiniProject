//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    source: { content: "请先复制淘口令" },
    sourceContent: '',
    task: null,
    couponInfo: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //console.log("index.js触发")
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //this.getTbk();
    //var that = this;
    //if(!this.data.task) {
      //console.log(this.data.task)
      //this.setData({ task: setInterval(function () { that.getTbk(); }, 1500) })
    //}
  },
  onShow: function() {
    //console.log('触发')
    this.getTbk()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getTbk: function() {
    //if (!this.data.source.content) {
    if (true) {
      var that = this;
      wx.getClipboardData({
        success: function (res) {
          var sourceData = res.data
          //if(!sourceData) {
          //  return;
          //}
          if (that.data.sourceContent == sourceData)
          {
            return;
          }
          that.setData({ sourceContent: sourceData});

          var checkResult = that.isFromTaobaoContent(sourceData)
          //console.log(checkResult);
          if (!checkResult.status) {
            if (checkResult.msg) {
              that.setData({
                source: { content: checkResult.msg },
                couponInfo: ''
              })
            }
            return;
          }

          //wx.setClipboardData({ data: '' });

          //console.log("进来了")
          wx.request({
            url: 'https://www.booyu.cn/api/tkl',
            data: { content: sourceData },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
              if(res.data.status) {
                that.setData({ couponInfo: res.data.content});
              }
              //console.log(res.data)
              that.setData({
                source: { content: res.data.content || res.data.msg }
              })
            }
          })

          //that.setData({
          //  source: { content: res.data}
          //})
        }
      })
    }
  },
  isFromTaobaoContent: function(content) {
    var result = { status: false, msg: "" }
    if(!content) {
      //result.msg = '请先复制淘口令'
      return result
    }
    if (!content.includes('￥')) {
      result.msg = '请先复制淘口令'
      return result
    }
    if (content.split('￥').length < 3) {
      result.msg = '请先复制淘口令'
      return result
    }
    if(content.includes('【现售价】')) {
      return false
    }
    result.status = true
    return result
  },
  copyCouponInfo: function() {
    //console.log('copy');
    var that = this;
    wx.setClipboardData({ data: that.data.couponInfo });
  }
})
