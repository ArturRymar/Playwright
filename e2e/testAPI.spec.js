import { test, expect } from '@playwright/test';
import GaragePage from './Helpers/Page Objects/Garage Page';

let garagePage;
let logedInContextPage;

test.describe('API suite', () => {
  test.beforeEach(async ({ request, browser }) => {
    const response = await request.post('api/auth/signin', {
      data: {
        email: 'arturauto@gmail.com',
        password: 'Qwerty25',
        remember: false,
      },
    });
    const token = response.headers()['set-cookie'].split('=')[1].split(';')[0];

    const context = await browser.newContext();
    await context.addCookies([
      {
        name: 'sid',
        value: token,
        domain: '.forstudy.space',
        path: '/',
      },
    ]);

    logedInContextPage = await context.newPage();
  });

  test('Garage page is opened after login via API', async () => {
    await logedInContextPage.goto('panel/garage');
    garagePage = new GaragePage(logedInContextPage);
    await expect(garagePage.openAddCarModalButton).toBeVisible();
  });

  test('Car can be created via API', async ({ request }) => {
    await request.post('api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
      },
    });
  });

  test('Car can`t be created via API without miliage', async ({ request }) => {
    const response = await request.post('api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
      },
    });
    expect(response.status()).toEqual(400);
    const responseJson = await response.json();
    expect(responseJson.message).toEqual('Mileage is required');
  });

  test('Car can`t be created via API with invalid miliage', async ({
    request,
  }) => {
    const response = await request.post('api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: -1,
      },
    });
    expect(response.status()).toEqual(400);
    expect(response.statusText()).toEqual('Bad Request');
    const responseJson = await response.json();
    expect(responseJson.message).toEqual('Mileage has to be from 0 to 999999');
  });

  test('Created cars can be deleted', async ({ request }) => {
    const getCarsResponse = await request.get('api/cars');
    const cars = await getCarsResponse.json();
    let carsList = cars.data;
    let carsIdsList = carsList.map((car) => {
      return car.id;
    });

    for (const id of carsIdsList) {
      const deleteCarsResponse = await request.delete(`api/cars/${id}`);
      expect(deleteCarsResponse.status()).toEqual(200);
    }
  });

  test('Mock example', async () => {
    await logedInContextPage.route('api/users/profile', async (route) => {
      await route.fulfill({
        body: JSON.stringify({
          status: 200,
          contentType: 'application/json',
          data: {
            photoFilename: 'default-user.png',
            name: 'Mocked name',
            lastName: 'Mocked lastName',
          },
        }),
      });
    });

    await logedInContextPage.goto('panel/profile');
    await expect(
      logedInContextPage.locator('.profile_name.display-4')
    ).toHaveText('Mocked name Mocked lastName');
  });
});
