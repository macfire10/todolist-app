// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({
    getUserTokenCookie: async function () {
      const cookie = await this.usePlaywrightTo('check cookie', async ({ browserContext }) => {
        const cookies = await browserContext.cookies()
        
        let userTokenCookie = cookies.find((cookie) => {
          return cookie.name === 'user-token'
        })
        
        return userTokenCookie
      });

      return cookie
    },
    createTask: async function(taskName) {
      this.fillField('add task', taskName);
      this.click('Add');
      this.waitForElement('.MuiListItem-root', 30);
    }
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

  });
}
