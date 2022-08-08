import {
  Given,
  When,
  Then
} from 'cypress-cucumber-preprocessor/steps';
import {
  byName,
  byClass,
  byId,
  byproductId,
  bydataTest,
} from '../../../helpers/selectors';
import commonStep from '../commonSteps/commonSteps';

// Scenario: A User can search for a product, add it to their basket and complete their purchase
Given(/^the user is on the homepage$/, () => {
  cy.visit('https://cornerstone-light-demo.mybigcommerce.com/')
  cy.url().should('include', 'https://cornerstone-light-demo.mybigcommerce.com/')

});

And(/^the User searches for a product$/, () => {
  cy.get(byId('quick-search-expand')).click()
  cy.get(byId('nav-quick-search')).type('Feather Duster')

});

When(/^the User adds the product to the cart and proceeds to the check out$/, () => {
  cy.intercept({ //Added intercept as test would sporadically not GET product and fail. This ensure the page has time to load.
    method: 'GET', 
    url: 'https://cornerstone-light-demo.mybigcommerce.com/search.php**',
  }).as('awaitProduct');
  // Wait for response.status to be 200
  cy.wait('@awaitProduct').its('response.statusCode').should('equal', 200)
  cy.get(bydataTest('card-106')).contains('Add to Cart').click()
  cy.url().should('include', 'https://cornerstone-light-demo.mybigcommerce.com/cart')
 
  cy.get(byClass('cart-list')).should('contain', 'Feather Duster')
  cy.url().should('include', 'https://cornerstone-light-demo.mybigcommerce.com/cart')
  cy.get(byClass('countPill cart-quantity countPill--positive')).should('contain', '1')
  cy.get(byClass('button button--primary')).contains('Check out').click()

});

Then(/^the User can successfully complete their purchase$/, () => {
  cy.get(byId('email')).type(commonStep.randomEmail() + '@hotmail.com') //get random email from common steps
  //find the correct checkbox by span and finding the parent element containing the check box to ensure the correct choice is selected.
  cy.get(byClass('form-field')).contains('Yes, I agree with the')
    .parentsUntil('form-checkbox optimizedCheckout-form-checkbox')
    .find(byName('privacyPolicy'))
    .check({
      force: true //force true as cypress had trouble fining the check box.
    });
  cy.get(byId('checkout-customer-continue')).click()
  commonStep.shippingDetails()
  commonStep.cardDetails()
  cy.get(byId('checkout-payment-continue')).click()

  commonStep.awaitConfirmation()  
  cy.url().should('include', '/checkout/order-confirmation') //Verify URL
  cy.get(bydataTest('order-confirmation-heading')).contains('Thank you Frank!') 

});


//Scenario: Purchase an item from cornerstone light as a guest
Given(/^the user is on the homepage$/, () => {
  cy.visit('https://cornerstone-light-demo.mybigcommerce.com/')
  cy.url().should('include', 'https://cornerstone-light-demo.mybigcommerce.com/')

});



And(/^the user adds a product to their basket$/, () => {
  cy.get(byproductId('103')).click()
  cy.get(byId('form-action-addToCart')).click()
  cy.get(byClass('modal-header-title')).should('include.text', 'Ok, 1 item was added to your cart. What\'s next')


});


When(/^the User selects 'Checkout'$/, () => {
  cy.get(byClass('button button--primary')).contains('Proceed to checkout').click()
});

And(/^Selects continue as guest$/, () => {
  cy.get(byId('email')).type(commonStep.randomEmail() + 'testing1234@hotmail.com') 
  cy.get(byClass('form-field')).contains('Yes, I agree with the')
    .parentsUntil('form-checkbox optimizedCheckout-form-checkbox')
    .find(byName('privacyPolicy'))
    .check({
      force: true
    });
  cy.get(byId('checkout-customer-continue')).click()
});


And(/^enters valid shipping and credit card information$/, () => {
  //Would prefer to take this data from CSV or scenario outline at the very least.
  commonStep.shippingDetails()
  commonStep.cardDetails()
  
});


And(/^Selects places their order$/, () => {
  cy.get(byId('checkout-payment-continue')).click()
});

Then(/^the User should get confirmation their order has been placed successfully$/, () => {
  cy.url().should('include', '/checkout/order-confirmation')
  cy.get(bydataTest('order-confirmation-heading')).contains('Thank you Frank!')
});

//Scenario: Purchase an item from cornerstone light and sign up as a new user
Given(/^the User have several items in their basket$/, () => {
  commonStep.addFive()

});

And(/^the User Views cart and the User selects 'Checkout'$/, () => {
 
  cy.intercept({ //Added intercept as test would sporadically not GET product and fail. This ensure the page has time to load.
    method: 'GET', 
    url: ' https://cornerstone-light-demo.mybigcommerce.com/api/storefront/cart-summary',
  }).as('awaitSummary');
  // Wait for response.status to be 200
  cy.wait('@awaitSummary').its('response.statusCode').should('equal', 200)

  cy.get(byClass('navUser-item-cartLabel')).click()
  cy.get(byClass('previewCartAction-checkout')).click()

});

And(/^Creates a new account$/, () => {
  cy.get(byId('checkout-customer-login')).click()
  cy.get(byId('checkout-customer-returning')).contains('Create an account').click()
  cy.get(byId('firstName')).type('Jermain')
    .wait(100) //Cypress sporadically going to quick to read last name click event. 
  cy.get(byId('lastName')).type('Jenas')
  cy.get(byId('email')).type(commonStep.randomEmail() + '@hotmail.com')
  cy.get(byId('password')).type('ChangeMe123!!!')
  cy.get(byId('checkout-customer-create')).click()
});

When(/^the User enters valid shipping and credit card information$/, () => {
  commonStep.shippingDetails()
  cy.get(byClass('cart-priceItem optimizedCheckout-contentPrimary')).should('contain', '$50.00')
  commonStep.cardDetails()

});

And(/^Places their order$/, () => {
  cy.get(byId('checkout-payment-continue')).click()

});

Then(/^the User's order is confirmed$/, () => {
  commonStep.awaitConfirmation()
  cy.url().should('include', '/checkout/order-confirmation')
  cy.get(bydataTest('order-confirmation-heading')).contains('Thank you Frank!')

});