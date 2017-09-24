FROM node:6

ADD . client/
RUN (cd client/; npm install;)
RUN (cd client/; npm run build;)

FROM nginx

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
