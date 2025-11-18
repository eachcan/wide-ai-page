/**
 * 使用 Node.js 生成图标
 * 运行: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// 创建一个简单的 PNG 图标（紫色方块，中间有白色横线）
function createSimplePNG(size) {
  // 这是一个最小的 PNG 文件结构
  // 为了简化，我们创建一个纯色的 PNG
  
  const canvas = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body>
<canvas id="c" width="${size}" height="${size}"></canvas>
<script>
const c = document.getElementById('c');
const ctx = c.getContext('2d');

// 渐变背景
const gradient = ctx.createLinearGradient(0, 0, ${size}, ${size});
gradient.addColorStop(0, '#667eea');
gradient.addColorStop(1, '#764ba2');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, ${size}, ${size});

// 白色横线
ctx.fillStyle = 'white';
const padding = ${size} * 0.2;
const barHeight = Math.max(2, ${size} * 0.15);

// 三条横线
const y1 = padding;
const y2 = ${size} / 2 - barHeight / 2;
const y3 = ${size} - padding - barHeight;

ctx.fillRect(padding, y1, ${size} - padding * 2, barHeight);
ctx.fillRect(padding, y2, ${size} - padding * 2, barHeight);
ctx.fillRect(padding, y3, ${size} - padding * 2, barHeight);

// 左右箭头
const arrowSize = Math.max(3, ${size} * 0.12);
const arrowY = ${size} / 2;

// 左箭头
ctx.beginPath();
ctx.moveTo(padding, arrowY);
ctx.lineTo(padding + arrowSize, arrowY - arrowSize);
ctx.lineTo(padding + arrowSize, arrowY + arrowSize);
ctx.closePath();
ctx.fill();

// 右箭头
ctx.beginPath();
ctx.moveTo(${size} - padding, arrowY);
ctx.lineTo(${size} - padding - arrowSize, arrowY - arrowSize);
ctx.lineTo(${size} - padding - arrowSize, arrowY + arrowSize);
ctx.closePath();
ctx.fill();

// 输出 base64
console.log(c.toDataURL('image/png'));
</script>
</body>
</html>`;
  
  return canvas;
}

// 创建 icons 目录
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

console.log('生成图标 HTML 文件...\n');

// 生成三个尺寸的 HTML 文件
[16, 48, 128].forEach(size => {
  const html = createSimplePNG(size);
  const filename = `generate-icon${size}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✓ 已创建: ${filename}`);
  console.log(`  在浏览器中打开此文件，复制控制台输出的 base64 数据`);
  console.log(`  然后使用在线工具转换为 PNG: https://base64.guru/converter/decode/image\n`);
});

console.log('提示: 或者直接在浏览器中打开 create-icons.html 自动下载图标');
