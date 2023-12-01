# 示例源码

## B站首页：[舟中桥流水的个人空间](https://space.bilibili.com/13382193)

## 项目下载

- 电脑上有git环境的可以直接拉下来使用，`git clone -b master git@github.com:ablupi/up-project.git`
- 没有git环境就直接下载压缩包，下载完后在项目根目录打开控制台依次输入：`npm install`、`npm run dev`

## 项目运行

依次运行以下指令

- `npm install`
- `yarn dev`或者`npm run dev`

## 通过路由切换更换模块
- 打开router/index.ts，修改以下部分来更换模块
```js
{
  path: '',
  name: 'Index',
  component: () => import('@/views/index.vue'),
  redirect: '/modal', // 修改这里，如果想要展示对话框模块则重定向到对话框的路由
  children: [
    ...
    // 对话框
    {
      path: '/modal',
      name: 'Modal',
      component: () => import('@/views/modal/modal.vue'),
    },
    ...
  ]
}
```

## 问题收集

- 不建议提交Issues来反馈问题，请添加群：519823105，向群主或管理反馈问题，谢谢。
