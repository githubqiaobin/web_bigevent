$(function() {
    var form = layui.form;
    var layer = layui.layer;
    //校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            if (value !== $("#newPwd").val()) {

                return "两次输入新密码不一致";
            }
        },
        samepwd: function(value) {
            if (value === $("#oldPwd").val()) {

                return "新旧密码一样";
            }
        }
    });

    $("#btnCommit").on("submit", function(e) {
        //阻止默认提交
        e.preventDefault();


        /*         //校验新密码和新确认密码是否一致
                if ($("#newPwd").val() !== $("#newPwdConfirm").val()) {
                    return layer.msg("请确认密码是否一致");
                }
         */

        //发送更新密码的ajax请求
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: form.val("formUserPwd"),
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                layer.msg("更新密码成功");
                //更新完成后重置表单
                $(".layui-form")[0].reset();
            }
        })
    })
})