module.exports = {
  title: 'QilinJS',
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
        link: '/pages/guide/index.md'
      },
      {
        text: '配置',
        link: '/pages/config/init.md'
      },
      {
        text: 'API',
        link: '/pages/api/index.md'
      },
      {
        text: 'Github',
        link: 'https://github.com/jackhutu/qilin.git'
      }
    ],
    sidebar: {
      '/pages/guide/': [
        {
          title: '介绍',
          collapsable: false,
          children: ['', 'getting-started']
        },
        {
          title: '数据流',
          collapsable: false,
          children: ['redux', 'diff']
        },
        {
          title: 'MOCK',
          collapsable: false,
          children: ['mock']
        },
        {
          title: 'git flow',
          collapsable: false,
          children: ['git-flow']
        }
      ],
      '/pages/config/': [
        {
          title: '配置',
          collapsable: false,
          children: ['init', 'build']
        }
      ],
      '/pages/api/': [
        {
          title: 'API',
          collapsable: false,
          children: ['']
        }
      ]
    }
  }
}
