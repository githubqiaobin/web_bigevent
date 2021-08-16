$(function() {
    var layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //上传按钮绑定file文件的点击
    $("#btnUpload").on("click", function() {
        $("#file").click();
    })


    //更换裁剪区域内容
    //change事件能够监控发生了变化
    $("#file").on("change", function(e) {
        // console.log(e.target.files);
        if (e.target.files.length === 0) {
            return layer.msg("图片未发生变化");
        }
        // 拿到用户选择的文件
        var file = e.target.files[0];
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file);
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域

    })


    //绑定更新头像方法
    $("#btnComit").on("click", function() {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新头像失败！");
                }

                layer.msg("更新头像成功！");
                //更新成功后，刷新index页面上的头像
                window.parent.getUserInfo();
            }

        })

    })


})