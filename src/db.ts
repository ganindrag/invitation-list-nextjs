import pgLib from "pg-promise";

const pgp = pgLib(/* initialization options */);

function createSingleton<T>(name: string, create: () => T): T {
  const s = Symbol.for(name);
  let scope = (global as any)[s];
  if (!scope) {
    scope = { ...create() };
    (global as any)[s] = scope;
  }
  return scope;
}

interface IDatabaseScope {
  db: pgLib.IDatabase<any>;
  pgp: pgLib.IMain;
}

export function getDB(): IDatabaseScope {
  return createSingleton<IDatabaseScope>("my-app-db-space", () => {
    return {
      db: pgp({
        host: process.env.DBHOST,
        port: 5432,
        database: process.env.DBNAME,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        max: 30,
      }),
      pgp,
    };
  });
}
