let config = require('./config');

function wxPromisify(fn) {
    return function (obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function (res) {
                resolve(res)
            };

            obj.fail = function (res) {
                reject(res)
            };

            fn(obj)
        })
    }
}

function waitSomething(fn, st) {
    if (config.gData[st] !== null) {
        fn();
    } else {
        config.emitter.on(st, fn);
    }
}


function requestApi(api_url, data, uri = '', method = 'GET') {
    return new Promise((resolve, reject) => {
        wx.request({
            url: api_url + uri,
            header: {'Authorization': config.gData.userSid},
            data: data,
            method: method,
            success: function (res) {
                // if (res.statusCode === 403 && uri !== '?is_login') {
                if (res.statusCode === 403) {
                    wx.redirectTo({url: '/pages/login/index'})
                } else {
                    resolve(res)
                }
            },
            fail: function (res) {
                reject(res)
            }
        })
    })
}


module.exports.waitUserSid = function (fn) {
    return waitSomething(fn, 'userSid')
};


module.exports.waitUserInfo = function (fn) {
    return waitSomething(fn, 'userInfo')
};


module.exports.getApi = function (api_name, data, uri = '') {
    return requestApi(api_name, data, uri, 'GET')
};


module.exports.postApi = function (api_name, data, uri = '') {
    return requestApi(api_name, data, uri, 'POST')
};

module.exports.putApi = function (api_name, data, uri = '') {
    return requestApi(api_name, data, uri, 'PUT')
};

module.exports.delApi = function (api_name, data, uri = '') {
    return requestApi(api_name, data, uri, 'DELETE')
};

module.exports.wxPromisify = wxPromisify;