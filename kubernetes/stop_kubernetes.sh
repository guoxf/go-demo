#!/bin/bash
#status_kubernetes.sh

for SERVICES in etcd kube-apiserver kube-controller-manager kube-scheduler;do
    systemctl stop $SERVICES
done
