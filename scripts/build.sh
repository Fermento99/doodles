
rm -rf ./build
mkdir ./build
cp ./src/$1/static/* ./build/
npx tsc ./src/$1/src/* --outFile "./build/index.js"

echo "Finished building, you can visit project page at file://$(pwd)/build/index.html"
