import EventEmitter from "./event-emitter";

let baseURL = 'https://think.naturez.cn/api';

try {
    let res = wx.getSystemInfoSync();
    if (res.platform === 'devtools') {
        baseURL = 'http://127.0.0.1:8810/api';
    }
} catch (e) {
    // Do something when catch error
}

module.exports.api = {
    passport: `${baseURL}/passport/wx/`,
    login: `${baseURL}/passport/wx/login/`,
    join: `${baseURL}/passport/wx/join/`,
    cancel: `${baseURL}/passport/wx/cancel/`,
    info: `${baseURL}/passport/wx/info/`,
    think: `${baseURL}/think/`,
    earth: `${baseURL}/think/earth/`
};

module.exports.emitter = new EventEmitter();

module.exports.gData = {
    userSid: null,
    userInfo: null
};