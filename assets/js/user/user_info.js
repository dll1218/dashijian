$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // 快速为表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventeDefault();
        initUserInfo();
    })

    // 监听表单的提交修改事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息更新失败');
                }
                layer.msg('用户信息更新成功');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserinfo();
            }
        })
    })









    // // 重置表单数据
    // $('#btnReset').on('click', function (e) {
    //     // 阻止表单的默认重置行为
    //     e.preventDefault();
    //     initUserInfo();
    // })

    // // 监听表单的提交事件
    // $('.layui-form').on('submit', function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         method: 'post',
    //         url: '/my/userinfo',
    //         data: $(this).serialize(),
    //         success: function (res) {
    //             console.log(res,'-------');
    //             // if (res.status !== 0) {
    //             //     return layer.msg('用户信息更新失败');
    //             // }
    //             // layer.msg('用户信息更新成功');
    //             // // 调用父页面中的方法，重新渲染用户信息
    //             // window.parent.getUserInfo();
    //         }
    //     })
    // })
})