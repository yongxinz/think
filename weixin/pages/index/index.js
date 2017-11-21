const app = getApp();

Page({
    data: {
        options: {
            page: 1
        }
    },

    onLoad: function (options) {
        // app.helper.waitUserSid(this.getApiData)
    },

    onShow: function () {
        app.helper.waitUserSid(this.getApiData)
    },

    getApiData: function () {
        let that = this;
        that.setData({
            'options.page': 1
        });

        wx.showLoading({ title: '加载中...' });
        app.helper.getApi(app.config.api.think, that.data.options).then(function (res) {
            that.setData({ apiData: res.data });
        }).then(function () {
            wx.hideLoading()
        });
    },

    onReachBottom: function () {
        let that = this;
        if (that.data.apiData.next !== null) {
            let next_page = that.data.options.page + 1;
            that.setData({
                'options.page': next_page
            });

            wx.showLoading({title: '加载中...'});
            app.helper.getApi(app.config.api.think, that.data.options).then(function (res) {
                for (let i = 0; i < res.data.results.length; i++) {
                    that.data.apiData.results.push(res.data.results[i])
                }
                that.setData({apiData: that.data.apiData, 'apiData.next': res.data.next});
            }).then(function () {
                wx.hideLoading()
            });
        }
    },

    thinkAdd: function () {
        wx.navigateTo({url: '../edit/edit'})
    },

    thinkDetail: function (event) {
        let ds = event.currentTarget.dataset;
        wx.navigateTo({ url: '../detail/detail?id=' + ds.id })
    },

    earthSave: function () {
        wx.navigateTo({ url: './earth/earth' })
    },

    onShareAppMessage: function () {
        return {
            title: '记录位置，记录想法，记录生活。',
            path: '/pages/index/index'
        }
    }
});
