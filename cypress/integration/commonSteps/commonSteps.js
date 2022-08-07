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
  cy.get(byId('countryCodeInput')).select('KY')
  cy.get(byId('firstNameInput')).type('Frank')
  cy.get(byId('lastNameInput')).type('Lampard')
  cy.get(byId('addressLine1Input')).type('123 Test Steet')
  cy.get(byId('cityInput')).type('Eastbourne')
  cy.get(byId('phoneInput')).type('01323568568')
  cy.get(byId('postCodeInput')).type('bn23 6jr')
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
  cy.get(byId('menu')).contains('Kitchen').click()
  cy.get(bydataTest('card-94')).contains('Add to Cart').click()
  cy.visit('https://cornerstone-light-demo.mybigcommerce.com/')

}

//Add five items from different pages as user
const addFive = () => {
  cy.visit('https://cornerstone-light-demo.mybigcommerce.com/')
  cy.get(byId('menu')).contains('Kitchen').click()
  cy.get(bydataTest('card-87')).contains('Add to Cart').click()
  // cy.get(byId('menu')).contains('Utility').click()
  // cy.get(bydataTest('card-100')).contains('Add to Cart').click()
  // cy.get(byId('menu')).contains('Kitchen').click()
  // cy.get(bydataTest('card-94')).contains('Add to Cart').click()
  // cy.get(byId('menu')).contains('Publications').click()
  // cy.get(bydataTest('card-111')).contains('Add to Cart').click()
  // cy.get(byId('menu')).contains('Utility').click()
  // cy.get(bydataTest('card-83')).contains('Add to Cart').click()
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


export default {
  addThree,
  addFive,
  randomEmail,
  cardDetails,
  shippingDetails
}