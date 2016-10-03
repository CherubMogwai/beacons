# Tips for Developing on OSX

## Easiest Installation of Dependencies

1) Install and launch iTerm 2 (https://www.iterm2.com/downloads.html)

2) Install Oh-My-Zsh:

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

3) Close and open a new terminal in iTerm 2 to enable Oh-My-Zsh

4) Install `nvm`:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
```

5) Install Node (v5.7.1 was used for development, you can experiment with newer versions if you like):

```bash
nvm install v5.7.1
```

6) Install VirtualBox (https://www.virtualbox.org/wiki/Downloads)

7) Install Vagrant (https://www.vagrantup.com/downloads.html)

8) Clone the `beacons` repository from GitHub:

```bash
git clone git@github.com:CherubMogwai/beacons.git
```

9) From the `beacons` folder, run `npm install` to install all the Javascript libraries needed for the project

10) Install dependencies needed for testing:

```bash
npm install -g ava nyc
```


## Running a copy of the database without the hassle of installing PostgreSQL:

Change into the `beacons` project folder and type:

```bash
vagrant up
```

Wait for it to finish, and you'll have PostgreSQL installed and configured with a `beacons`
user and database (password `dev`). No schemas have been imported by default. You can do that by typing this:

```bash
vagrant ssh
sudo -u postgres -s
cd /vagrant
psql beacons < schemas/extensions.sql
psql beacons < schemas/beacons.sql
psql beacons < schemas/history.sql
psql beacons < schemas/boundaries.sql
```

Optionally you can install the default boundary, based in the North End of Kelowna:

```bash
psql beacons < schemas/samples/boundaries.sql
```

#### Administrating the database easily

Install `Postico` (https://eggerapps.at/postico/) into OSX, and add a
connection (beacons as username/database name, dev as password, default port and localhost)

Remember to turn off Vagrant when you don't need your database running anymore:

```bash
vagrant halt
```