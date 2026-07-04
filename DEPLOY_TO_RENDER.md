# Deploy Tina Your Tax Bestie MVP To Render

This folder is ready to deploy as a Render web service.

## Recommended Render Setup

Use Render for the first phone-ready MVP because this app already has:

- `server.py` Python backend
- SQLite database support
- `render.yaml` blueprint
- `Procfile`
- PWA/mobile install files

## Important Security Step

Do not enter real taxpayer/client records unless `APP_PASSWORD` is set.

Render environment variables:

```text
DATA_DIR=/var/data
APP_USER=tina
APP_PASSWORD=<choose a strong private password>
```

When the app opens, the browser will ask for:

```text
Username: tina
Password: the value you set for APP_PASSWORD
```

## Render Blueprint Option

1. Put this folder in a GitHub repository.
2. In Render, choose **New** then **Blueprint**.
3. Connect the GitHub repository.
4. Render should detect `render.yaml`.
5. Set `APP_PASSWORD` when prompted.
6. Deploy.

## Manual Render Web Service Option

1. Create a new Render **Web Service**.
2. Connect the GitHub repository.
3. Use these settings:

```text
Runtime: Python
Build Command: python3 -m py_compile server.py
Start Command: HOST=0.0.0.0 python3 server.py
```

4. Add a persistent disk:

```text
Mount path: /var/data
Size: 1 GB
```

5. Add environment variables:

```text
DATA_DIR=/var/data
APP_USER=tina
APP_PASSWORD=<choose a strong private password>
```

6. Deploy.

## Phone Install

After Render gives you an HTTPS link:

1. Open the Render app link on your phone.
2. Sign in with the app username/password.
3. On iPhone Safari, tap Share then **Add to Home Screen**.
4. On Android Chrome, tap the browser menu then **Add to Home screen** or **Install app**.

## Cost Note

The app can be tested cheaply, but saved data needs persistent storage. Render may charge a small amount for persistent disk and non-free compute depending on the plan selected. Check Render pricing before entering live records.

## Educational Disclaimer

This app is for educational and record-organization purposes only. It is not legal, tax, accounting, or Circular 230 written tax advice. Users should consult a qualified tax professional before filing or taking any tax position.
