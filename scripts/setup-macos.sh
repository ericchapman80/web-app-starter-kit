#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This setup script supports macOS only." >&2
  exit 1
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"
runtime="${WEB_APP_STARTER_RUNTIME:-auto}"
macos_major="$(sw_vers -productVersion | cut -d. -f1)"
architecture="$(uname -m)"

if [[ "$runtime" == "auto" ]]; then
  if [[ "$architecture" == "x86_64" && "$macos_major" -le 12 ]]; then
    runtime="rancher"
  else
    runtime="colima"
  fi
fi

case "$runtime" in
  colima|rancher) ;;
  *) echo "Unsupported runtime '$runtime'. Use colima or rancher." >&2; exit 1 ;;
esac

echo "Installing common tools and selected runtime: $runtime"
brew bundle --file="$project_root/Brewfile"
brew bundle --file="$project_root/Brewfile.$runtime"

echo
if [[ "$runtime" == "colima" ]]; then
  echo "Setup complete. Start the runtime with: colima start"
else
  echo "Setup complete. Open Rancher Desktop and select the dockerd (Moby) engine."
  echo "Set Application > Environment > PATH management to Automatic, then restart your terminal."
fi
