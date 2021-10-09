FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install Node & yarn
RUN sed -i 's#http://deb.debian.org#https://mirrors.cloud.tencent.com#g' /etc/apt/sources.list \
&& apt-get clean && apt-get update \
&& curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
&& apt-get install -y nodejs && npm install --global yarn \
&& yarn config set registry http://registry.npm.taobao.org 

WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# root
COPY package.json heroku.sh ./
RUN yarn install

ENV SERVER_URL=/api  \
    URL=/api \
    NODE_ENV=production

# backend
COPY backend/ backend/
RUN cd backend && yarn install && yarn build

COPY frontend-umi/ frontend-umi/
RUN cd frontend-umi && yarn add @umijs/preset-react --dev && yarn install && yarn build


VOLUME [ "/app/backend/data" ]

CMD [ "bash", "heroku.sh" ]
# If you are building your code for production
# RUN npm ci --only=production
