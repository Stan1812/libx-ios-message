var Message = {};
var showMessage = false, // 存储toast显示状态
    showLoad = false, // 存储loading显示状态
    messageVM = null // 存储toast vm

Message.install = function (Vue, options) {

    var opt = {
        duration: '2500'
    };
    for (var property in options) {
        opt[property] = options[property];
    }

    Vue.prototype.$message = function (tips) {

        // var curType = type ? type : opt.defaultType; var wordWrap = opt.wordWrap ?
        // 'lx-word-wrap' : ''; var style = opt.width     ? 'style="width: ' + opt.width
        // + '"'     : '';
        var tmp = `
        <div v-show="show" id="messageBox">
          <div id="mesContent"> 
            <div id="alertMsg">{{tip}}</div> 
            <div id="confirm" @click="hideMsg">>确定</div>
          </div>
        </div>
        `
        if (showMessage) {
            return;
        }
        if (!messageVM) {
            var messageTpl = Vue.extend({
                data: function () {
                    return {show: showMessage, tip: tips}
                },
                template: tmp
            });
            messageVM = new messageTpl()
            var tpl = messageVM
                .$mount()
                .$el;
            document
                .body
                .appendChild(tpl);
        }
        messageVM.tip = tips;
        messageVM.show = showMessage = true;

        setTimeout(function () {
            messageVM.show = showMessage = false;
        }, opt.duration)
    }
}
module.exports = Message;