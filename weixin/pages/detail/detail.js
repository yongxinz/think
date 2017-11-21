const app = getApp();

Page({
    data: {
        windowWidth: 0,
        windowHeight: 0
    },

    onLoad: function (options) {
        let that = this;
        that.setData({ options: options });
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight
                });
            }
        });
    },

    onShow: function () {
        app.helper.waitUserSid(this.getApiData)
    },

    getApiData: function () {
        let that = this;

        wx.showLoading({ title: '加载中...' });
        app.helper.getApi(app.config.api.think, that.data.options).then(function (res) {
            that.setData({ id: res.data.results[0].id, think: res.data.results[0].think, address: res.data.results[0].address, created: res.data.results[0].created_display });
        }).then(function () {
            wx.hideLoading()
        });
    },

    thinkEdit: function(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({ url: '../edit/edit?id=' + id })
    },

    thinkPic: function (e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({ url: './share/share?id=' + id })
    }
});