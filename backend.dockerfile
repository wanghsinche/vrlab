FROM node:14
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# root
COPY package.json package.json
RUN yarn install
# backend
COPY backend/ backend/
RUN cd backend && yarn install && yarn build
VOLUME [ "backend/data" ]
EXPOSE 1337
CMD [ "yarn", "start" ]
# If you are building your code for production
# RUN npm ci --only=production
