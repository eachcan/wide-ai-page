# AI Chat Width Controller 扩展打包脚本
# 使用方法: .\pack-extension.ps1

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  AI Chat Width Controller 打包工具" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 获取版本号
$manifestPath = ".\manifest.json"
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
$version = $manifest.version
Write-Host "当前版本: v$version" -ForegroundColor Green
Write-Host ""

# 创建临时打包目录
$tempDir = ".\temp-release"
$outputName = "ai-chat-width-controller-v$version.zip"

Write-Host "正在准备打包..." -ForegroundColor Yellow

# 如果临时目录存在，先删除
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}

# 创建临时目录
New-Item -ItemType Directory -Path $tempDir | Out-Null

# 复制必需文件
$filesToCopy = @(
    "manifest.json",
    "popup.html",
    "popup.js",
    "content.js",
    "content.css",
    "background.js",
    "README.md"
)

Write-Host "复制文件..." -ForegroundColor Yellow
foreach ($file in $filesToCopy) {
    if (Test-Path $file) {
        Copy-Item $file $tempDir
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file (未找到)" -ForegroundColor Red
    }
}

# 复制 icons 文件夹
if (Test-Path ".\icons") {
    
    Copy-Item ".\icons" $tempDir -Recurse
    Write-Host "  ✓ icons/" -ForegroundColor Green

} else {

    Write-Host "  ✗ icons/ (未找到)" -ForegroundColor Red
}

Write-Host ""
Write-Host "创建 ZIP 压缩包..." -ForegroundColor Yellow

# 删除旧的 ZIP 文件（如果存在）
if (Test-Path $outputName) {
    Remove-Item $outputName -Force
}

# 压缩文件
Compress-Archive -Path "$tempDir\*" -DestinationPath $outputName -CompressionLevel Optimal

# 清理临时目录
Remove-Item $tempDir -Recurse -Force

# 获取文件大小
$fileSize = (Get-Item $outputName).Length
$fileSizeKB = [math]::Round($fileSize / 1KB, 2)

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  打包完成！" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "输出文件: $outputName" -ForegroundColor Green
Write-Host "文件大小: $fileSizeKB KB" -ForegroundColor Green
Write-Host ""
Write-Host "下一步:" -ForegroundColor Yellow
Write-Host "  1. 在本地测试扩展功能" -ForegroundColor White
Write-Host "  2. 访问 Chrome Web Store 开发者控制台" -ForegroundColor White
Write-Host "     https://chrome.google.com/webstore/devconsole" -ForegroundColor Cyan
Write-Host "  3. 上传 $outputName" -ForegroundColor White
Write-Host "  4. 填写商店信息并提交审核" -ForegroundColor White
Write-Host ""
Write-Host "详细说明请查看: 打包发布说明.md" -ForegroundColor Yellow
Write-Host ""

# 询问是否打开文件位置
$response = Read-Host "是否打开文件位置? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    $fullPath = Join-Path $PWD $outputName
    explorer.exe /select,$fullPath
}
