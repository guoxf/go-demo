#!/bin/bash
#status_kubernetes.sh

for SERVICES in etcd kube-apiserver kube-controller-manager kube-scheduler flannel;do
    systemctl status $SERVICES
done
