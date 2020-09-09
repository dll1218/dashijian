$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！');
                }
                layer.msg('获取文章分类列表成功！');
                var strHtml = template('tpl-table', res);
                $('tbody').html(strHtml);
            }
        })
    }

    var indexAdd = null;

    $('#btnAddList').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px'],
            content: $('#btnAdd').html()
        })
    })

    $('body').on('submit', '#newAdd', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败');
                }
                layer.msg('新增分类成功');
                initArtCateList();

                layer.close(indexAdd);
            }
        })
    })

    var indexEdit = null;
    $('body').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id');
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
              method: 'POST',
              url: '/my/article/updatecate',
              data: $(this).serialize(),
              success: function(res) {
                if (res.status !== 0) {
                  return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
              }
        })
    })

    $('tbody').on('click', '#btn-delete', function () {
        var id = $(this).attr('data-id');
        // 提示用户是否要删除
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList();
                }
            })
        })
    })


})