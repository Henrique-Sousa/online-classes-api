# Online Classes API

To run, first install
```bash
npm i
```

then create the public and private keys
```bash
npm run keys
```

transpile the code
```bash
npm run build
```

and run
```
npm start
```

<br>

save a user on the database with the following fields
```
{
  name: 'user1',
  email: 'user1@mail.com',
  password: '$2a$10$BCdw6gBo5HfenKQVRnku1OFr2Jncrn4BQT5wtRMfp7xr9kAx69W1G'
}
```

using `curl` e `jq` \
to login and save the token on the variable `TOKEN`
```bash
TOKEN=$(curl -s -X POST -H 'Content-Type: application/json' --data '{"name": "user1", "password": "123456" }' localhost:3000/users  | jq -r '.token')
```

to access a protected endpoint
```bash
curl -s -X GET -H "Authorization: $TOKEN" localhost:3000/classes | jq
```
