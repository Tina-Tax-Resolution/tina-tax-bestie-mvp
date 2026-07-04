# Quick Deploy: GitHub + Render

Use this when you want the fastest path from this app folder to a phone-ready web link.

## Fastest Recommended Integration

Use **GitHub connected to Render**.

That is quicker than manually uploading zip files because:

- You push the app once to GitHub.
- Render reads the repository directly.
- Future changes can redeploy automatically.
- The included `render.yaml` can pre-fill most Render settings.

## Step 1: Put The App Files In GitHub

Upload the **unzipped files inside this folder**, not only the zip file.

Upload these files and folders:

```text
server.py
render.yaml
requirements.txt
Procfile
README.md
DEPLOY_TO_RENDER.md
QUICK_GITHUB_RENDER_DEPLOY.md
public/
.gitignore
```

Do **not** upload:

```text
data/
__pycache__/
*.sqlite3
*.pyc
```

Those are local/private runtime files.

## Step 2: Connect GitHub To Render

In Render:

1. Choose **New**.
2. Choose **Blueprint** if available.
3. Connect the GitHub repository.
4. Render should detect `render.yaml`.
5. Add the required password variable.
6. Deploy.

If Blueprint is not available, choose **New Web Service** instead.

## Manual Web Service Settings

Use these settings if Render asks:

```text
Runtime: Python
Build Command: python3 -m py_compile server.py
Start Command: HOST=0.0.0.0 python3 server.py
```

Add a persistent disk:

```text
Mount path: /var/data
Size: 1 GB
```

Add environment variables:

```text
DATA_DIR=/var/data
APP_USER=tina
APP_PASSWORD=<choose a strong private password>
```

Do not enter real client/taxpayer records until `APP_PASSWORD` is set.

## Phone Install

After Render gives you the HTTPS link:

1. Open the link on your phone.
2. Sign in with the username/password.
3. On iPhone Safari, tap **Share** then **Add to Home Screen**.
4. On Android Chrome, tap the browser menu then **Install app** or **Add to Home screen**.

## Quicker Option For Demo Only

For an incubator demo, the quickest clean path is:

1. GitHub repository with unzipped app files.
2. Render Blueprint or Web Service.
3. Set `APP_PASSWORD`.
4. Open the Render URL on your phone.

For a full production app with many client accounts, the next layer should be a real login system, client/advisor roles, secure file storage, and database backups.

## Compliance Note

This MVP is for educational and record-organization purposes only. It is not legal, tax, accounting, or Circular 230 written tax advice. Users should consult a qualified tax professional before filing or taking any tax position.
