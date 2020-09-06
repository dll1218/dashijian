function getUserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取失败');
            }
            // layui.layer.msg('获取成功');
            // 渲染头像的函数
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2 渲染文本头像
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    }
}

getUserinfo();

var layer = layui.layer;
// 实现退出功能
$('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //do something
        // 清除本地存储中的数据
        localStorage.removeItem('token');
        // 跳转到之前的页面
        location.href = '/login.html';
        // 关闭弹出层
        layer.close(index);
    });
})