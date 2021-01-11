# Can I have a smart meter yet?

A bot that periodically logs in to the Bulb website as me and checks the smart
meter installation availability page. It tweets me if it can't find the "There
aren't any appointments available" message.

## How it works

It runs Cypress in an AWS Lambda function on an hourly schedule.

The Lambda artifact is a Docker image, based on the official Cypress image.

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

## Running in Docker

First install the AWS Lambda RIE (Runtime Interface Emulator) if you haven't already:

```
mkdir -p ~/.aws-lambda-rie && \
    curl -Lo ~/.aws-lambda-rie/aws-lambda-rie
    https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie
    && \
        chmod +x ~/.aws-lambda-rie/aws-lambda-rie
```

Then build the image and start a container:

```
docker-compose up
```

Once the container is running, invoke the Lambda:

```
curl http://localhost:9000/2015-03-31/functions/function/invocations -d '{}'
```
