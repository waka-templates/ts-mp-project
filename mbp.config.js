/**
 * Created by ximing on 2019-03-14.
 */
const path = require("path");
const MPB = require("mpbuild");

module.exports = (
  entry,
  { needUglify } = { needUglify: true }
) => {
  return {
    // 入口配置文件
    entry,
    // 源码对应目录
    src: path.join(__dirname, "src"),
    alias: {},
    output: {
      path: path.join(__dirname, "dist"),
      npm: "npm"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".tsx", ".ts", ".js", ".json", ".wxml", ".wxss"]
    },
    optimization: {
      minimize: {
        js: needUglify,
        wxml: true,
        json: true
      }
    },
    exts: [".ts", ".js", ".json", ".wxml", ".wxss"],
    resources: "./res",
    module: {
      rules: [
        {
          test: /\.wxss$/,
          use: [
            {
              loader: "postcss-loader",
              options: {
                parser: require("postcss-scss"),
                plugins: [
                  require("postcss-advanced-variables")({
                    variables: {},
                    disable: "@mixin, @include,@content, @import"
                  }),
                  require("postcss-nested")({ bubble: ["keyframes"] }),
                  require("cssnano")({
                    preset: ["default", { calc: false }]
                  })
                ]
              }
            }
          ]
        },
        {
          test: /\.js$/,
          include: [
            "**/node_modules/@mtfe/**/*",
            "**/node_modules/@tarojs/**/*"
          ],
          exclude: ["**/node_modules/**"],
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          include: [
            "**/node_modules/@mtfe/**/*",
            "**/node_modules/@tarojs/**/*"
          ],
          exclude: ["**/node_modules/**/*"],
          use: [
            {
              loader: "babel-loader"
            },
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          test: /\.json$/,
          use: [
            {
              loader: "json-loader"
            }
          ]
        },
        {
          test: /\.wxml$/,
          use: []
        }
      ]
    },
    plugins: [
      new MPB.CleanMbpPlugin({
        path: ["dist/**/*", "!dist/project.config.json"]
      }),
      new MPB.TsTypeCheckPlugin({
        project: __dirname
      }),
      new MPB.ProjectConfigPlugin({
        projectname: "mp-ide",
        appId: "wx46db488db3c5481f"
      })
    ]
  };
};
