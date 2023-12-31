FROM node:lts-alpine
ENV NODE_ENV=production
ENV PORT=8080 
ENV SESSION_SECRET_KEY=a3f8b39c4f2e55b8b4f5b90b3a2b8b35a7b8d9e0b7a8c9f4a3b6c7d8e9f7b6a8c7f6e5d4c3b2a9d8e7f6b5a4c3d2e1f0
ENV NODE_ENV_MODE=dev
ENV GOOGLE_CLIENT_ID=382442810878-n34u0qvumjboqkmkh64m9easvbgoqa10.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV COOKIE_SECRET=4f9d9a2f365916e9f3af6b462b18079ef814a3b1f4f9e4e9a9b1
ENV JWT_SECRET=e9867c2c7c33e1644b01b5e870f1f3f3231e3212a66506b0cf5b489862a6e990c8e8f4e4c8b59d3f448f6b2b1f41ae13
ENV DB_URI=postgres://hahgczay:yQohz_2xgIYPc2jAWumMArPly0BfqzBk@silly.db.elephantsql.com/hahgczay
ENV MONGO_DB_URI=mongodb+srv://sanapesa:sjdD15PcwfwAO3ba@coderhousebackend.w83uwpj.mongodb.net/?retryWrites=true&w=majority
ENV CLOUDNAME=dt1icsnqu
ENV APIKEY=849715998937924
ENV APISECRET=6UZjgLxvi34ygrs26zxMhBt3Mf8
ENV MAIL_USER=sanape.sa@gmail.com
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
