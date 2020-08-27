module.exports = {
  title: 'Qilin',
  description: 'qilin - 轻量级前端应用框架',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/qilin.png'
      }
    ]
  ],
  markdown: {
    lineNumbers: true
  },
  serviceWorker: true,
  base: '/',
  themeConfig: {
    logo: '/qilin.png',
    lastUpdated: 'lastUpdate',
    nav: [
      {
        text: '文档',
        link: '/pages/DOCS/index.md'
      },
      {
        text: '配置',
        link: '/pages/CONFIG/index.md'
      },
      {
        text: 'API',
        link: '/pages/API/index.md'
      },
      {
        text: 'Github',
        link: 'https://github.com/jackhutu/qilin.git'
      }
    ],
    sidebar: {
      '/pages/API/': [
        {
          title: 'API',
          collapsable: false,
          children: [['say.md', 'say']]
        }
      ]
    }
  }
}
