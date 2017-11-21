import util from '../../../utils/util'

const app = getApp();

Page({
    data: {
        windowWidth: 0,
        windowHeight: 0,
        contentHeight: 0,
        thinkList: [],
        footer: '',
        offset: 0,
        lineHeight: 30
    },

    onLoad: function (options) {
        let that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,
                    offset: (res.windowWidth - 300) / 2
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
        app.helper.getApi(app.config.api.earth).then(function (res) {
            that.setData({ footer: res.data.now});

            let lineNum = 3;
            let thinkList = [];
            thinkList.push(res.data.year + ' 年，我，');
            thinkList.push('记录了 ' + res.data.think_count + ' 条想法，');
            thinkList.push('去过 ' + res.data.nation_count + ' 个国家，走过 ' + res.data.city_count + ' 个城市。');
            that.setData({ thinkList: thinkList });
            that.createNewImg(lineNum);
        }).then(function () {
            wx.hideLoading()
        });
    },

    drawSquare: function (ctx, height) {
        ctx.setFontSize(24);
        ctx.rect(0, 50, this.data.windowWidth, height);
        ctx.setFillStyle("#f5f6fd");
        ctx.fill()
    },

    drawFont: function (ctx, content, height) {
        ctx.setFontSize(16);
        ctx.setFillStyle("#484a3d");
        ctx.fillText(content, this.data.offset, height);
    },

    drawLine: function (ctx, height) {
        ctx.beginPath();
        ctx.moveTo(this.data.offset, height);
        ctx.lineTo(this.data.windowWidth - this.data.offset, height);
        ctx.stroke('#eee');
        ctx.closePath();
    },

    createNewImg: function (lineNum) {
        var that = this;
        var ctx = wx.createCanvasContext('myCanvas');
        let contentHeight = lineNum * that.data.lineHeight + 180;
        that.drawSquare(ctx, contentHeight);
        that.setData({contentHeight: contentHeight});
        let height = 100;
        for (let item of that.data.thinkList) {
            if (item !== 'a') {
                that.drawFont(ctx, item, height);
                height += that.data.lineHeight;
            }
        }
        that.drawLine(ctx, lineNum * that.data.lineHeight + 120);
        that.drawFont(ctx, that.data.footer, lineNum * that.data.lineHeight + 156);
        ctx.drawImage('../../../static/image/think.png', that.data.windowWidth - that.data.offset - 50, lineNum * that.data.lineHeight + 125, 50, 50);
        ctx.draw();
    },

    savePic: function () {
        let that = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 50,
            width: that.data.windowWidth,
            height: that.data.contentHeight,
            canvasId: 'myCanvas',
            success: function (res) {
                util.savePicToAlbum(res.tempFilePath)
            }
        })
    }
});