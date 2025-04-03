
rm -rf ./build
mkdir ./build
dirs=$(find ./src -depth 1 -type d ! -name "template" ! -name "home" | tr -d './src/') 
cp ./src/home/* ./build/

button_class='nav-btn'
injected_html=''

for dir in $(echo "${dirs[@]}")
do
    echo creating $dir
    mkdir ./build/$dir
    cp ./src/$dir/static/* ./build/$dir/
    npx tsc ./src/$dir/src/* --outFile "./build/$dir/index.js"

    injected_html+="<a class=\"$button_class\" href=\"./$dir/index.html\" target=\"_self\" >$dir</a>\n\t\t"
done;

code_selector=${injected_html//\//\\/}

sed -i '' -e "s/<!-- BUTTON_CODE -->/$code_selector/g" ./build/index.html

echo "Finished building, you can visit project page at file://$(pwd)/build/index.html"
