#!/bin/bash

# ================================================
# Hard-coded Build & Push Script for Micro-Frontends
# ================================================

REGISTRY="jerinirowz"   # ← Change this to your Docker Hub username
TAG="latest"            # ← You can change to v1.0, prod, etc.

echo "========================================"
echo "🚀 Starting Docker Build & Push"
echo "Registry : ${REGISTRY}"
echo "Tag      : ${TAG}"
echo "========================================"

# Function to build and push one service
build_and_push() {
  SERVICE=$1
  FOLDER=$2

  echo ""
  echo "🔨 Building ${SERVICE} from folder ./${FOLDER} ..."

  docker build --no-cache -t ${REGISTRY}/${SERVICE}:${TAG} \
    -f ./${FOLDER}/Dockerfile \
    ./${FOLDER}

  if [ $? -ne 0 ]; then
    echo "❌ Failed to build ${SERVICE}"
    exit 1
  fi

  echo "✅ Successfully built ${SERVICE}"

  echo "📤 Pushing ${REGISTRY}/${SERVICE}:${TAG} ..."
  docker push ${REGISTRY}/${SERVICE}:${TAG}

  if [ $? -ne 0 ]; then
    echo "❌ Failed to push ${SERVICE}"
    exit 1
  fi

  echo "✅ Successfully pushed ${SERVICE}:${TAG}"
}

# Build and push all services
build_and_push "shell"   "host_app"
build_and_push "auth"    "auth_mfe"
build_and_push "user"    "user_mfe"
build_and_push "admin"   "admin_mfe"
build_and_push "shared"  "shared_mfe"

echo ""
echo "🎉 All 5 micro-frontends built and pushed successfully!"
echo "Images pushed:"
echo "   • ${REGISTRY}/shell:${TAG}"
echo "   • ${REGISTRY}/auth:${TAG}"
echo "   • ${REGISTRY}/user:${TAG}"
echo "   • ${REGISTRY}/admin:${TAG}"
echo "   • ${REGISTRY}/shared:${TAG}"