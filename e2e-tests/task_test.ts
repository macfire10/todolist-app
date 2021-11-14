// @ts-ignore
const assert = require('assert');

Feature('task');

Before(({ I }) => {
  I.amOnPage('http://localhost:3000/')
});

Scenario('Load page, receive cookie', async ({ I }) => {
  const userTokenCookie = await I.getUserTokenCookie()

  assert(userTokenCookie !== undefined)
});

Scenario('Cookies are shared between reloads', async ({ I }) => {
  let savedCookie = await I.getUserTokenCookie()

  I.refreshPage()

  let cookieAfterReload = await I.getUserTokenCookie()

  assert(savedCookie && cookieAfterReload && savedCookie.value === cookieAfterReload.value)
});

Scenario('Can add Task', async ({ I }) => {
  I.createTask('A sample task')
  I.see('A sample task')
});

Scenario('Can add multiple tasks', async ({ I }) => {
  I.createTask('A sample task')
  I.createTask('Another task')

  I.see('A sample task')
  I.see('Another task')
});

Scenario('Can change Task Status', async ({ I }) => {
  I.createTask('A sample task')
  I.click('.MuiListItemSecondaryAction-root')
  I.click({ css: '[data-value=ON_HOLD]'})
  I.refreshPage()
  I.see('On Hold')
});

Scenario('Can change Task title and description', async ({ I }) => {
    I.createTask('A sample task')
    I.click('.MuiListItem-root')

    const inputTitle = locate({ css: '[aria-label="change title"]' }).find('input')
    I.click(inputTitle)
    I.fillField(inputTitle, 'Another Task')
    I.click({ css: 'svg[data-testid="CheckIcon"]' })

    const inputDesc = locate({ css: '[aria-label="change description"]' }).find('textarea')
    I.click(inputDesc)
    I.fillField(inputDesc, 'Sample description')
    I.click({ css: 'svg[data-testid="CheckIcon"]' })

    I.refreshPage()

    I.see('Another Task')
    I.see('Sample description')
});

Scenario('Can delete task', async ({ I }) => {
    I.createTask('A sample task')
    I.click('.MuiListItem-root')

    I.click({ css: '[aria-label="more"]' })
    
    const dropdownDelete = locate({ css: '[aria-labelledby="long-button"]' }).find('li')
    I.click(dropdownDelete)

    I.click('Delete')

    I.wait(1)

    I.dontSee('A sample task')

    I.refreshPage

    I.dontSee('A sample task')
});