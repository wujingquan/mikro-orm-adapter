MikroORM Adapter
====
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]
[![codebeat badge](https://codebeat.co/badges/7b938f17-ac89-4ee9-b3cc-787b5e94720d)](https://codebeat.co/projects/github-com-wujingquan-mikro-orm-adapter-master)
[![CI](https://github.com/wujingquan/mikro-orm-adapter/actions/workflows/ci.yml/badge.svg)](https://github.com/wujingquan/mikro-orm-adapter/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/wujingquan/mikro-orm-adapter/badge.svg?branch=master)](https://coveralls.io/github/wujingquan/mikro-orm-adapter?branch=master)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/casbin/lobby)

[npm-image]: https://img.shields.io/npm/v/mikro-orm-adapter.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mikro-orm-adapter
[download-image]: https://img.shields.io/npm/dm/mikro-orm-adapter.svg?style=flat-square
[download-url]: https://npmjs.org/package/mikro-orm-adapter

MikroORM Adapter is the [MikroORM](https://github.com/mikro-orm/mikro-orm) adapter for [Node-Casbin](https://github.com/casbin/node-casbin). With this library, Node-Casbin can load policy from MikroORM supported database or save policy to it.

Based on [Officially Supported Databases](https://mikro-orm.io/), the current supported databases are:

- MySQL
- PostgreSQL
- MariaDB
- SQLite
- MS SQL Server
- Oracle
- WebSQL
- MongoDB 


You may find other 3rd-party supported DBs in MikroORM website or other places.

## Installation

    npm install mikro-orm-adapter

## Simple Example

```typescript
import { newEnforcer } from 'casbin';
import MikroORMAdapter from 'mikro-orm-adapter';

async function myFunction() {
    // Initialize a MikroORM adapter and use it in a Node-Casbin enforcer:
    // The adapter can not automatically create database.
    // But the adapter will automatically and use the table named "casbin_rule".
    // I think ORM should not automatically create databases.  
    const a = await MikroORMAdapter.newAdapter({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'casbin',
    });


    const e = await newEnforcer('examples/rbac_model.conf', a);

    // Load the policy from DB.
    await e.loadPolicy();

    // Check the permission.
    await e.enforce('alice', 'data1', 'read');

    // Modify the policy.
    // await e.addPolicy(...);
    // await e.removePolicy(...);

    // Save the policy back to DB.
    await e.savePolicy();
}
```

## Simple Filter Example

```typescript
import { newEnforcer } from 'casbin';
import MikroORMAdapter from 'mikro-orm-adapter';

async function myFunction() {
    // Initialize a MikroORM adapter and use it in a Node-Casbin enforcer:
    // The adapter can not automatically create database.
    // But the adapter will automatically and use the table named "casbin_rule".
    // I think ORM should not automatically create databases.  
    const a = await MikroORMAdapter.newAdapter({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'casbin',
    });


    const e = await newEnforcer('examples/rbac_model.conf', a);

    // Load the filtered policy from DB.
    await e.loadFilteredPolicy({
        'ptype': 'p',
        'v0': 'alice'
    });

    // Check the permission.
    await e.enforce('alice', 'data1', 'read');

    // Modify the policy.
    // await e.addPolicy(...);
    // await e.removePolicy(...);

    // Save the policy back to DB.
    await e.savePolicy();
}
```
## Getting Help

- [Node-Casbin](https://github.com/casbin/node-casbin)

## License

This project is under Apache 2.0 License. See the [LICENSE](LICENSE) file for the full license text.
