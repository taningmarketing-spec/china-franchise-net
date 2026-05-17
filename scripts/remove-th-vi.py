#!/usr/bin/env python3
# remove-th-vi.py - 删除 i18n.ts 中的 th: 和 vi: 翻译对象

import os

# 使用脚本所在目录来构造正确的文件路径
script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, '..', 'lib', 'i18n.ts')
file_path = os.path.normpath(file_path)

print(f'正在处理文件: {file_path}')

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 删除 th: { ... } 对象
# 使用非贪婪匹配到第一个独立的 "  }," 行
th_pattern = r'\n  th:\s*\{[\s\S]*?\n  \},\n'
content = re.sub(th_pattern, '\n', content)

# 删除 vi: { ... } 对象
# 匹配到 "  },\n};" 或 "  }\n};"
vi_pattern = r'\n  vi:\s*\{[\s\S]*?\n  \},\n\};\n'
content = re.sub(vi_pattern, '\n};\n', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ 已删除 th 和 vi 翻译对象')
