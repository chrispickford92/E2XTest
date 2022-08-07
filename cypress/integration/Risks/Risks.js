
import {
    Given,
    When,
    Then
  } from 'cypress-cucumber-preprocessor/steps';
  import {
    byName,
    byClass,
    byId,
  } from '../../../helpers/selectors';
  import commonStep from '../commonSteps/commonSteps';


  //Broker Cannot see peer reviews
  Given(/^a Broker User has logged in Quotech$/, () => {
      commonStep.loginBroker();

  });

  When(/^the Broker User Selects 'Risks'$/, () => {
    cy.contains('Risks').click()

});


And(/^Selects a Risk in the 'Risk List'$/, () => {
    cy.get(byClass('p-4')).contains('test').click()
    

});


Then(/^The User should not be able to see 'Peer Reviews'$/, () => {
  cy.contains('Peer Reviews').should('not.exist')
    

});


//Internal User can see peer reviews 
Given(/^an Internal User has logged in Quotech$/, () => {
  commonStep.loginInternal();

});

When(/^the Internal User Selects 'Risks'$/, () => {
cy.contains('Risks').click()

});


And(/^Selects a Risk in the 'Risk List'$/, () => {
cy.get(byClass('p-4')).contains('test').click()


});


Then(/^The User should be able to see 'Peer Reviews'$/, () => {
cy.contains('Peer Reviews').should('exist')
//cy.contains('Peer Reviews').should('not.exist')


});



// Scenario: Broker Users Cannot See Peer Reviews
// Given a Broker User has logged in Quotech 
// When the Broker User Selects 'Risks'
// And Selects a Risk in the 'Risk List'
// Then They should not be able to see 'Peer Reviews'