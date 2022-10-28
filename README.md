<h1 style=" width: 500; height: 500;font-weight: 700; text-align: center;">Job<span style="background-color: orange; color: black;">Hub</span></h1>

---

## 👋 About us :

<p>Job<span style="background-color: orange; color: black">Hub</span> is a platform on which you can <b><u>look</u></b>, <b><u>create</u></b> and <b><u>apply</u></b> for job offers.</p>

# Get Started :
## Installation :
First of all, you will need to clone the repo then :
```bash
cd jobhub
```

#### To do in `/client` :
In the client folder, you will need to first of all install the dependencies by doing :
```bash
npm i
```
And then compile the sass to css by doing :
```bash
cd sass
sass main.sass main.css
```

#### To do in `/server` :
Just like the client folder, you will need to navigate in the folder than type :

```bash
npm i  
```
Then, you will have to create the `.env` file. Following the template and for more information [click here](#environment-variables).
Then you will need to create the tables by doing :
```bash
node initiateDb.js
```
## 🏃 Run it :
So to run it, it's not very practical I know, but after all we're simulating reality. So you will need to terminal windows.
1. In the first window, navigate in the `/server` folder and start the server by doing :
```bash
node index.js
```
2. In the second window, navigate in the `/client` folder and start the client app by doing :
```bash
npm start
```
It will ask you to go on post `3001` just press `y`.
3. It will take you automatically to the page and there you go, you can **create** a user, **login** and **enjoy** !

---

## 💻 Tech Stack :

**Client :** React, React-Bootstrap, React-Markdown, SASS, [Axios](https://axios-http.com/docs/intro)

**Server :** Express, [Axios](https://axios-http.com/docs/intro), [mysql2](https://www.npmjs.com/package/mysql2), [JWT](https://jwt.io)

---

## 📜 Documentation :

#### 🧬 Project Structure :
`/client` : The folder in which everything the client will have access to. (The react)
- `/client/public`: All the public ressources that will be available for the client.
  - `/client/public/images` : The images that will be used in the website.


- `/client/src`: This is the main folder of the website. All the source code will be stored in there. Everything that is crucial to the functioning of our website.
  - `/client/src/components`: All the react components will be stored in here in folders with the names of the components. It was done this way for the reusability of the components which is the mother concept of **React**.
  - `/client/src/helpers`: Where some JS functions used in the project are defined and some routing helpers.
  - `/client/src/pages`: In this folder we have the different pages. Each page (file) inside the folder is structured with some basic react.
   **Eg:**
    ```js
    import React from 'react';
    import HomeDisplay from '../components/HomeDisplay'; // The component

    export default function Home() {
      return (
        <HomeDisplay />
      );
    }
    ```
  - `/client/src/sass`: In here we have some sass code that we used to override some of the `react-bootstrap` styles. The sass will be compiled to **css** and imported to the `index.js`.

`/server`: Where all the express is located.
- `/server/helpers` : In here we have the helpers function that will be imported throughout the project.

- `/server/routes` : The different routes that our server will respond to.

#### CDM :
<img src="/cdm-jobhub.png" height="400" width="600">

### API Reference

##### Get all announcements :
```http
GET /api/announcements
```

##### Get details about a specific announcement :
```http
GET /api/announcements/:id
```

##### Create a new announcement :
```http
POST /api/announcements
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` | `integer` | **Required**. Your user_id |
| `company_id` | `integer` | **Required** The id of the company that is recruiting.|
| `contract_type` | `string` | `CDI`, `CDD`, `Alternance` or `Stage` |
| `job_title` |  `String` | The title of the job |

##### Update and announcement :
```http
PUT /api/announcements/:id
```
The parameters should be the fields you want to update.

##### Delete an announcement :
```http
DELETE /api/announcements/:id
```

##### Add an application :
```http
POST /api/applications/:announcement_id
```
 `announcement_id` is the **id** of the announcement you want to add the application to.

 ##### Get user by announcement id:
 ```http
 GET /api/users/announcements/:id
 ```

 ##### Get user by id:
```http
GET /api/user/:id
```

##### Get user by email :
```http
GET /api/user/email/:email
```

##### Add a user :
```http
POST /api/user
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstname` | `string` | **Required**. Your firstname |
| `lasname` | `string` | **Required** Your last name.|
| `email` | `string` | The email of the user |
| `phone` | `String` | The phone number of the user |
| `profile_url` | `String` | (**Optional**) a link to a photo that will be displayed in the profile |
| `address` | `string` | Your address **ex:** `14 rue de france` |
| `postal_code` |  `String` | Postal code **Eg:** `76000` |
| `city` | `string` | The city |
| `is_recruter` | `bool` | If the user is a recruter or not |

##### Update a user :
```http
POST /api/users/:id
```
Passing as parameters the fields that you want to update. The fields are available on the table just above.

##### Get user's applications :
```http
GET /api/applications/user/:id
```

`id` being the `user_id`.


## Dependencies:
**Client :**
```json
"dependencies": {
  "@testing-library/jest-dom": "^5.16.5",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^1.1.2",
  "bootstrap": "^5.2.2",
  "framer-motion": "^7.5.3",
  "react": "^18.2.0",
  "react-bootstrap": "^2.5.0",
  "react-cookie": "^4.1.1",
  "react-dom": "^18.2.0",
  "react-markdown": "^8.0.3",
  "react-router-dom": "^6.4.2",
  "react-scripts": "^2.1.3",
  "web-vitals": "^2.1.4"
}
```
**Server :**
```json
"dependencies": {
  "axios": "^1.1.2",
  "bcrypt": "^5.0.1",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.0.2",
  "express": "^4.18.1",
  "jsonwebtoken": "^8.5.1",
  "mysql2": "^2.3.3",
  "nodemailer": "^6.8.0"
}
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_PWD` The password to your **mysql** database

`DB_NAME` The name of your **mysql** database

`DB_USER` The username on your **mysql** server.

`USER_MAIL` The email that the mailer will be sending the emails from.

`PASS_MAIL` The password to this email

`ACCESS_TOKEN_SECRET` The generated token for JWT.

`REFRESH_TOKEN_SECRET` Another generated token for JWT.

---

## ✍️ Authors

- [@JayEpic](https://www.github.com/JayEpic)
- [@Az-r-ow](https://www.github.com/Az-r-ow)
