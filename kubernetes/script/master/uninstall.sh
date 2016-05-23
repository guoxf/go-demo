#!/bin/bash

readonly ROOT=$(pwd)

rm -rf /opt/kubernetes/cfg
mkdir /opt/kubernetes/cfg
rm /usr/lib/systemd/system/etcd.service
rm /usr/lib/systemd/system/kube-apiserver.service
rm /usr/lib/systemd/system/kube-controller-manager.service
rm /usr/lib/systemd/system/kube-scheduler.service
rm /usr/lib/systemd/system/flannel.service
