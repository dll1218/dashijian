$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,16}$/, "密码输入必须6-12位，且不包含空格"],
        samePwd: function (value) {
            if ($('[name=oldPwd]').val() === value) {
                return '新旧密码不能相同';
            }
        },
        rePwd: function (value) {
            if ($('[name=newPwd]').val() !== value) {
                return '两次密码输入不一致';
            }
        }
    })

    $('#form-reset').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return '重置密码失败';
                }
                layui.layer.msg('更新密码成功！');
                $('#form-reset')[0].reset();
            }

        })
    })
})