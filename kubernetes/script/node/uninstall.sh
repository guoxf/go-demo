#!/bin/bash

readonly ROOT=$(pwd)

rm -rf /opt/kubernetes/cfg
mkdir /opt/kubernetes/cfg
rm /usr/lib/systemd/system/kubelet.service
rm /usr/lib/systemd/system/kube-proxy.service
rm /usr/lib/systemd/system/flannel.service
#rm /usr/lib/systemd/system/docker.service
