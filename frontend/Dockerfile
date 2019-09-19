# 참고 : https://stackoverflow.com/questions/42936588/how-to-deploy-vue-app
FROM node:carbon

RUN mkdir -p /usr/src/www

WORKDIR /usr/src/www
ADD . /usr/src/www
RUN npm install
RUN npm rebuild node-sass

# ENV NODE_ENV=production

# RUN npm run build

# Remove unused directories
# RUN rm -rf ./src
# RUN rm -rf ./build

# Port to expose
# EXPOSE 8080
EXPOSE 3001
# EXPOSE 3000
CMD [ "npm", "start" ]




# # production stage
# FROM nginx
# COPY --from=build-stage /usr/src/www/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]