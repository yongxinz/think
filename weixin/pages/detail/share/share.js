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
        that.setData({options: options});
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,
                    offset: (res.windowWidth - 304) / 2
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
            that.setData({footer: res.data.results[0].created_display + ' ' + res.data.results[0].city});

            let i = 0;
            let lineNum = 1;
            let thinkStr = '';
            let thinkList = [];
            for (let item of res.data.results[0].think) {
                if (item === '\n') {
                    thinkList.push(thinkStr);
                    thinkList.push('a');
                    i = 0;
                    thinkStr = '';
                    lineNum += 1;
                } else if (i === 19) {
                    thinkList.push(thinkStr);
                    i = 1;
                    thinkStr = item;
                    lineNum += 1;
                } else {
                    thinkStr += item;
                    i += 1;
                }
            }
            thinkList.push(thinkStr);
            that.setData({thinkList: thinkList});
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
        let that = this;
        let ctx = wx.createCanvasContext('myCanvas');
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
        ctx.drawImage('../../../static/image/think.png', that.data.windowWidth - that.data.offset - 50, lineNum * that.data.lineHeight + 125, 50, 50)
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
        });
    }
});