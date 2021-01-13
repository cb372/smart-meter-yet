# Can I have a smart meter yet?

A bot that periodically logs in to the Bulb website as me and checks the smart
meter installation availability page. It tweets me if it can't find the "There
aren't any appointments available" message.

## How it works

It runs Cypress in a Fargate task on an hourly schedule.

## Environment variables

Stick these in a file called `.env`:

```
export CYPRESS_BULB_EMAIL=...
export CYPRESS_BULB_PASSWORD=...
export CYPRESS_TWITTER_CONSUMER_KEY=...
export CYPRESS_TWITTER_CONSUMER_SECRET=...
export CYPRESS_TWITTER_ACCESS_TOKEN_KEY=...
export CYPRESS_TWITTER_ACCESS_TOKEN_SECRET=...
```

and source it when needed:

```
. ./.env
```

## Development setup

```
npm install
```

## Running Cypress locally

```
npx cypress open
```

## Deploying a new version

```
docker build . -t ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/smart-meter-yet:latest
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/smart-meter-yet:latest
```
