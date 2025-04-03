
rm -rf ./build
mkdir ./build
cp ./src/$1/static/* ./build/
npx tsc ./src/$1/src/* --outFile "./build/index.js" -w

echo "Side in dev mode file://$(pwd)/build/index.html"
