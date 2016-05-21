#!/bin/bash
#stop_kubernetes_work.sh

for SERVICES in kube-proxy kubelet docker; do 
    systemctl stop $SERVICES
done

