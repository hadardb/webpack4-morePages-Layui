<!--
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-16 20:08:37
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-23 12:25:26
 -->
# Processes 组件说明
创建方式
```
<div id="processes" class="processes-from">
    <div class="processes-content">
        1
    </div>
    <div class="processes-content">
        2
    </div>
    <div class="processes-content">
        3
    </div>
    <div class="processes-content">
        4
    </div>
</div>

<script>
let header = new Processes()
header.init('processes',{
    {
            header: ['基本信息', '填写资质信息', '填写授权人员信息', '完成注册'],
            footer: [{
                name: '上一步',
                events: log
            },
            {
                name: '下一步',
                events: log
            },
            {
                name: '提交',
                events: log
            },
            {
                name: '取消',
                events: log
            }]
        }
})
</script>
```
## init()参数说明
```
header.init(id,{
    header: [头部显示字段],
    footer: [
        {
            name: 按钮名称,
            events: '附加事件'
        }
    ]
})
```

## 调用方法说明
```
// 下一页
header.next()

// 上一页
header.prev()

// 跳转到指定页
header.nextTo(Number)
```
# 注意 目前按钮只支持传入四个 多了少了都不行； 一个页面只能使用一个该组件 具体请查看代码，如有优化请修改该文档

