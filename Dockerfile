FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html

RUN chown -R nginx /usr/share/nginx/html
