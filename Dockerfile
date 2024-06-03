FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 5000
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT [ "sh", "./entrypoint.sh" ]