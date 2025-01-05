# Estate Agent Client-Side Web Application

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Project Description

The Estate Agent Client-Side Web Application is an advanced client-side project built with React. It offers a responsive property search platform that allows users to browse, search, and manage favorite properties. The application emphasizes a user-friendly design, data security, and efficient handling of user data through local storage.

## Features

- **Responsive Design:** Optimized for various screen sizes using media queries and flexible layouts.
- **Property Search:** Users can search for properties based on type, price range, bedrooms, dates, and postcode.
- **Favorites Management:** Add, remove, and clear favorite properties with data persisted in local storage.
- **Agent Finder:** Search and filter real estate agents based on location, specialization, and ratings.
- **Authentication:** A simple User registration and login functionality with data persisted in local storage.
- **Theme Toggle:** Switch between light and dark modes for enhanced user experience.
- **Interactive Maps:** Embed Google Maps to display property locations.
- **Dynamic UI Widgets:** Utilize dynamic components like dropdowns and date pickers for an interactive interface.

## Technologies Used

- **Frontend:**

  - [React](https://reactjs.org/)
  - [React Router DOM](https://reactrouter.com/)
  - [React Icons](https://react-icons.github.io/react-icons/)
  - [React Tabs](https://reactcommunity.org/react-tabs/)
  - [React Widgets](https://jquense.github.io/react-widgets/)
  - [React Zoom Pan Pinch](https://github.com/prc5/react-zoom-pan-pinch)

- **State Management:**

  - React Hooks (`useState`, `useEffect`, `useRef`, `useCallback`)

- **Styling:**

  - CSS Modules
  - Media Queries

- **Utilities:**
  - [AJV](https://ajv.js.org/) for JSON schema validation

## Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/estate_agent_client-side_web_application.git
   ```

2. **Navigate to the Project Directory**

   ```sh
   cd estate_agent_client-side_web_application
   ```

3. **Install Dependencies**

   ```sh
   npm install
   ```

4. **Start the Development Server**
   ```sh
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [Running Tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**\
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Project Structure

```
estate_agent_client-side_web_application/
├── public/
│   ├── index.html
│   └── properties.json
├── src/
│   ├── Components/
│   │   ├── AgentComponents/
│   │   │   ├── AgentCard/
│   │   │   ├── AgentGrid/
│   │   │   └── AgentSearch/
│   │   ├── AuthComponents/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── FavoriteListComponents/
│   │   │   ├── FavoriteCard/
│   │   │   └── FavoriteGrid/
│   │   ├── NavbarComponent/
│   │   ├── PropertyListComponents/
│   │   │   ├── PropertyCard/
│   │   │   └── PropertyGrid/
│   │   ├── SearchBarComponent/
│   │   ├── ThemeToggleComponent/
│   │   └── FooterComponent/
│   ├── Pages/
│   │   ├── Authentication/
│   │   ├── FindAgent/
│   │   ├── LandingPage/
│   │   ├── PropertyDetails/
│   │   └── SearchProperty/
│   ├── data/
│   │   └── simulatedDatabase.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── package-lock.json
└── README.md
```

## Troubleshooting

### Fixing the `Cannot find module 'ajv/dist/compile/codegen'` Error

If you encounter the following error when running `npm start`:

```sh
> estate_agent_client-side_web_application@0.1.0 start
> react-scripts start

Cannot find module 'ajv/dist/compile/codegen'
Require stack:
- your-path\ACSD-Coursework\estate_agent_client-side_web_application\node_modules\ajv-keywords\dist\definitions\typeof.js
- your-path\Coursework\ACSD-Coursework\estate_agent_client-side_web_application\node_modules\ajv-keywords\dist\keywords\typeof.js
- your-path\Coursework\ACSD-Coursework\estate_agent_client-side_web_application\node_modules\ajv-keywords\dist\keywords\index.js
- your-path\Coursework\ACSD-Coursework\estate_agent_client-side_web_application\node_modules\ajv-keywords\dist\index.js
- your-path\Coursework\ACSD-Coursework\estate_agent_client-side_web_application\node_modules\schema-utils\dist\validate.js
- your-path\Coursework\ACSD-Coursework\estate_agent_client-side_web_application\node_modules\schema-utils\dist\index.js
- your-path\Coursework\ACSD-Coursework\estate_agent_client-side_web_application\node_modules\webpack-dev-server\lib\Server.js
- your-path\Coursework\ACSD-Coursework\estate_agent_client-side_web_application\node_modules\react-scripts\scripts\start.js

```

Follow these steps to fix it :

1. Open the `ACSD-Coursework` directory in the terminal.

2. Navigate to the `estate_agent_client-side_web_application` directory:
   ```sh
   cd estate_agent_client-side_web_application
   ```
3. Run the following command to check the version of `ajv`:
   ```sh
   npm ls ajv
   ```
4. Install the correct version of `ajv`:
   ```sh
   npm install --save-dev ajv@^8
   ```
5. Start the application again:
   ```sh
   npm start
   ```

If this did'nt work You can refer to [this](https://stackoverflow.com/questions/78743456/how-can-i-fix-this-cannot-find-module-ajv-dist-compile-codegen-require-stack) Stack Overflow discussion for potential solutions

## License

This project is licensed under the [MIT License](LICENSE).
