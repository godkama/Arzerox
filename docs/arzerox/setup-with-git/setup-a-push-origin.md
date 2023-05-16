# Setup a Push Origin

## **Setup a Push Origin**

Then, we'll setup the push origin, which will permit us to add the edited code directly to GitHub using a simple command.

Open your command prompt and run these few commands.

```bash
git init
git add README.md
git commit -m "First Commit"
git branch -M main
git remote add origin https://github.com/username/reponame.git
```



By doing this action, you just put an origin to push to. You might need to log into your GitHub account in your command prompt. Just enter what the command prompt asks, and you will have the access to push.
