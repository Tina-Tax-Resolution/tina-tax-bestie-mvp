# Deploy Tina Your Tax Bestie MVP To Render

This folder is ready to deploy as a Render web service.

## Recommended Render Setup

Use Render for the first phone-ready MVP because this app already has:

- `server.py` Python backend
- SQLite database support
- `render.yaml` blueprint
- `Procfile`
- PWA/mobile install files

## Important Security Note

This build opens without a username/password pop-up so it is easier to demo. Do not enter sensitive taxpayer/client records until a real account/login system is added.

Render environment variables for durable saved records:

```text
DATA_DIR=/var/data
```

If you are using Render free/no-disk mode only for a temporary demo, either remove `DATA_DIR` or set it to:

```text
DATA_DIR=/tmp/tytb-profit-motive-data
```

Free/no-disk storage is temporary. Records may reset when the service restarts or redeploys.

## Render Blueprint Option

1. Put this folder in a GitHub repository.
2. In Render, choose **New** then **Blueprint**.
3. Connect the GitHub repository.
4. Render should detect `render.yaml`.
5. Deploy.

## Manual Render Web Service Option

1. Create a new Render **Web Service**.
2. Connect the GitHub repository.
3. Use these settings:

```text
Runtime: Python
Build Command: PYTHONPYCACHEPREFIX=/tmp python3 -m py_compile server.py
Start Command: PYTHONPYCACHEPREFIX=/tmp HOST=0.0.0.0 python3 server.py
```

4. Add a persistent disk:

```text
Mount path: /var/data
Size: 1 GB
```

5. Add environment variables:

```text
DATA_DIR=/var/data
```

6. Deploy.

## Phone Install

After Render gives you an HTTPS link:

1. Open the Render app link on your phone.
2. On iPhone Safari, tap Share then **Add to Home Screen**.
3. On Android Chrome, tap the browser menu then **Add to Home screen** or **Install app**.

## Cost Note

The app can be tested cheaply, but saved data needs persistent storage. Render may charge a small amount for persistent disk and non-free compute depending on the plan selected. Check Render pricing before entering live records.

## Educational Disclaimer

This app is for educational and record-organization purposes only. It is not legal, tax, accounting, or Circular 230 written tax advice. Users should consult a qualified tax professional before filing or taking any tax position.
