FROM node:13.8-alpine3.10 as build
RUN mkdir /src
COPY . /src
WORKDIR /src
RUN npm install --silent
RUN npm run build

FROM nginx:1.17.8-alpine
COPY --from=build /src/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]