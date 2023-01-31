# API

## Node Data

### Node Types

The API supports the 5 node types: `'connection', 'database', 'schema', 'table', 'column'`.

Following REST practices, these resources are represented by 5 endpoints:

```
1. api/columns
2. api/connections
3. api/databases
4. api/schemas
5. api/tables
```

Each endpoint accepts and optional query parameter (filter) named `id`. Multiple ids are supported.

Example request and response:

request:
`api/connections?id=barr2r2r3`

response:

```json
[
  {
    "item": {
      "type": "connection",
      "id": "barr2r2r3",
      "name": "public"
    },
    "children": [
      {
        "type": "database",
        "id": "sdQWd",
        "name": "tiger"
      }
    ]
  }
]
```

### Permissions

In order to enforce user permissions, the server needs an authentication method.

This can be implemented via cookie or a session token, such as a jwt in a Bearer header.
Once the server decrypts the token and identifies the user, it's the server's responsibility to enforce the user's permissions. A node's children will be included in the response only if the user has sufficient permissions. Otherwise, the node's `childern` field will be an empty array.
