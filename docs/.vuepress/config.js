module.exports = {
  title: 'Qilin',
  description: 'Qilin',
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
        text: '指南',
        link: '/pages/GUIDE/index.md'
      },
      {
        text: '了解更多',
        ariaLabel: '了解更多',
        items: [
          {
            text: 'Qilin API',
            link: '/pages/API/index.md'
          },
          {
            text: 'Qilin CLI',
            link: '/pages/CLI/index.md'
          }
        ]
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
