# 基础镜像
FROM 
# Install global npm packages
# NOTE: The versions are hardcoded to allow for cache invalidation

# Switch to unprivileged user
# Standard in codemao-master images
# 切换后续命令执行的用户（用户和用户组必须提前已经存在）
USER urnotzane

# Workdir is unprivileged user home
# 指定下列命令的工作目录。
WORKDIR /usr/src/app

# Install node dependencies
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY .npmrc /usr/src/app
RUN npm install

COPY . /usr/src/app/
RUN npm run jest:utils

# ARG 环境变量，仅在docker build过程中有效，通过--build-arg name=value传入
# ENV         在docker build和docker run时均有效
ARG QN_AKEY=''
ARG QN_SKEY=''

# RUN npm run build
# Entry point
RUN npm run build

# 声明内部运行端口
EXPOSE 5000

# 会把[容器名后面]的所有内容都当成参数
ENTRYPOINT ["npm", "run"]
# 运行docker run运行镜像时做使用的命令，多个CMD只有最后一个生效
CMD ["production"]
