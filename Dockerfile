FROM cypress/included:6.2.1

RUN mkdir -p /opt/lambda
WORKDIR /opt/lambda

COPY package.json package-lock.json cypress.json /opt/lambda/
RUN mkdir /opt/lambda/cypress
COPY cypress/integration /opt/lambda/cypress/integration/
COPY cypress/plugins /opt/lambda/cypress/plugins/

RUN npm ci

ENTRYPOINT ["/usr/local/bin/npx"]
CMD ["cypress", "run", "--browser", "chrome"]
