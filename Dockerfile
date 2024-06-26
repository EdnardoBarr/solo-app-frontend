# build front-end
FROM node:alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
RUN npm run build

# move builds to nginx and run the front-end
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d 
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
