#!/usr/bin/env bash

COMMAND_OUTPUT=/dev/null

function setup_github {
  echo "Setting origin to github"
  git remote set-url origin git@e.coding.net:dtid_ba918acb1cf7fd42/fanji/fanji.git >${COMMAND_OUTPUT}

  git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*' >${COMMAND_OUTPUT}
  git config remote.origin.push HEAD >${COMMAND_OUTPUT}

  git config branch.autosetuprebase always

  git config fetch.prune true
  git config fetch.pruneTags true
  git config push.default current

  git config alias.shove 'push --force-with-lease'
  git config alias.a=add
  git config alias.b=branch
  git config alias.c=commit
  git config alias.d=diff
  git config alias.f=fetch
  git config alias.g=grep
  git config alias.l=log
  git config alias.m=merge
  git config alias.o=checkout
  git config alias.p=pull
  git config alias.r=remote
  git config alias.s=status

  echo ''
  echo $'\e[32mTo use coding.net for code review, run git push origin from your local branch\e[0m'
  echo $'To create a new Pull Request for the new branch, run \e[32mhub pull-request\e[0m'
  echo ''

  echo  "Installing git hooks"
}


setup_github
echo  $'\e[32mproject initialized\e[0m'
