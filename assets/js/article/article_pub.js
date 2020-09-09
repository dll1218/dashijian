$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initCate();

    // 初始化富文本编辑器
    initEditor();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('加载文章分类失败');
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var str = template('tpl-cate', res);
                $('[name=cate_id]').html(str);
                form.render();
            }
        })
    }

    // 为选择封面的按钮绑定事件处理函数
    $('#chooseImage').on('click', function () {
        $('#coverFile').click();
    })


    // 监听coverFile的change事件，获取用户选择的文件列表
    $('#coverFile').on('change', function (e) {
        var files = e.target.files;
        // 判断用户是否选择了文件
        if (files.length == 0) {
            return;
        }
        // 根据文件，创建对应的url地址  
        var imageUrl = URL.createObjectURL(files[0]);

        // 为裁剪区域重新设置图片
        $image.cropper('destroy').attr('src', imageUrl).cropper(options);
    })

    // 定义文章的发布状态
    var article_state = '已发布';
    $('#btnSave2').on('click', function () {
        article_state = '存为草稿';
    })

    // 为表单绑定提交事件
    $('#form-pub').on('submit', function (e) {
        // 1.阻止表单默认的提交行为
        e.preventDefault();

        // 2.基于form表单，快速创建一个FormData对象
        var fd = new FormData($(this)[0]);
        // 3.将文章的发布状态存到fd
        fd.append('state', article_state);

        // fd.forEach(function (k,v) {
        //     console.log(k,v);
        // })

        // 4. 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5.将文件对象存到fd中
                fd.append('cover_img', blob);
                // 6.向服务器发起请求
                publishArticle(fd);
            })
    })

    // 定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: "post",
            url: '/my/article/add',
            data: fd,
            // 如果向服务器提交的是formdata格式数据，必须提交以下两个配置项
            contentType: false, // 如果上传的是字符串，会告知服务器格式，而这里不需要
            processData: false, // 只有上传的是韩文日文中文才需要编码，这里不需要编码
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败');
                }
                layer.msg('发布文章成功！');
                location.href = '/article/article_list.html';
            }

        })
    }

})