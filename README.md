# Bookie!
## What is Bookie ?

Bookie is 3 tier web application for bookmarks that can be hosted **locally**! All you need to make it work in your environment is the following tools such as:
1. [Docker](https://www.docker.com/products/docker-desktop/) 
2. [VSCode](https://code.visualstudio.com/) or any other code editor of your liking
3. [MariaDB](https://mariadb.org/) 
4. [PHP](https://www.php.net/downloads.php) a link on how to install the correct version for you is [here](https://www.youtube.com/watch?v=l-74L_8L3CU)

***
## Preparing the environment

After installing the previous tools, make sure to go to [REST API for Bookie][https://github.com/Ysumaydaee/REST-API-For-Bookie] and **clone** the repository. This repository contains the **REST API** for the application, and the **docker compose file** necessary for creating the docker image for the **MariaDB** server.

Open a new CMD window at the **mariadb** directory and write the following in the CMD:

```
PS:C:\\YourUser\\path\\to\\the\\mariadb: docker compose up
```

Make sure **Docker is up and running** before running this command. If it ran successfully, it will deploy an image running at **3306:3306**, make sure that your localhost has 3306 open for use, or you could change it, **but you will have to change the environment variables at API server!**

There is also the second image within the compose file **(adminer)** which is basically a gate for you to access the database through the browser. I have set it to 8085:8080 since I had 8085 open on my host, but you can change it to whatever works for you! **Just don't change the 8080**!

***
## Creating the database 

To access the database through the **adminer**, I have set the credentials as follows:

1. Username: root
2. Password: example
3. Server: db

if you would like, you could change these information within the **docker-compose.yml** file. After doing so, navigate and click on the **SQL Commands** tab at the left and enter the following commands:
##### Categories table:
```
CREATE DATABASE bookmarking_db;
USE bookmarking_db;
CREATE TABLE categories(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL, 
    date_added DATETIME NOT NULL,
    PRIMARY KEY (id)
    );
```
##### Bookmarks table:
```
USE bookmarking_db;
CREATE TABLE bookmarks (
    mark_id MEDIUMINT NOT NULL AUTO_INCREMENT,
    cat_id MEDIUMINT NOT NULL,
    title VARCHAR(255) NOT NULL, 
    link VARCHAR(255) NOT NULL, 
    date_added DATETIME NOT NULL,
    PRIMARY KEY (mark_id),
    FOREIGN KEY (cat_id) REFERENCES categories(id) ON DELETE CASCADE);
```

***
## Running the API Server

Create a new powershell window through VScode and navigate to the **=php-mysql-rest-api** and we will initialize the environment variables. For windows users, you could use:
```
$env:DB_HOST='localhost'
$env:DB_PORT=3306
$env:DB_DATABASE='bookmarking_db'
$env:DB_USERNAME='root'
$env:DB_PASSWORD='example'
``` 

after running this command, in the same window, run:
```
php -c path/to/php-files/<php.ini or php.ini-devlopement> -S localhost:<anyport that is open in your host>
```

substitute the values between **<>** with the appropriate values that work in your machine.

***
## Running the Front-end 

To clone the project, navigate to [Bookie!](https://github.com/Ysumaydaee/Bookie) and clone the repository. After cloning the repository, navigate to the **src** directory through a powershell/cmd window, and run the following:

```
npm install
```

To install all the necessary resources in the **package.json**. if this doesn't work, you could track the error that appears which might be only **react-scripts** which you could download and any missing packages manually if it didn't work. Other than the normal **node_modules**, **react-router-dom** is the only other **non-vanilla** library that I have installed to configure **React Routing**.

After setting everything correctly, at the root directory of the project, run:

```
npm start
```

The React application should now be running correctly! Just make sure to remove the **homepage:** from the **package.json** before running so that it auto open at **localhost:port/** and not **localhost:port/Bookie**. As far as my testing goes, the localhost for react app is **3000**. 

***

## Testing the application

I have Recorded a video to demonstrate the capabilities of Bookie! The See the video for yourself click the [Link]()