module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "jsx-quotes": [2, "prefer-double"],    // 强制在JSX属性（jsx-quotes）中一致使用双引号
        "react/display-name": 0,               // 防止在React组件定义中丢失displayName
        "react/forbid-prop-types": [2, { "forbid": ["any"] }],   // 禁止某些propTypes
        "react/jsx-boolean-value": 2,          // 在JSX中强制布尔属性符号
        "react/jsx-closing-bracket-location": 1,               // 在JSX中验证右括号位置
        "react/jsx-curly-spacing": [2, { "when": "never", "children": true }], // 在JSX属性和表达式中加强或禁止大括号内的空格。
        "react/jsx-indent-props": [2, 4],      // 验证JSX中的props缩进
        "react/jsx-key": 2,                    // 在数组或迭代器中验证JSX具有key属性
        "react/jsx-no-bind": 0,                // JSX中不允许使用箭头函数和bind
        "react/jsx-no-duplicate-props": 2,     // 防止在JSX中重复的props
        "react/jsx-no-literals": 0,            // 防止使用未包装的JSX字符串
        "react/jsx-no-undef": 1,               // 在JSX中禁止未声明的变量
        "react/jsx-pascal-case": 0,            // 为用户定义的JSX组件强制使用PascalCase
        "react/jsx-uses-react": 1,             // 防止反应被错误地标记为未使用
        "react/jsx-uses-vars": 2,              // 防止在JSX中使用的变量被错误地标记为未使用
        "react/no-danger": 0,                  // 防止使用危险的JSX属性
        "react/no-did-mount-set-state": 0,     // 防止在componentDidMount中使用setState
        "react/no-did-update-set-state": 1,    // 防止在componentDidUpdate中使用setState
        "react/no-direct-mutation-state": 2,   // 防止this.state的直接变异
        "react/no-multi-comp": 1,              // 防止每个文件有多个组件定义
        "react/no-set-state": 0,               // 防止使用setState
        "react/no-unknown-property": 2,        // 防止使用未知的DOM属性
        "react/prefer-es6-class": 2,           // 为React组件强制执行ES5或ES6类
        "react/prop-types": 0,                 // 防止在React组件定义中丢失props验证
        "react/react-in-jsx-scope": 2,         // 使用JSX时防止丢失React
        "react/self-closing-comp": 0,          // 防止没有children的组件的额外结束标签
        "react/sort-comp": 1,                  // 强制组件方法顺序
        "no-extra-boolean-cast": 0,            // 禁止不必要的bool转换
        "react/no-array-index-key": 0,         // 防止在数组中遍历中使用数组key做索引
        "react/no-deprecated": 1,              // 不使用弃用的方法
        "react/jsx-equals-spacing": 2,         // 在JSX属性中强制或禁止等号周围的空格
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],    // 允许在 .js 和 .jsx 文件中使用  jsx
        "no-unreachable": 1,                   // 不能有无法执行的代码
        "comma-dangle": 2,                     // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
        "comma-spacing": [2, { 'before': false, 'after': true }],  // 控制逗号前后的空格
        "no-mixed-spaces-and-tabs": 0,         // 禁止混用tab和空格
        "prefer-arrow-callback": 0,            // 比较喜欢箭头回调
    }
}
