import { test, expect } from '@playwright/test';

var userid;

test('GET', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2')
    console.log(await response.json())
    expect(response.status()).toBe(200)

  });

  test('POST', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users?page=2',
        {
            data:{"name":"Luq","job":"Global tester"},
            header:{"Accept":"application/json"}
        }
    );

    console.log(await response.json())
    expect(response.status()).toBe(201)

    var res = await response.json()
    userid = res.id
  });

  test('PUT', async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/'+userid,
        {
            data:{"name":"Luq","job":"Global testesssst yay"},
            header:{"Accept":"application/json"}
        }
    );

    console.log(await response.json())
    expect(response.status()).toBe(200)

    var res = await response.json()
    userid = res.id

  });
  test.only('DELETE', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/'+userid)

    
    expect(response.status()).toBe(204)
    

  });