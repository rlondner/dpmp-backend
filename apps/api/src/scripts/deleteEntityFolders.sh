#!/bin/bash

# Check if a directory is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

# Assign the directory to a variable
TARGET_DIR="$1"

# Confirm before proceeding
#read -p "Are you sure you want to delete '$TARGET_DIR' and all its contents? (y/n): " CONFIRM
#if [[ "$CONFIRM" != "y" ]]; then
#  echo "Operation canceled."
#  exit 0
#fi

# Check if the directory exists
if [ -d "$TARGET_DIR" ]; then
  # Use rm command to delete the directory recursively
  rm -rf "$TARGET_DIR"
  echo "Directory '$TARGET_DIR' has been deleted."
else
  echo "Error: Directory '$TARGET_DIR' does not exist."
  exit 1
fi
