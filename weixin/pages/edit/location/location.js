var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var WxNotificationCenter = require('../../../utils/WxNotificationCenter.js');
var qqmapsdk;

Page({
    onLoad: function (options) {
        let that = this;
        qqmapsdk = new QQMapWX({
            key: 'ZRSBZ-BKL3O-L66WI-SLPTW-NSX4Z-44FZE'
        });
        that.reloadCurrent();
    },

    keywordTyping: function (e) {
        var keyword = e.detail.value;
        // 向腾讯地图接口发送请求
        qqmapsdk.getSuggestion({
            keyword: keyword,
            region: that.data.city,
            success: function (res) {
                that.setData({
                    result: res.data
                });
            },
            fail: function (res) {
                console.log(res);
            },
            complete: function (res) {
                console.log(res);
            }
        });
    },

    addressTapped: function (e) {
        let that = this;
        let title = e.currentTarget.dataset.title;

        WxNotificationCenter.postNotificationName("addressSelectedNotification", title);
        WxNotificationCenter.postNotificationName("nationSelectedNotification", that.data.nation);
        WxNotificationCenter.postNotificationName("provinceSelectedNotification", that.data.province);
        WxNotificationCenter.postNotificationName("citySelectedNotification", that.data.city);
        wx.navigateBack();

    },

    geoTapped: function () {
        let that = this;
        WxNotificationCenter.postNotificationName("addressSelectedNotification", that.data.city);
        WxNotificationCenter.postNotificationName("nationSelectedNotification", that.data.nation);
        WxNotificationCenter.postNotificationName("provinceSelectedNotification", that.data.province);
        WxNotificationCenter.postNotificationName("citySelectedNotification", that.data.city);
        wx.navigateBack();

    },

    reloadCurrent: function () {
        let that = this;
        // that.setData({
        //     address: '正在定位中...',
        // });
        // 调用接口
        qqmapsdk.reverseGeocoder({
            poi_options: 'policy=2',
            get_poi: 1,
            success: function (res) {
                that.setData({
                    address: res.result.formatted_addresses.recommend,
                    rough: res.result.formatted_addresses.rough,
                    result: res.result.pois,
                    nation: res.result.address_component.nation,
                    province: res.result.address_component.province,
                    city: res.result.address_component.city
                });
            },
            fail: function (res) {
                //         console.log(res);
            },
            complete: function (res) {
                //         console.log(res);
            }
        });
    }
});