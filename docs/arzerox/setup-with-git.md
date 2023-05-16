# Setup with Git

## **Setup a README file**

> Note : You have to install Git before running those commands.

In order to push to GitHub, you need to setup an origin repo.

Firstly, we'll setup a README file. ( To create your README easier, you can go [here](https://stackedit.io/app) )This file will be used as a documentation for your bot. In order to do that open your command prompt and run

```sh
echo "# test" >> README.md
```

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
