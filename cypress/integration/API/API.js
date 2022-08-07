

When(/^Do Test$/, () => {
cy.request({
    method: 'POST',
    url: 'https://test.quotech.io/auth/oauth2/token',
    body: {
      grant_type: 'Authorization_Code',
      client_id: ('quotech-test'),
      client_secret: ('2gz4m9RVPprIcGKpH79jfHIdZdjwdDcPmR8o9oA5qKam3Rgw5HhMH6ioLYdDsDX0'),
      refresh_token: ('googleRefreshToken'),
      
    }})
})


When(/^Do Test$/, () => {
    cy.request({
        method: 'POST',
        url: 'https://test.quotech.io/auth/oauth2/token',
        body: {
          grant_type: 'Authorization_Code',
          client_id: ('quotech-test'),
          client_secret: ('2gz4m9RVPprIcGKpH79jfHIdZdjwdDcPmR8o9oA5qKam3Rgw5HhMH6ioLYdDsDX0'),
          refresh_token: ('googleRefreshToken'),
          
        }})
    })