FROM node:14
WORKDIR /app
ENV SERVER_URL=/api
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# root
COPY package.json package.json
RUN yarn install
# backend
COPY frontend-umi/ frontend-umi/
RUN cd frontend-umi && yarn install && yarn build

EXPOSE 8080
CMD [ "yarn", "start:frontend" ]
# If you are building your code for production
# RUN npm ci --only=production
