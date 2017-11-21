var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
const app = getApp();

Page({
    data: {
        windowWidth: 0,
        windowHeight: 0,
        address: '地点',
        nation: '',
        province: '',
        city: '',
        think: '',
        options: {
            id: ''
        }
    },

    onLoad: function (options) {
        let that = this;
        that.setData({ options: options });
        if (that.data.options.id) {
            app.helper.waitUserSid(that.getApiData)
        }

        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight
                });
            }
        });

        // 注册通知
        WxNotificationCenter.addNotification("addressSelectedNotification", that.getAddress, that);
        WxNotificationCenter.addNotification("nationSelectedNotification", that.getNation, that);
        WxNotificationCenter.addNotification("provinceSelectedNotification", that.getProvince, that);
        WxNotificationCenter.addNotification("citySelectedNotification", that.getCity, that);
    },

    onShow: function () {
        // let that = this;
    },

    getApiData: function () {
        let that = this;
        // wx.showLoading({ title: '加载中...' });
        app.helper.getApi(app.config.api.think, that.data.options).then(function (res) {
            that.setData({ id: res.data.results[0].id, think: res.data.results[0].think, address: res.data.results[0].address, created: res.data.results[0].created_display });
            if (res.data.results[0].address === '') {
                that.setData({address: '地点'})
            }
        }).then(function () {
            wx.hideLoading()
        });
    },
    
    keywordTyping: function (e) {
        this.setData({
            think: e.detail.value
        });
    },

    getAddress: function (address) {
        this.setData({
            address: address
        });
    },

    getNation: function (nation) {
        this.setData({
            nation: nation
        });
    },

    getProvince: function (province) {
        this.setData({
            province: province
        });
    },

    getCity: function (city) {
        this.setData({
            city: city
        });
    },

    thinkDone: function () {
        let that = this;

        if (that.data.think !== '') {
            if (that.data.address === '地点') {
                that.setData({address: ''})
            }

            if (that.data.options.id) {
                app.helper.putApi(app.config.api.think, that.data, that.data.options.id + '/').then(function (res) {
                    let pages = getCurrentPages();
                    let backPage = pages[pages.length - 3];
                    let results = [];
                    for (let item of backPage.data.apiData.results) {
                        if (item['id'] === parseInt(that.data.options.id)) {
                            item['think'] = that.data.think;
                            item['nation'] = that.data.nation;
                            item['province'] = that.data.province;
                            item['city'] = that.data.city;
                            item['address'] = that.data.address;
                        }
                        results.push(item)
                    }
                    backPage.setData({ 'apiData.results': results })
                    wx.navigateBack();
                });
            } else {
                app.helper.postApi(app.config.api.think, that.data).then(function (res) {
                    let pages = getCurrentPages();
                    let backPage = pages[pages.length - 2];
                    app.helper.getApi(app.config.api.think).then(function (res) {
                        backPage.setData({ apiData: res.data });
                    });
                    wx.navigateBack();
                });
            }
        } else {
            wx.showToast({title: '嘿，写想法！', icon: 'fail', duration: 1000})
        }
    },

    selectLocation: function () {
        wx.navigateTo({ url: './location/location' })
    }
});