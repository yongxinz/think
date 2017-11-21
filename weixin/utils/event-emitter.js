;
(function(exports) {

    function EventEmitter() {
        this.pool = {};
    }

    EventEmitter.prototype = {
        add: function(e, listener, bool) {
            listener.once = bool;
            this.pool[e] = this.pool[e] || [];
            this.pool[e].push(listener);
        },
        on: function(e, listener) {
            this.add(e, listener, false);
        },
        once: function(e, listener) {
            this.add(e, listener, true);
        },
        emit: function(e) {
            let _this = this;
            if (this.pool[e]) {
                this.pool[e].forEach(function(listener) {
                    listener();
                    if (listener.once) {
                        _this.off(e, listener);
                    }
                });
            }
        },
        off: function(e, listener) {
            let index = this.pool[e].indexOf(listener);
            if (index > -1) {
                this.pool[e].splice(index, 1);
            }
        },
        destory: function(e) {
            delete this.pool[e];
        }
    };

    /**
     * 模块导出：AMD、CommonJS、Global
     */
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return EventEmitter;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = EventEmitter;
    } else {
        exports.EventEmitter = EventEmitter;
    }
})(this || {});