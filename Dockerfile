ARG JFROG_REGISTRY=jfrog.ababank.com

FROM ${JFROG_REGISTRY}/docker/node:16-1-98 AS development

WORKDIR /opt/app-root

COPY package*.json ./

COPY .npmrc ./

RUN npm install glob rimraf @ababank/auth@1.3.0

RUN npm install --only=development

COPY . .

RUN npm run build

RUN rm -rf .npmrc

FROM ${JFROG_REGISTRY}/docker/node:16-1-98 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app-root

COPY package*.json ./

COPY .npmrc ./

RUN npm install --only=production

COPY .env.example .env

COPY . .

COPY --from=development /opt/app-root/dist ./dist

RUN rm -rf .npmrc

CMD ["npm", "run", "start:prod"]