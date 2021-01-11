const cypress = require('cypress')

exports.handler = async (event, context) => {
  console.log('Running Cypress with dev/shm disabled ...')
  return cypress
    .run({
      spec: '/opt/lambda/cypress/integration/bulb.js',
			browser: 'chrome',
      config: {
        video: false,
      },
      record: false,
    })
    .then(results => {
      console.log(results)
      context.done(null, results)
    })
    .catch(err => {
      console.error(err)
      context.done(err)
    })
}
