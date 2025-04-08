
rm -rf ./build
mkdir ./build
cp -R ./src/$1/static/ ./build/
npx webpack --env=side=$1 --env=mode=production

echo "Finished building, you can visit project page at file://$(pwd)/build/index.html"
