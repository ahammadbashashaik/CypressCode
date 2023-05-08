/// <reference types="cypress" />

describe('Clinify login test suite', () => {
  beforeEach(() => {
    cy.visit('https://app.qa.clinify.health/')
    cy.origin('https://clinify-qa.us.auth0.com/', () => {
      cy.get('input#organizationName').type('clinify_health')
      cy.get("button[type='submit']").click()
      cy.get('#username').type('ahammad.basha.shaik@clinifyhealth.com')
      cy.get('#password').type('AHAcct@clinify2')
      cy.get("button[type='submit']").click()
      cy.wait(6000)
    })
  })

  it('Should verify login', () => {
    cy.get('svg#Layer_1').should('be.visible')
    cy.wait(4000)
    cy.xpath("//button[@data-cy='avatar-button'][1]/following-sibling::button[1]").click()
    cy.get("a[href='/admin']").invoke('removeAttr', 'target').click()
    cy.get("a[title='Payer']").click()

    cy.xpath("//tr/td").then(($body) => {
      
      if ($body.text().contains('PayerSample')) {
        
        cy.xpath("//td[text()='PayerSample']/following-sibling::td/div").scrollIntoView().click()
      } else {
        
        cy.get("button[title='Next page']").click()
      }

      //td[text()='PayerSample']/following-sibling::td/div
    })

  })


})
