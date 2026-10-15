import { defineConfig } from 'vitepress'

const englishSidebar = [
  {
    text: 'Getting Started',
    items: [
      { text: 'Intro to Go', link: '/en/introduction/golang' },
      { text: 'Algorithm Quickstart', link: '/en/introduction/quickstart' },
    ],
  },
  {
    text: 'Data Structures',
    items: [
      { text: 'Binary Tree', link: '/en/data_structure/binary_tree' },
      { text: 'Linked List', link: '/en/data_structure/linked_list' },
      { text: 'Stack and Queue', link: '/en/data_structure/stack_queue' },
      { text: 'Binary / Bit Manipulation', link: '/en/data_structure/binary_op' },
    ],
  },
  {
    text: 'Basic Algorithms',
    items: [
      { text: 'Binary Search', link: '/en/basic_algorithm/binary_search' },
      { text: 'Sorting Algorithms', link: '/en/basic_algorithm/sort' },
      { text: 'Dynamic Programming', link: '/en/basic_algorithm/dp' },
    ],
  },
  {
    text: 'Algorithmic Thinking',
    items: [
      { text: 'Recursion', link: '/en/advanced_algorithm/recursion' },
      { text: 'Sliding Window', link: '/en/advanced_algorithm/slide_window' },
      { text: 'Binary Search Tree', link: '/en/advanced_algorithm/binary_search_tree' },
      { text: 'Backtracking', link: '/en/advanced_algorithm/backtrack' },
    ],
  },
  {
    text: 'Practice Material',
    items: [
      { text: 'B+ Tree', link: '/en/practice_algorithm/bplus' },
      { text: 'Data Index', link: '/en/practice_algorithm/data_index' },
      { text: 'Skip List', link: '/en/practice_algorithm/skiplist' },
    ],
  },
]

const portugueseSidebar = [
  {
    text: 'Primeiros passos',
    items: [
      { text: 'Introdução ao Go', link: '/pt-br/introduction/golang' },
      { text: 'Início rápido de algoritmos', link: '/pt-br/introduction/quickstart' },
    ],
  },
  {
    text: 'Estruturas de dados',
    items: [
      { text: 'Árvore binária', link: '/pt-br/data_structure/binary_tree' },
      { text: 'Lista encadeada', link: '/pt-br/data_structure/linked_list' },
      { text: 'Pilha e fila', link: '/pt-br/data_structure/stack_queue' },
      { text: 'Manipulação binária e de bits', link: '/pt-br/data_structure/binary_op' },
    ],
  },
  {
    text: 'Algoritmos básicos',
    items: [
      { text: 'Busca binária', link: '/pt-br/basic_algorithm/binary_search' },
      { text: 'Algoritmos de ordenação', link: '/pt-br/basic_algorithm/sort' },
      { text: 'Programação dinâmica', link: '/pt-br/basic_algorithm/dp' },
    ],
  },
  {
    text: 'Pensamento algorítmico',
    items: [
      { text: 'Recursão', link: '/pt-br/advanced_algorithm/recursion' },
      { text: 'Janela deslizante', link: '/pt-br/advanced_algorithm/slide_window' },
      { text: 'Árvore binária de busca', link: '/pt-br/advanced_algorithm/binary_search_tree' },
      { text: 'Backtracking', link: '/pt-br/advanced_algorithm/backtrack' },
    ],
  },
  {
    text: 'Material de prática',
    items: [
      { text: 'Árvore B+', link: '/pt-br/practice_algorithm/bplus' },
      { text: 'Índices de dados', link: '/pt-br/practice_algorithm/data_index' },
      { text: 'Skip list', link: '/pt-br/practice_algorithm/skiplist' },
    ],
  },
]

export default defineConfig({
  title: 'Algorithm Patterns',
  description: 'Algorithm patterns and Go examples in English and Brazilian Portuguese.',
  cleanUrls: true,
  // The root README is the GitHub landing page and SUMMARY.md is the GitBook
  // table of contents; the VitePress home and sidebar replace both.
  srcExclude: ['README.md', '**/SUMMARY.md'],
  rewrites: {
    'en/README.md': 'en/index.md',
    'pt-br/README.md': 'pt-br/index.md',
  },
  head: [['meta', { name: 'theme-color', content: '#3451b2' }]],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'English', link: '/en/' },
      { text: 'Português (Brasil)', link: '/pt-br/' },
      { text: 'GitHub', link: 'https://github.com/giossaurus/algorithm-pattern-pt' },
    ],
    sidebar: {
      '/en/': englishSidebar,
      '/pt-br/': portugueseSidebar,
    },
    search: { provider: 'local' },
    outline: { level: [2, 3], label: 'On this page' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/giossaurus/algorithm-pattern-pt' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Based on greyireland/algorithm-pattern.',
    },
  },
})
