git init
git config user.name "theshantanujoshi"
git config user.email "theshantanujoshi@users.noreply.github.com"
git add .gitignore
git commit -m "Initial commit: Add gitignore"

$files = git ls-files -o --exclude-standard
foreach ($file in $files) {
    git add $file
    git commit -m "Add $file"
}
