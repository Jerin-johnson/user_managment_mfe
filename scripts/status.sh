#!/bin/bash

echo ""
echo "=== Starting Auth_app ==="
cd auth_mfe || exit
npm run start &
cd ..

# echo ""
# echo "=== Starting react-child-app ==="
# cd react-child-app || exit
# npm run start:s &
# cd ..

# echo ""
# echo "=== Starting root ==="
# cd root || exit
# npm start &
# cd ..

echo ""
echo "=== Starting shell_app ==="
cd host_app || exit
npm run start &
cd ..

wait