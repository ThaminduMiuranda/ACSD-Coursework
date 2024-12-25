# ACSD-Coursework

ACSD-Coursework: Advanced Client-Side Web Development project featuring a responsive property search app using React. Implements JSON-based search, dynamic UI widgets, and media queries for responsiveness. Focuses on user-friendly design, data security, and efficient local storage handling for enhanced interactivity

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
