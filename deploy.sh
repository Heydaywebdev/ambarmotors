#! /bin/bash
bash ./build.sh
bash ./push.sh
kubectl delete -f deployment.yaml
kubectl apply -f deployment.yaml
