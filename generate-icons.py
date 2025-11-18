#!/usr/bin/env python3
"""
生成浏览器扩展图标
需要安装 Pillow: pip install Pillow
"""

try:
    from PIL import Image, ImageDraw
    import os
    
    def create_icon(size, filename):
        """创建指定尺寸的图标"""
        # 创建图像
        img = Image.new('RGB', (size, size), color='white')
        draw = ImageDraw.Draw(img)
        
        # 绘制渐变背景（简化版，使用纯色）
        draw.rectangle([(0, 0), (size, size)], fill='#667eea')
        
        # 绘制白色横线（表示宽度）
        padding = int(size * 0.2)
        bar_height = max(2, int(size * 0.15))
        
        # 三条横线
        y_positions = [
            padding,
            size // 2 - bar_height // 2,
            size - padding - bar_height
        ]
        
        for y in y_positions:
            draw.rectangle(
                [(padding, y), (size - padding, y + bar_height)],
                fill='white'
            )
        
        # 绘制左右箭头
        arrow_size = max(3, int(size * 0.12))
        arrow_y = size // 2
        
        # 左箭头
        draw.polygon([
            (padding, arrow_y),
            (padding + arrow_size, arrow_y - arrow_size),
            (padding + arrow_size, arrow_y + arrow_size)
        ], fill='white')
        
        # 右箭头
        draw.polygon([
            (size - padding, arrow_y),
            (size - padding - arrow_size, arrow_y - arrow_size),
            (size - padding - arrow_size, arrow_y + arrow_size)
        ], fill='white')
        
        # 保存图标
        icons_dir = os.path.join(os.path.dirname(__file__), 'icons')
        os.makedirs(icons_dir, exist_ok=True)
        filepath = os.path.join(icons_dir, filename)
        img.save(filepath, 'PNG')
        print(f'✓ 已生成: {filename}')
    
    # 生成三个尺寸的图标
    print('开始生成图标...')
    create_icon(16, 'icon16.png')
    create_icon(48, 'icon48.png')
    create_icon(128, 'icon128.png')
    print('\n✓ 所有图标生成完成！')
    print('图标位置: icons/')
    
except ImportError:
    print('错误: 未安装 Pillow 库')
    print('请运行: pip install Pillow')
    print('\n或者使用 create-icons.html 在浏览器中生成图标')
except Exception as e:
    print(f'生成图标时出错: {e}')
