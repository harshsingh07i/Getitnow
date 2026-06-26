git config user.name "theshantanujoshi"
git config user.email "theshantanujoshi@users.noreply.github.com"

# Get both modified and untracked files
$files = git ls-files -m
$untracked = git ls-files -o --exclude-standard
$allFiles = $files + $untracked | Select-Object -Unique

foreach ($file in $allFiles) {
    if ([string]::IsNullOrWhiteSpace($file)) { continue }
    git add $file
    git commit -m "Update $file"
}

git push origin main
