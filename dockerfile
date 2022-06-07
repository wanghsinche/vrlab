FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install Node & yarn
RUN apt-get clean && apt-get update \
&& curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
&& apt-get install -y nodejs && npm install --global yarn 

WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# root
COPY package.json heroku.sh ./
RUN yarn install

ENV SERVER_URL=/api  \
    URL=/api \
    NODE_ENV=production \
    ID= 

COPY frontend-umi/ frontend-umi/
RUN cd frontend-umi && yarn add @umijs/preset-react && yarn install && yarn build && rm -fr node_modules


# backend
COPY backend/ backend/
RUN cd backend && yarn install && yarn build


VOLUME [ "/app/backend/data" ]

CMD [ "bash", "heroku.sh" ]
# If you are building your code for production
# RUN npm ci --only=production
