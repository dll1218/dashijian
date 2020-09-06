$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $('#btnUploadImage').on('click', function () {
        $('#file').click();
    })

    $('#file').on('change', function (e) {
        //1.拿到上传的文件列表
        var fileList = e.target.files;
        if (fileList.length === 0) {
            return layui.layer.msg('请选择图片');
        }
        console.log(fileList, '----');
        var file = fileList[0];
        // 2.将文件转换为路径
        // URL是h5新增的一个对象，可以把文件进行各种转化，包括转化成地址
        var imgUrl = URL.createObjectURL(file);
        // 3.将文件重新初始化
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgUrl) // 重新设置图片途径
            .cropper(options) // 重新初始化裁剪区域

    })

    $('#upload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('上传失败');
                }
                layui.layer.msg('上传成功');
                window.parent.getUserinfo();
            }

        })
    })

})