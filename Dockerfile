# Install dependencies only when needed
FROM node:22.16.0-slim AS deps
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_STRAPI_AUTH_TOKEN
WORKDIR /workspace

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production --network-timeout 300000 --verbose


FROM node:22.16.0-slim AS builder

WORKDIR /workspace

ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_STRAPI_AUTH_TOKEN
ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_STRAPI_API_URL=${NEXT_PUBLIC_STRAPI_API_URL}
ENV NEXT_PUBLIC_STRAPI_AUTH_TOKEN=${NEXT_PUBLIC_STRAPI_AUTH_TOKEN}

COPY --from=deps /workspace/node_modules ./node_modules

COPY . .

RUN chown -R node:node /workspace

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

USER node
RUN ["yarn", "build"]
EXPOSE 3000
CMD ["yarn", "start"]


