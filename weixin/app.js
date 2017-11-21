import helperB from "./utils/helper_business";
import config from "./utils/config";

App({
    helper: helperB,
    config: config,

    onLaunch: function () {
        // 微信登录，获取用户code
        helperB.wxPromisify(wx.login)().then(function (res) {
            // 登录后端, wx code -> dj sid
            helperB.getApi(config.api.login, { code: res.code }).then(function (res) {
                config.gData.userSid = res.data.sid;
                config.emitter.emit('userSid');
            });
        }).catch(function (res) {
            console.error(res.errMsg)
        });
    }
    // globalData: {
    //     userInfo: null
    // }
});
