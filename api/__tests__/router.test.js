
'use strict';

const supertest = require('supertest')
const {app} = require('../server.js');

const request = supertest(app);


// ROUTE tests and Error tests start here //
describe('testing routes', () => {
//93
    const user1 = {
        username:'abla',
        email:'abla@gmail.com',
        password:'1234'
    };
  //92
    const body1 = {
      email:'ola@gmail.com',
      password:'1234'
  };

  const update = {
    userId:"92",
    desc:"batoll desc updated "
};



const follow  = {
 
  userId:"92"

}
  

const deletebody  = {
 
    userId:"92"

}

    // Test POST/signup request
    test('testing POST request to create a new user', async () => {
     console.log('insiiiiide test ');
      let response = await request.post('/api/auth/register').send(user1);
  
      console.log('this is the response.body, ', response.body);
  
      expect(response.status).toEqual(200);
      expect(response.body.username).toEqual('abla')
      expect(typeof (response.body.password)).toEqual('string');
      expect(typeof (response.body.email)).toEqual('string');
    });
  
  
    // Test /signin
    test('can signin', async () => {
  
      const response = await request.post('/api/auth/login').send(body1);
  
     
      // console.log('this is the response.body ',response.body );
  
  
      expect(response.status).toBe(200);
      
      expect(response.body.username).toBeDefined();
      expect(body1.email).toEqual(response.body.email);
  
    });

    
  
  
  
//     test('can GET and POST to /api/v2/customers associated with a sales person', async () => {
//       // this POSTs a customers associated with a sales person
//       const newCustomers = await request.post('/api/v2/customers')
//         .auth(testUser.token, { type: 'bearer' })
//         .send(testCustomer);
  
//       const newCustomers2 = await request.post('/api/v2/customers')
//         .auth(testUser.token, { type: 'bearer' })
//         .send(testCustomer2);
  
  
//       console.log('😎 newCustomers', newCustomers.body, newCustomers2.body);
  
//       //this is getting all accounts associated with salesPerson id: 1
//       const response = await request.get('/api/v2/customers/1').auth(testUser.token, { type: 'bearer' });
  
//       console.log('all customers for salesperson 1:', response.body);
  
  
//       expect(response.status).toBe(200);
//       expect(response.body[0].id).toEqual(1);
//       expect(response.body[0].salesPerson).toEqual(1);
//       expect(response.body[0].name).toEqual('testCustomer');
//       expect(response.body[0].jobTitle).toEqual('VP of Perrier');
  
//     });
  
  
//     // tests a GET to a SINGLE customer by route
//     test('can GET to /:model/:salespersonid/:customerid', async () => {
//       const response = await request.get('/api/v2/customers/1/1').auth(testUser.token, { type: 'bearer' });
  
//       expect(response.body.name).toEqual('testCustomer');
//     });
  

  //get by id ... read by id//
  it('should get user by id  ', async () => {
    const response = await request.get('/api/users/92');

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });
 
    //PUT request, updates user
    test('can update an existing user', async () => {
  
  
      const response = await request.put('/api/users/92').send(update);
  
      expect(update.userId).toEqual('92')
      console.log(response);
      expect(response.status).toBe(200);
      expect(response.body).toEqual("Account has been updated");
  
    });

 //follow users  //
 it('follow users ', async () => {
  const response = await request.put('/api/users/92/follow').send(follow);
  expect(follow.userId).toEqual('92');
  expect(response.status).toEqual(403);
  expect(response.body).toBeDefined();
  expect(response.body).toEqual("you cant follow yourself");
});

//unfollow users  //
it('unfollow users ', async () => {
  const response = await request.put('/api/users/7/unfollow').send(follow);
  expect(follow.userId).toEqual('92');
  expect(response.status).toEqual(403);
  expect(response.body).toBeDefined();
  expect(response.body).toEqual("you cant follow yourself");
});



//get user friends  //
it('follow users ', async () => {
  const response = await request.put('/api/users/7/unfollow').send(follow);
  expect(follow.userId).toEqual('92');
  expect(response.status).toEqual(403);
  expect(response.body).toBeDefined();
  expect(response.body).toEqual("you cant follow yourself");
});


  
    // DELETE, deletes user
    test('can DELETE an existing user', async () => {
      let response = await request.delete('/api/users/92').send(deletebody)
        
      expect(deletebody.userId).toEqual("92")
      console.log(' response body for delete:', response.body);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual("Account has been deleted");
     
    });
  



  
  
//     // === === 404 on a bad route === === //
//     test('Testing 404 on a bad route', async () => {
//       const response = await request.get('/badroute');
  
//       expect(response.status).toEqual(404);
//     });
  
  
//     // === === 404 on a bad method === === //
//     test('Testing 404 on a bad method', async () => {
//       const response = await request.put('/customer');
  
//       expect(response.status).toEqual(404);
//     });
  
  
//     // === === 500 if accessing users without being logged in === === //
//     test('500 if accessing users without being logged in', async () => {
//       const response = await request.get('/users');
  
//       expect(response.status).toEqual(500);
//     });
  
  
//     // === === 500 if accessing customers without being logged in === === //
//     test('500 if accessing customers without being logged in', async () => {
//       const response = await request.get('/api/v2/customers');
  
//       expect(response.status).toEqual(500);
//     });
  
//   });
  
//   describe('testing socket.io', () => {
    
//     beforeEach((done) => {
//       socket = ioClient.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
//         'reconnection delay': 0,
//         'reopen delay': 0,
//         'force new connection': true,
//         transports: ['websocket'],
//       });
//       socket.on('connect', () => {
//         done();
//       })
//     })
  
//     test('should connect and communicate', (done) => {
//       ioServer.emit('echo', 'Hello from ioServer');
//       socket.once('echo', (res) => {
//         expect(res).toBe('Hello from ioServer');
//         done();
//       });
//       ioServer.on('connection', (mySocket) => {
//         expect(mySocket).toBeDefined();
//       })
//     });
  
//     test('should communicate with waiting for socket.io handshakes', (done) => {
//       socket.emit('example', 'some messages');
//       setTimeout((message) => {
//         ioServer.on('connection', (mySocket) => {
//           expect(mySocket).toBeDefined();
//         })
//         done();
//       }, 50);
//     });
  
// afterAll(done => {
//   index.close(done);
// });
  
  });