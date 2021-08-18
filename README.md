Para correr [espoCR en Docker](https://github.com/espocrm/docker) creamos un archivo docker.compose.yml con lo siguiente:

```yaml
version: "3.1"

services:
  mysql:
    container_name: mysql
    image: mysql:8
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
    volumes:
      - mysql:/var/lib/mysql

  espocrm:
    container_name: espocrm
    image: espocrm/espocrm
    environment:
      ESPOCRM_DATABASE_PASSWORD: example
      ESPOCRM_ADMIN_USERNAME: admin
      ESPOCRM_ADMIN_PASSWORD: password
      ESPOCRM_SITE_URL: "http://localhost:8080"
    restart: always
    ports:
      - 8080:80
    volumes:
      - espocrm:/var/www/html

  espocrm-daemon:
    image: espocrm/espocrm
    volumes:
      - espocrm:/var/www/html
    restart: always
    entrypoint: docker-daemon.sh

volumes:
  mysql:
  espocrm:
```

luego

```bash
docker-compose up -d
```

Nos dirigimos al [localhost:8080](http://localhost:8080)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7bb5f554-0284-43c4-9dea-1f2a4a48566c/Untitled.png)

Username: admin | Password: password

Creamos un nuevo rol en Administration > Roles > Create new rol

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/90c3b8cb-2436-46fb-acf2-2c97886ef4bb/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6df61469-8c65-44b7-952b-0423490b46c7/Untitled.png)

Creamos un API User en Administration > API Users > Create API User

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/83130210-725a-496e-89db-7beec837de4e/Untitled.png)

Necesitaremos la API Key más adelante

Front-End

creamos un .env.Local ponemos nuestra API Key

```
ESPOCRM_HOST=http://localhost:8080
ESPOCRM_API_KEY=edc6809d8a19fbbbdeb24fab824a386d
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Instalamos nuestras dependencias y corremos la app

```bash
yarn install
yarn run dev
```

nos dirigimos a localhost:3000

![dashboard.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a94906fa-632c-447f-b0f0-13ad8a206fe7/dashboard.png)
