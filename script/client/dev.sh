#本地webpack开发环境
cross-env NODE_ENV=development webpack-dev-server --config ./webpack.config.js
# echo '本地webpack开发环境'

# jenkins发起集群编译 dist -> 开发机

# 11.22.33
# ssh 192.168.2.1 node x.js books
# scp x.zip 本机 11.22.33 dist目录 

# ssh 192.168.2.2 node x.js books
