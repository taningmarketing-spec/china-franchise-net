import paramiko, sys, time, urllib.request, ssl
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Test HTTPS from local machine
print("=== Testing HTTPS from local machine ===")
try:
    ctx = ssl.create_default_context()
    req = urllib.request.urlopen('https://www.cnfranchise.com', timeout=10, context=ctx)
    print(f"Status: {req.status} OK!")
    print(f"Server: {req.headers.get('Server')}")
    print(f"Content-Type: {req.headers.get('Content-Type')}")
except Exception as e:
    print(f"Error: {e}")

# Also test HTTP -> HTTPS redirect
print("\n=== Testing HTTP redirect ===")
try:
    req = urllib.request.urlopen('http://www.cnfranchise.com', timeout=10)
    print(f"HTTP Status: {req.status}")
    print(f"Final URL: {req.url}")
except Exception as e:
    print(f"Error: {e}")

# Check PM2 status via SSH
print("\n=== PM2 Status ===")
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)
stdin, stdout, stderr = client.exec_command('pm2 list 2>&1')
print(stdout.read().decode())
client.close()
