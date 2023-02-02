# Curty - URL Shortner

Curty is a modern **open source URL shortner** made with NextJS and that use the [Curty Backend API](https://github.com/hakcolt/curty-backend) to make custom short links.

## 1. Description

This NextJS 13 application comes with a fully functional authentication system based on JWT Tokens.

### Main Features:

* Fully typed with typescript
* Login and register use cases
* Design with elegant color palette and modals
* Automatic JWT Token refresh
* useAuth() hook to easily manage the user section
* Persistence section with cookies
* Integration with [Curty Restful API](https://github.com/hakcolt/curty-backend)
* Providers to manage data

### Tech stack:

* NextJS
* React Hook Form
* Typescript
* Tailwind
* PostCSS
* Nookies

## 2. Getting Started:

### Prerequisites

* NodeJS v18 or higher
* npm v8 or higher

**Install the necessaries packages:**

```bash
npm install
```

**Run development server:**

```bash
npm run dev
```

## 4. How it works 

### 1. Authentication Flow:

The user sends a request to the `https://s.hakcolt.com/api/users/signin` endpoint, submitting the E-Mail address and password of the user in the request body. The server then validates the user credentials and, if valid, generates a JWT access token and a JWT refresh token. The access token is used to access the protected resources, while the refresh token is used to obtain a new access token when the current access token expires. The access token is sent in the response body, while the refresh token is sent in the response cookies.

If the user does not have an account, he can create one in the registration section that sends a request to `https://s.hakcolt.com/api/users/signiup`, then he'll be redirected to login section again.

### 2. Fetching data:

The user fetch the user data and links from backend passing the access token on header. If the access token is invalid or expires, a request will be made to `https://s.hakcolt.com/api/users/refresh` and the access token is automatically updated.

Now the user can see and manage the links he created, as well as create new links, as shown bellow.

### 3. Creating links:

To create a link you need the url and the path to access that link; the path must be unique, so you can't defined a path that already exists in the database,. You can also set a name for this link so that you can identity it most easily.

The user sends a *POST* request to `https://s.hakcolt.com/api/links` passing the link attributes in body and if everything goes as expected, the link will be save and shown on the home page.

## 5. Credits:

@hakcolt (All social medias)
hakcolt@gmail.com