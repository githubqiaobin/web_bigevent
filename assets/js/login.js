//入口函数，页面加载完成后调用
$(function() {




    // 点击注册链接，隐藏登录窗口，显示注册窗口
    $("#link_reg").on("click", function() {
            $(".login-box").hide();
            $(".reg-box").show();
        })
        // 点击登录链接，隐藏注册窗口，显示登录窗口
    $("#link_login").on("click", function() {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    //layUI添加自定义校验规则

    var form = layui.form;
    var layer = layui.layer;
    // 使用了两种自定义规则的办法
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //增加密码确认规则，保证两次密码输入一致
        repass: function(value) {
            //获取密码框和确认密码框的值，校验，不一致返回密码校验
            // 不一致
            var pwd = $(".reg-box .layui-input[name=password]").val();
            console.log(pwd);
            if (pwd !== value) {
                return "两次输入密码不一致";
            }
        }

    })



    // 监听注册事件的表单提交
    $("#form_reg").on("submit", function(e) {


        //阻止表单默认提交行为，因为默认提交行为刷新整个页面
        e.preventDefault();

        //根据接口文档发起post请求
        var username = $(".reg-box [name=username]").val();
        var password = $(".reg-box [name=password]").val();
        var data = {
            "username": username,
            "password": password
        };
        $.post("/api/reguser", data, function(res) {
            //TODO 处理返回结果
            console.log(res);
            if (res.status !== 0) {
                //注册失败

                return layer.msg(res.message);
            }
            layer.msg("注册成功");

            //注册成功默认跳转登录 页面
            $("#link_login").click();
        })
    })



    // 监听登录事件的表单提交
    $("#form_login").submit(function(e) {
        e.preventDefault();
        //使用ajax请求
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                /*                 localStorage 和 sessionStorage 属性允许在浏览器中存储 key/value 对的数据。

                localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。

                localStorage 属性是只读的。 */
                localStorage.setItem("token", res.token);


                //跳转到index页面
                location.href = "/index.html";
            }
        })
    })
})