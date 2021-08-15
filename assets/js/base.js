// 每个ajax、get、post发送的ajax请求，都会先经过ajaxPrefilter

$.ajaxPrefilter(function(options) {
    // Modify options, control originalOptions, store jqXHR, etc 
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;

    //统一为有权限的接口设置headers
    // url里找到了 / my /
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            //获取不到token的话默认传空
            Authorization: localStorage.getItem('token') || ''
        }

    }

    //统一进行身份验证的回调
    options.complete = function(res) {

        console.log(res);
        if (res.responseJSON.status === 1 &&
            res.responseJSON.message === "身份认证失败！") {
            // 登录失败

            localStorage.removeItem("token");
            location.href = "/login.html";
        }

    }


});