#!/bin/bash

readonly ROOT=$(pwd)

${ROOT}/stop_kubernetes.sh

${ROOT}/uninstall.sh

${ROOT}/etcd.sh

${ROOT}/apiserver.sh

${ROOT}/controller-manager.sh

${ROOT}/scheduler.sh

${ROOT}/start_kubernetes.sh

${ROOT}/flannel.sh