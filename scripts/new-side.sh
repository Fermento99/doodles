
dirname=$(echo $1 | tr '[:upper:]' '[:lower:]' | tr '[:blank:]' '-')

mkdir ./src/$dirname
mkdir ./src/$dirname/static
mkdir ./src/$dirname/src
cp ./src/template/*.{html,css} ./src/$dirname/static/
sed -i '' -e "s/TEMPLATE_NAME/$1/g" ./src/$dirname/static/*.html
echo "console.log('Hello $1!')" > ./src/$dirname/src/index.ts
