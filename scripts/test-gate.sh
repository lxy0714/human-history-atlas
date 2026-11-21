#!/usr/bin/env bash
# 构建产物门禁：先 build，再跑全部产物门禁测试（3 个文件）
# 用法：npm run test:gate
set -e

echo "=== 第一步：构建生产包 ==="
bash scripts/build.sh

echo ""
echo "=== 第二步：运行构建产物门禁测试 ==="
npx vitest run --config vitest.gate.config.ts
