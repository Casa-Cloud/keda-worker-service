# keda-worker-service
Provides a health endpoint for the KEDA worker service.

## Install Code dependency
```
npm install
```

## Compile Code 
```
PORT=19000 SWAGGER_ENABLE=true node dist/src/server.js
grunt default
```

## Create Image
```
docker build -t casacloud/keda-worker-service:v1.0.0 .
```

## Run Container based on image
docker run -p 9001:9001 casacloud/keda-worker-service:v1.0.0