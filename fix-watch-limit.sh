#!/bin/bash

# Script to fix OS file watch limit for Next.js/Turbopack

echo "Current inotify watch limit:"
cat /proc/sys/fs/inotify/max_user_watches

echo ""
echo "Increasing limit to 524288..."
echo "You may be prompted for your password."

# Temporarily increase the limit
sudo sysctl fs.inotify.max_user_watches=524288

# Make it permanent
echo "Making the change permanent..."
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf

echo ""
echo "New limit:"
cat /proc/sys/fs/inotify/max_user_watches
echo ""
echo "Done! You may need to restart your terminal or run: sudo sysctl -p"

