$(function() {
    getUserInfo();

    //给退出按钮绑定函数
    $("#btnLogout").on('click', function() {
        /*         var isLogout = confirm("请确认是否退出");
                console.log(isLogout);
                if (isLogout) {
                    //如果选择的的为是，跳转到登录页面，且清除
                    // localStorage
                    location.href = "/login.html";
                    localStorage.removeItem("token");
                } */

        layer.confirm('确认退出?', { icon: 6, title: '提示' }, function(index) {
            //do something
            location.href = "/login.html";
            localStorage.removeItem("token");
            layer.close(index);
        });

    })
})


// 定义获取用户信息方法
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     //获取不到token的话默认传空
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {

            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //返回成功的话 ，调用用户头像渲染函数
            console.log(res.data);
            renderAvatar(res.data);

        }
    })


}

// 头像渲染函数
function renderAvatar(User) {
    //如果nickname存在则以nickname为主
    var name = User.nickname || User.username;

    //调整欢迎动态展示
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);

    //判断是渲染文字头像还是图片头像
    if (User.user_pic !== null) {
        //图片头像
        //文字头像隐藏，图片头像展示
        $(".text-avatar").hide();
        $(".layui-nav-img").attr("src", User.user_pic).show();
    } else {
        //文字头像展示，图片头像隐藏
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
        $(".layui-nav-img").hide();
    }
}