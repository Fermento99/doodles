
rm -rf ./build
mkdir ./build
cp -R ./src/$1/static/ ./build/
npx webpack --env=side=$1 --env=mode=development -w

echo "Side in dev mode file://$(pwd)/build/index.html"
