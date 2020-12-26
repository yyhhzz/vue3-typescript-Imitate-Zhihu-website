module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                //设置你调用的接口域名和端口号 别忘了加http
                target: 'http://api.vikingship.xyz',
                changeOrigin: true, //允许跨域
                // ws: true,
                pathRewrite: {
                    '^/api': '/api'
                    //会将请求/api/xuanke/index.php替换为/xuanke/index.php
                }
            }
        }
    }
}
