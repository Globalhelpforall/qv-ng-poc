

kubectl apply -f ./namespace.yaml
kubectl apply -f ./raven-ui.yaml

kubectl -n raven-namespace get all -o wide
