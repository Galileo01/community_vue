module.exports = {
    configureWebpack: config => {
        let configuration = {
            resolve: {
                alias: {   //@ 已经在 目录中被定义 ，定义为src
                    'assets': '@/assets',
                    'commonjs': '@/commonjs',
                    'components': '@/components',
                    'network': '@/network',
                    'views': '@/views'
                }
            },
        };
        // if (process.env.NODE_ENV === 'production')//生产环境下使用对应入口文件
        // {
        //     configuration.entry = './src/main-prod.js';
        //     configuration.externals = {
        //         'vue': 'Vue',
        //         'element-ui': 'element-ui',
        //         'axios': 'axios',
        //         'vue-router': 'VueRouter',
        //        
        //     }
        // }
        return configuration;
    },
    publicPath: "./",
    devServer: {
    }
}
