FROM cypress/included:6.2.0

RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev

RUN mkdir -p /opt/lambda
WORKDIR /opt/lambda

COPY index.js package.json package-lock.json cypress.json /opt/lambda/
RUN mkdir /opt/lambda/cypress
COPY cypress/integration /opt/lambda/cypress/integration/
COPY cypress/plugins /opt/lambda/cypress/plugins/

RUN npm ci

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
CMD ["index.handler"]
