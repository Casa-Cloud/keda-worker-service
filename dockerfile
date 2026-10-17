# Use Node.js as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Define a build-time argument
ARG APP_PORT=9001

# Copy only necessary files for production
COPY package*.json ./
COPY src ./src
COPY config ./config
COPY gruntfile.js ./gruntfile.js
COPY tsconfig.json ./tsconfig.json
COPY tslint.json ./tslint.json

# Install only production dependencies
RUN npm install --production

# Comple source code
RUN npm run build

# Remove Source code and unnecessary files
RUN rm -rf src
RUN rm -rf gruntfile.js
RUN rm -rf tsconfig.json
RUN rm -rf tslint.json

# Set the environment variables ( if needed) 
# ENV SWAGGER_ENABLE=true
# ENV PORT=$APP_PORT

# Expose the port your microservice runs on (e.g., 3000)
EXPOSE $APP_PORT

# Command to run the application
CMD ["node", "dist/src/server.js"]