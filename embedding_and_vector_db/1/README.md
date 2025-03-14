1. start localhosted embedding model

```
docker run -it --gpus all -v infinity-data:/app/.cache -p 7997:7997 michaelf34/infinity:latest v2 --model-id nomic-ai/nomic-embed-text-v1 --port 7997
```
