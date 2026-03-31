#!/bin/bash

echo ""
echo "=== Starting Auth_app ==="
cd auth_mfe || exit
npm run start &
cd ..

echo ""
echo "=== Starting user-app ==="
cd user_mfe || exit
npm run start&
cd ..

echo ""
echo "=== Starting user-app ==="
cd shared_mfe || exit
npm run start&
cd ..

echo ""
echo "=== Starting Admin_App ==="
cd admin_mfe || exit
npm start &
cd ..

echo ""
echo "=== Starting shell_app ==="
cd host_app || exit
npm run start &
cd ..

wait