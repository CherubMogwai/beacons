# Vagrant Setup

I've included a `Vagrantfile` in the project root which will allow you to get an instance of Postgres up
and running quickly on Ubuntu linux. You can also opt to run the service itself from inside of Vagrant,
however due to IO performance issues with VirtualBox it's easiest to just run the Node portion from your
machine natively (install Node with NVM) and let it connect to the database mapped to localhost.

Simply install Vagrant and VirtualBox:

https://www.vagrantup.com/

and

https://www.virtualbox.org/wiki/Downloads


Navigate to the project root and type `vagrant up` to automatically download an image and provision
the environment.

PostgreSQL 9.5 will be installed, a `beacons` database and user will be made with a password of `dev`,
access to the virtual machine network will be permitted (10.0.2.x -- change in the Vagrantfile if your
network is different) and postgres will be instructed to listen on all interfaces.