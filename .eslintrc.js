module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    BMap: true,
    BMAP_ANCHOR_TOP_RIGHT: true,
    BMAP_NAVIGATION_CONTROL_LARGE: true,
    BMAP_POINT_SIZE_TINY: true,
    BMAP_POINT_SIZE_NORMAL: true,
    BMAP_POINT_SIZE_SMALL: true,
    BMAP_POINT_SIZE_SMALLER: true,
    BMAP_POINT_SHAPE_CIRCLE: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
