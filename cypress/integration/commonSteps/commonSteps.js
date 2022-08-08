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
  bydataTest
} from '../../../helpers/selectors';

//Adds Shipping details for a specific user
const shippingDetails = () => {
  cy.url().should('include', 'https://cornerstone-light-demo.mybigcommerce.com/checkout')
  
  cy.get(byId('countryCodeInput')).select('KY')
  cy.get(byId('firstNameInput')).type('Frank')
  cy.get(byId('lastNameInput')).type('Lampard')
  cy.get(byId('addressLine1Input')).type('123 Test Steet')
  cy.get(byId('cityInput')).type('Eastbourne')
  cy.get(byId('phoneInput')).type('01323568568')
  cy.get(byId('postCodeInput')).type('bn23 6jr')
  // Give an alias to request
cy.intercept({
  method: 'PUT', 
  url: 'https://cornerstone-light-demo.mybigcommerce.com/api/storefront/checkouts/**',
}).as('dataPUTFirst');
// Wait for response.status to be 200
cy.wait('@dataPUTFirst').its('response.statusCode').should('equal', 200)
  cy.get(byId('checkout-shipping-continue')).click()


}
//Add's card details for specific user
const cardDetails = () => {
  cy.get(byId('ccNumber')).type('4111 1111 1111 1111')
  cy.get(byId('ccExpiry')).type('01/25')
  cy.get(byId('ccName')).type('MR BUYS A LOT')
  cy.get(byId('ccCvv')).type('123')

}

//Add three items from different pages as user
const addThree = () => {
  cy.visit('https://cornerstone-light-demo.mybigcommerce.com/')
  cy.get(byId('menu')).contains('Kitchen').click()
  cy.get(bydataTest('card-87')).contains('Add to Cart').click()
  cy.get(byId('menu')).contains('Utility').click()
  cy.get(bydataTest('card-100')).contains('Add to Cart').click()
  cy.request('https://cornerstone-light-demo.mybigcommerce.com/cart.php?action=add&product_id=105') //add directly via API call
  cy.visit('https://cornerstone-light-demo.mybigcommerce.com/')

}



//Add five items from different pages as user
const addFive = () => {
  cy.visit('https://cornerstone-light-demo.mybigcommerce.com/')
  cy.get(byId('menu')).contains('Kitchen').click()
  cy.get(bydataTest('card-87')).contains('Add to Cart').click()
  cy.get(byId('menu')).contains('Utility').click()
  cy.get(bydataTest('card-100')).contains('Add to Cart').click()
  cy.get(byId('menu')).contains('Kitchen').click()
  cy.get(bydataTest('card-94')).contains('Add to Cart').click()
  cy.get(byId('menu')).contains('Publications').click()
  cy.get(bydataTest('card-111')).contains('Add to Cart').click()
  cy.get(byId('menu')).contains('Utility').click()
  cy.get(bydataTest('card-83')).contains('Add to Cart').click()
  
  cy.visit('https://cornerstone-light-demo.mybigcommerce.com/')



}

const randomEmail = () => {
  /*generate random sting to ensure new email address after every test*/
  var Email = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    Email += possible.charAt(Math.floor(Math.random() * possible.length));
  console.log(Email)
  return Email


}

const awaitConfirmation = () => {
  /*Await store front confirmation page that the order has been completed successfully*/
  cy.intercept({
    method: 'POST', 
    url: 'https://cornerstone-light-demo.mybigcommerce.com/internalapi/v1/checkout/order',
  }).as('awaitConfirmation');
  // Wait for response.status to be 200
  cy.wait('@awaitConfirmation').its('response.statusCode').should('equal', 201)


}


export default {
  addThree,
  addFive,
  randomEmail,
  cardDetails,
  shippingDetails,
  awaitConfirmation
}