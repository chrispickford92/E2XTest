Feature: Completeing full purchase
Background: As a user I should be able to search and add multiple items to my basket and complete the checkout process both as a guest and a current user.


 
Scenario: A User can search for a product, add it to their basket and complete their purchase
Given the user is on the homepage 
And the User searches for a product
When the User adds the product to the cart and proceeds to the check out 
Then the User can successfully complete their purchase


Scenario: Purchase an item from cornerstone light as a guest
Given the user is on the homepage 
And the user adds a product to their basket 
When the User selects 'Checkout'
And Selects continue as guest
And enters valid shipping and credit card information
And Selects places their order 
Then the User should get confirmation their order has been placed successfully

Scenario: Purchase an item from cornerstone light and sign up as a new user
 Given the User have several items in their basket 
 And the User Views cart and the User selects 'Checkout'
 And Creates a new account
 When the User enters valid shipping and credit card information
 And Places their order
 Then the User's order is confirmed 
