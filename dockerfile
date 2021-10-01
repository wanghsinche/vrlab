FROM node:14
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# backend
COPY backend/ backend/
# frontend
COPY frontend-umi/ frontend-umi/
RUN cd backend && yarn install && yarn build
VOLUME [ "backend/data" ]
EXPOSE 1337
CMD [ "yarn", "--cwd backend", "develop" ]
# If you are building your code for production
# RUN npm ci --only=production
