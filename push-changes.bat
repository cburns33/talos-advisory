@echo off
REM A script to add, commit, and push changes to the main branch.
REM Usage: push-changes.bat "Your commit message here"

REM Check if a commit message was provided.
IF "%~1"=="" (
    echo ERROR: Please provide a commit message in quotes.
    echo Usage: push-changes.bat "Your commit message here"
    exit /b 1
)

REM Stage all changes
echo Staging all changes...
git add .

REM Commit the changes with the provided message
echo Committing changes...
git commit -m "%~1"

REM Push the changes to the main branch on GitHub
echo Pushing to GitHub...
git push origin main

echo.
echo Done!
