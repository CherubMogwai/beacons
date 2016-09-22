# Installation Instructions for PostgreSQL 9.5

Assuming a fresh install of Ubuntu 14.04:

```bash

sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

```

This will install the database service, at which point you may want to create a database and a user:

```bash
sudo su - postgres
createdb beacons
createuser -P -e beacons
```

Followed by running `psql` and assigning privileges to that user for the database:

`GRANT ALL PRIVILEGES ON DATABASE beacons TO beacons`

Postgres will listen on localhost by default and won't accept outside connections.
Refer to `/etc/postgresql/9.5/main/pg_hba.conf` to add trust as needed.

Network bindings are kept in: `/etc/postgresql/9.5/main/postgresql.conf`