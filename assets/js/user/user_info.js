$(function() {

    // layui表单校验规则设置
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: [
            /^[\S]{2,12}$/, '昵称必须6到12位，且不能出现空格'
        ]
    });

    initUserInfo();

    //定义初始化获取信息
    function initUserInfo() {
        var layer = layui.layer;
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    //非正常返回
                    return layer(res.message);
                }

                // 表单赋值方式1
                /*             $(".layui-form-item input[name=username]").val(res.data.username);
                            $(".layui-form-item input[name=nickname]").val(res.data.nickname);
                            $(".layui-form-item input[name=email]").val(res.data.email);
                 */

                // 表单赋值方式2
                // formUserInfo:包含lay-filter="formUserInfo"的元素
                //  res.data
                form.val("formUserInfo", res.data);
            }
        })
    }

    // 绑定重置功能
    $("#btnReset").on("click", function(e) {
        //阻止默认提交
        e.preventDefault();

        initUserInfo();
    })

    //绑定更新功能
    $("#btnCommit").on("click", function(e) {
        // 阻止默认提交行为

        e.preventDefault();

        //发送ajax请求
        $.ajax({
            method: "POST",
            data: form.val("formUserInfo"),
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    //修改失败
                    return layer.msg(res.message);
                }

                //TODO success 刷新显示用户最新 信息
                // initUserInfo();

                layer.msg("修改信息成功");

                //iframe的是index的子页面，子页面要
                // 调用父页面的方法
                window.parent.getUserInfo();

            }
        })
    })


})