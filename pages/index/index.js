//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    source: { content: "" },
    sourceContent: '',
    task: null,
    couponInfo: '',
    products: {}
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
    this.getProducts()
    //console.log(this.data.products.result);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getProducts: function() {
    var items = {
      "data": {
        "api_type": "领券优惠v1.4",
        "update_time": "2018/08/22 15:30:05",
        "total_num": 100,
        "update_content": "全站接口已升级为分页模式，每页200条数据，分页参数：&page"
      },
      "result": [
        {
          "ID": "16046926",
          "GoodsID": "574599859862",
          "Title": "稻香村月饼尝鲜装蛋黄莲蓉豆沙广式月饼糕点心中秋节礼品北京特产",
          "D_title": "【稻香村】广式月饼糕点9饼8味",
          "Pic": "https://img.alicdn.com/imgextra/i1/2935830269/TB2FOkSppooBKNjSZFPXXXa2XXa_!!2935830269.jpg",
          "Cid": "6",
          "Org_Price": "23.90",
          "Price": 13.9,
          "IsTmall": "1",
          "Sales_num": "165318",
          "Dsr": "4.8",
          "SellerID": "2935830269",
          "Commission": "30.00",
          "Commission_jihua": "30.00",
          "Commission_queqiao": "0.00",
          "Jihua_link": null,
          "Que_siteid": "0",
          "Jihua_shenhe": "0",
          "Introduce": "【百年老字号】【九饼八味！只需13.9元！一枚月饼不到1.5元】这是稻香村月饼！！大品牌！首批福利、后续会阶梯涨价。中秋月饼就选“稻香村”广式老风味，传承百年纯手工制作，既是美食也是工艺。",
          "Quan_id": "366b24353e194d3c800d4e42d1a62b59",
          "Quan_price": "10.00",
          "Quan_time": "2018-08-22 23:59:59",
          "Quan_surplus": "284000",
          "Quan_receive": "116000",
          "Quan_condition": "11",
          "Quan_m_link": null,
          "Yongjin_type": "3",
          "Quan_link": "https://uland.taobao.com/quan/detail?sellerId=2935830269&activityId=366b24353e194d3c800d4e42d1a62b59"
        },
        {
          "ID": "16035201",
          "GoodsID": "567529640176",
          "Title": "香薰精油熏香家用室内房间香水卧室空气清新剂厕所除臭持久留香",
          "D_title": "【eyun aroma】法国无火香薰精油",
          "Pic": "https://img.alicdn.com/imgextra/i2/3012913363/TB2.bs5j0fJ8KJjy0FeXXXKEXXa_!!3012913363.jpg",
          "Cid": "4",
          "Org_Price": "35.90",
          "Price": 5.9,
          "IsTmall": "1",
          "Sales_num": "26859",
          "Dsr": "4.8",
          "SellerID": "1102315914",
          "Commission": "40.00",
          "Commission_jihua": "40.00",
          "Commission_queqiao": "0.00",
          "Jihua_link": "",
          "Que_siteid": "0",
          "Jihua_shenhe": "0",
          "Introduce": "【4.9超高评分】选用法国精选香料调配，多款香型任君选择。搭配藤条手工干花装饰，磨砂质感香薰瓶，精致素雅，装点家居，尽显品位。这个价钱抢到就是赚到哦！用过的都说好！！！",
          "Quan_id": "1bbbab3d7d3545ccbc0f3ae46afd4bb4",
          "Quan_price": "30.00",
          "Quan_time": "2018-08-26 23:59:59",
          "Quan_surplus": "52000",
          "Quan_receive": "48000",
          "Quan_condition": "35",
          "Quan_m_link": null,
          "Yongjin_type": "3",
          "Quan_link": "https://uland.taobao.com/quan/detail?sellerId=1102315914&activityId=1bbbab3d7d3545ccbc0f3ae46afd4bb4"
        }
      ]
    };

    this.setData({ products: items });

    // var that = this;
    // wx.request({
    //   url: 'http://api.dataoke.com/index.php?r=Port/index&type=paoliang&appkey=d48df20312&v=2',
    //   method: 'get',
    //   dataType: 'json',
    //   success: function (res) {
    //     if (res.data) {
    //       that.setData({ products: res.data });
    //     }
    //     console.log(res.data)
    //   }
    // })
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
              console.log("进来了")
              if(res.data.status) {
                that.setData({ couponInfo: res.data.content});
              }
              console.log(res.data)
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
    console.log("result " + content + " is this")
    if(!content) {
      //result.msg = '请先复制淘口令'
      return result
    }
    if (!content.includes('淘')) {
      //result.msg = '请先复制淘口令'
      return result
    }
    // if (content.split('￥').length < 3) {
    //   result.msg = '请先复制淘口令'
    //   return result
    // }
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
