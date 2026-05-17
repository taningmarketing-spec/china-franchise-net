import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    'http://124.156.140.166/zh/brand/taning-lemon-tea',
    'https://www.cnfranchise.com/zh/brand/taning-lemon-tea',
]

for url in urls:
    try:
        req = urllib.request.urlopen(url, timeout=10, context=ctx)
        status = req.getcode()
        content = req.read().decode('utf-8', errors='replace')
        # Check if brand story appears in content
        has_story = '手打柠檬茶发明者' in content or '广州江南新地' in content
        print(f'{url}: HTTP {status} | Content length: {len(content)} | Has brand content: {has_story}')
    except Exception as e:
        print(f'{url}: ERROR - {e}')
