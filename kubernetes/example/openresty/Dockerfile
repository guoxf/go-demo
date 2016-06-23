FROM 172.16.9.3:5000/centos
MAINTAINER guoxf <ants.guoxf@gmail.com>
RUN yum update -y
RUN yum install -y vim
RUN mkdir -p /usr/local/openresty
RUN mkdir -p /root/nginx/conf
ENV PATH $PATH:/usr/local/openresty/nginx/sbin
ENV NGINX_PATH /root/nginx
COPY file/* /root/nginx/conf
COPY start.sh /root/nginx/
ADD openresty /usr/local/openresty
EXPOSE 80 443 26379
RUN chmod +x -R /root/nginx/
CMD ["/usr/sbin/init  && /root/nginx/start.sh"]