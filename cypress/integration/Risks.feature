@Risks
Feature: Completeing full purchase
Background: As a user I should be able to add multiple items to my basket and complete the checkout process both as a guest and a current user.

Given I have a product in my cart
When I complete the checkout process
Then I am presented with a purchase confirmation page for my order



Scenario: Purchase an item from cornerstone light as a guest
Given the user is on the homepage 
And the user adds a product to their basket 
And is navigated to their basket
When the User selects 'Checkout'
And Selects continue as guest
And enters valid shipping and credit card information

Scenario: Purchase an item from cornerstone light and sign up as a new user
Given the user is on the landing page 
And the user adds a product to their basket 
And is navigated to their basket
When the User selects 'Checkout'
And Selects continue as guest

Scenario: Purchase an item from cornerstone light as a current User
Given the user is on the landing page 
And the user adds a product to their basket 
And is navigated to their basket
When the User selects 'Checkout'
And Selects continue as guest





# We would like you to undertake a simple automation technical exercise for review at a "face to face" interview.


# Using cypress or selenium, a language of your choice, JavaScript, Ruby or Java preferred, and cucumber, from scratch, please build an automated test that:

# 1 - Goes to https://cornerstone-light-demo.mybigcommerce.com

# 2 - Searches for a product

# 3 - Adds that product to the cart

# 4 - Completes the checkout process

# - Use the test credit card number: 4111 1111 1111 1111 and any valid expiry date and CCV


# Example requirement:

# Given I have a product in my cart

# When I complete the checkout process

# Then I am presented with a purchase confirmation page for my order


# Please write the test, ensure that it works and come to the face to face review, prepared to:

# - execute the test and review the results

# - discuss your general approach

# - use of classes and methods - page object model

# - any assertions made along the way and why

# - any necessary logic in the code to wait for an event or to drive the test flow


# Please send us a link to the solution in github when complete.

