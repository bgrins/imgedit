#!/bin/sh
echo "Starting build..."
MYDIR=$(cd $(dirname "$0"); pwd)
$MYDIR/requirejs/build/build.sh $MYDIR/app.build.js


echo "Removing original scripts..."
rm -R $MYDIR/web-build/scripts/lib/
rm -R $MYDIR/web-build/scripts/app/
