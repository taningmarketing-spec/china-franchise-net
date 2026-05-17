import urllib.request, ssl, sys, time
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ctx = ssl.create_default_context()

print("Testing https://www.cnfranchise.com ...")
try:
    req = urllib.request.urlopen('https://www.cnfranchise.com', timeout=15, context=ctx)
    print(f"SUCCESS! Status: {req.status}")
    print(f"URL: {req.url}")
    print(f"Server: {req.headers.get('Server')}")
except Exception as e:
    print(f"FAILED: {e}")

print("\nTesting http://www.cnfranchise.com ...")
try:
    req = urllib.request.urlopen('http://www.cnfranchise.com', timeout=10)
    print(f"Status: {req.status}, Final URL: {req.url}")
except Exception as e:
    print(f"Result: {e}")
