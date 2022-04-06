FROM node:lts-alpine as base
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci
RUN npm run build
RUN chown -R node.node ./node_modules/.cache
USER node

FROM base as dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "start"]

FROM nginx:alpine as prod
ENV NODE_ENV=production
COPY --from=base /usr/src/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]