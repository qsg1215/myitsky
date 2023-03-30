### jenkens

 jenkens 用户再登录上我们的构建机器节点的时候, 不会加载/etc/profile. 所以会导致一样的用户, 在jenkens 的shell 脚本中无法使用某些环境变量, 因此需要自定义环境变量