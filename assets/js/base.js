// 每个ajax、get、post发送的ajax请求，都会先经过ajaxPrefilter

$.ajaxPrefilter(function(options) {
    // Modify options, control originalOptions, store jqXHR, etc 
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
});