#!/bin/bash

readonly ROOT=$(pwd)

${ROOT}/stop_kubernetes_work.sh

${ROOT}/uninstall.sh

${ROOT}/kubelet.sh

${ROOT}/proxy.sh

#${ROOT}/docker.sh

${ROOT}/start_kubernetes_work.sh

${ROOT}/flannel.sh