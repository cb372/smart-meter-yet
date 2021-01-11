const Twitter = require('twitter-lite')
const twitter = new Twitter({
  consumer_key: Cypress.env('TWITTER_CONSUMER_KEY'),
  consumer_secret: Cypress.env('TWITTER_CONSUMER_SECRET'),
  access_token_key: Cypress.env('TWITTER_ACCESS_TOKEN_KEY'),
  access_token_secret: Cypress.env('TWITTER_ACCESS_TOKEN_SECRET')
})
const twitterUpload = new Twitter({
  subdomain: 'upload',
  consumer_key: Cypress.env('TWITTER_CONSUMER_KEY'),
  consumer_secret: Cypress.env('TWITTER_CONSUMER_SECRET'),
  access_token_key: Cypress.env('TWITTER_ACCESS_TOKEN_KEY'),
  access_token_secret: Cypress.env('TWITTER_ACCESS_TOKEN_SECRET')
})

async function uploadMedia(dataBase64) {
  return twitterUpload.post('media/upload', { media_data: dataBase64, media_category: 'tweet_image' })
    .then(response => {
      return response.media_id_string
    })
}

async function tweet(message, screenshotBase64) {
  uploadMedia(screenshotBase64)
    .then((mediaId) => {
      return twitter.post('statuses/update', { status: `${message} (${Date.now()})`, media_ids: mediaId })
    })
}

function cypressify(promise) {
  return new Cypress.Promise((resolve, reject) => {
    promise
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

describe('foo', () => {
  it('bar', () => {
    cy.visit('https://account.bulb.co.uk/dashboard/smart/install')
    cy.get('[data-test=member-email]').type(Cypress.env('BULB_EMAIL'))
    cy.get('[data-test=member-use-password]').click()
    cy.get('[data-test=member-password]').type(Cypress.env('BULB_PASSWORD'))
    cy.get('[data-test=member-sign-in]').click()
    cy.url().should('include', 'dashboard/smart')
    cy.get('h1').then(($elem) => {
      cy.screenshot('bulb')
      return cy.readFile('cypress/screenshots/bulb.js/bulb.png', 'base64').then((screenshot) => {
        const headingText = $elem.text()
        cy.log(headingText)
        if (headingText.indexOf("aren't any appointments available") < 0) {
          return tweet('@cbirchall Maybe?', screenshot)
        } else {
          return tweet('Nope.', screenshot)
        }
      })
    })
    cy.log("Waiting a few seconds for tweeting to complete because I don't understand Cypress promises properly")
    cy.wait(3000)
    cy.log("Done")
  })
})
