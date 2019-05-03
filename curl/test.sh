#!/bin/bash

# curl -X GET https://api.github.com/repos/typeorm/typeorm/tags \
#   -H 'Content-Type: application/json' \
#   -H 'Accept: application/vnd.github.v3+json' | jq .[0].name

curl -X GET https://api.github.com/repos/kubernetes/kubernetes/releases/latest \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/vnd.github.v3+json' | jq .name
