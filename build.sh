#!/bin/bash
npm run build
mkdir -p server/public 2>/dev/null || true
cp -r dist/public/* server/public/ 2>/dev/null || true
echo "Build completed: $(ls -la server/public/ 2>/dev/null || echo "No public directory")"

