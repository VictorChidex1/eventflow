# Deployment Script for EventFlow
Write-Host "🚀 Starting EventFlow Deployment..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Yellow
Write-Host "This script will:" -ForegroundColor White
Write-Host "1. Remove old build files" -ForegroundColor White
Write-Host "2. Create new build" -ForegroundColor White
Write-Host "3. Deploy to GitHub" -ForegroundColor White
Write-Host "=====================================" -ForegroundColor Yellow

# Step 1: Remove old build completely
Write-Host " "
Write-Host "1. Removing old build files..." -ForegroundColor Cyan

if (Test-Path "docs") {
    Remove-Item -Recurse -Force docs
    Write-Host "   ✅ Old docs folder removed" -ForegroundColor Green
} else {
    Write-Host "   ℹ️ No docs folder found (first time deployment?)" -ForegroundColor Yellow
}

# Step 2: Build fresh project
Write-Host " "
Write-Host "2. Building project..." -ForegroundColor Cyan
npm run build
Write-Host "   ✅ Build command completed" -ForegroundColor Green

# Step 3: Verify build was successful
Write-Host " "
Write-Host "3. Verifying build..." -ForegroundColor Cyan

if (Test-Path "docs") {
    Write-Host "   ✅ Build successful - docs folder created" -ForegroundColor Green
    
    # Check if our current numbers are in the build
    $content = Get-Content "docs/index.html" -Raw
    if ($content -match "5,500\+") {
        Write-Host "   ✅ Current stats (5,500+) found in build" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Stats not found in build" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ Build failed - no docs folder created" -ForegroundColor Red
    Write-Host "   💡 Check for errors above and fix them" -ForegroundColor Yellow
    exit 1
}

# Step 4: Deploy to GitHub
Write-Host " "
Write-Host "4. Deploying to GitHub..." -ForegroundColor Cyan

git add .
git commit -m "Deploy: Update with fresh build - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin main

Write-Host "   ✅ Code pushed to GitHub" -ForegroundColor Green

# Step 5: Final information
Write-Host " "
Write-Host "=====================================" -ForegroundColor Yellow
Write-Host "🎉 Deployment script completed!" -ForegroundColor Green
Write-Host " " 
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Wait 2-5 minutes for GitHub Pages to update" -ForegroundColor White
Write-Host "2. Visit: https://yourusername.github.io/eventflow/" -ForegroundColor White
Write-Host "3. HARD refresh with Ctrl + F5" -ForegroundColor White
Write-Host "4. Check if changes are visible" -ForegroundColor White
Write-Host " "
Write-Host "If changes don't appear:" -ForegroundColor Yellow
Write-Host "• Wait 5 more minutes" -ForegroundColor White
Write-Host "• Clear browser cache completely" -ForegroundColor White
Write-Host "• Try incognito/private browsing mode" -ForegroundColor White
Write-Host "=====================================" -ForegroundColor Yellow