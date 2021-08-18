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

![espo-login](https://raw.githubusercontent.com/BrayanMBeltre/nextjs-espocrm-client/main/pictures/espo-login.png)

Username: admin | Password: password

Creamos un nuevo rol en Administration > Roles > Create new rol

![espo-administration-menu](https://raw.githubusercontent.com/BrayanMBeltre/nextjs-espocrm-client/main/pictures/espo-administration.png)

![espo-roles](https://raw.githubusercontent.com/BrayanMBeltre/nextjs-espocrm-client/main/pictures/espo-roles.png)

Creamos un API User en Administration > API Users > Create API User

![espo-apiusers](https://raw.githubusercontent.com/BrayanMBeltre/nextjs-espocrm-client/main/pictures/espo-apiusers.png)

Front-End

creamos un .env.Local, ponemos nuestra API Key

```
ESPOCRM_HOST=http://localhost:8080
ESPOCRM_API_KEY=edc6809d8a19fbbbdeb24fab824a386d
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Instalamos nuestras dependencias, corremos la app

```bash
yarn install
yarn run dev
```

y por ultimo nos dirigimos a localhost:3000

![dashboard.png](https://raw.githubusercontent.com/BrayanMBeltre/nextjs-espocrm-client/main/pictures/dashboard.png)
