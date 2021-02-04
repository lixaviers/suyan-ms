npm run build

git add .
git commit -m 'feat:page'
git push

cd ../suyan-ms-ph-pages
rm -rf favicon.ico
rm -rf index.html
rm -rf public

cd ../suyan-ms/dist/

mv * ../../suyan-ms-ph-pages

cd ../../suyan-ms-ph-pages/

git add .
git commit -m 'feat:page'
git push
