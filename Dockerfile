# Install dependencies only when needed
FROM node:18.16.0 AS deps

WORKDIR /workspace

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production --network-timeout 300000 --verbose


FROM node:18.16.0 AS builder
WORKDIR /workspace

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY --from=deps /workspace/node_modules ./node_modules

COPY . .

RUN chown -R node:node /workspace

USER node
RUN ["yarn", "build"]
EXPOSE 3000
CMD ["yarn", "start"]


