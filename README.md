
# Budget Manager App

A Budget Manager App built with with React.js and Redux Toolkit. Redux Toolkit is used to efficiently manage the application's state, ensuring a single source of truth for the financial data. This enables smooth data flow and real-time updates across the app. Recharts is used for creating interactive charts to visualize the financial data. The financial data is organized in rows and columns with Material UI Pagination. The app also utilizes LocalStorage, a web API that allows data to be stored locally on the user's device



# Live demo

http://stephanieplomp.github.io/budget-manager-app

## Screenshot

![App Screenshot](https://stephanieplomp.github.io/static/media/budgetManager.223856d050002f8f1ff2.png)

## Built with

This project was built using these technologies.

- React.js
- CSS3
- VsCode
- Redux
- Local Storage

## Features

- **State Management with Redux Toolkit:** Redux Toolkit efficiently manages the application's state, ensuring a single source of truth for all financial data. This enables smooth data flow and real-time updates across the app.
- **Data Table:** Financial data is displayed in a tabular format. The data table offers a search function for quick access to specific information.
- **Pagination:** The app divides tabular format data into manageable pages with pagination, reducing clutter and improving overall performance.
- **Data Visualization:** A clear overview of the financial data through an interactive chart. Visual representations of the income, expenses, and budget progress will give valuable insights.
- **Responsive Design:** The application is built with responsiveness in mind, ensuring that it's accessible and managable on various devices, including desktops, tablets, and smartphones.
- **framer-motion:** The app incorporates framer-motion to add engaging and smooth animations to different elements, enhancing the overall user experience.
- **Local storage:** The application utilizes Local Storage to persist the state data even when the user closes the browser or refreshes the page. This ensures that the user's financial data is retained across sessions.

## 🛠️ Technology Stack 

Dependencies defined in package.json:

- React.js: A popular JavaScript library for building user interfaces, providing a component-based architecture and a virtual DOM for efficient rendering.
- Redux: An open-source JavaScript library for managing and centralizing application state.
- Redux Toolkit: A set of utility functions to simplify Redux development, including a powerful state management solution.
- Chart.js: A versatile library for creating interactive charts and graphs to visualize financial data.

## Usage

- **Adding Transactions:** Use the expense or income component to add your expense or income. Add the name, specify the amount, select the date and select the category.

- **Removing Transactions:** Navigate to the table component to delete transactions with the trash button. 

- **Data Table and Pagination:** Utilize the DataTable component with built-in pagination to view and manage your financial data efficiently.

- **Data Visualization:** Gain insights into your spending patterns and budget progress by viewing the interactive income/expense chart on the main dashboard.
  
- **Demo and Reset:** Use the demo version to get a overview of the app with data. Remove all transactions with the reset button.
  


# Getting started

## Prerequisites 

You should have [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/) installed on your PC. You should also own a GitHub account.


## Setup And Deployment 🔧

1. To Get Started, Fork this repository to your GitHub account:
2. Clone the forked repo from your account using:

   ```bash
     git clone https://github.com/<your-username>/home.git
   ```

3. Open the project folder and Navigate to /src/components/. You will find all the components used and you can edit your information accordingly.

4. Change URL in [package.json](./package.json) file:

   ```json
    "homepage": "https://<your-username>.github.io/home"
   ```

   Or for deployment at custom domain, refer [create-react-app.dev](https://create-react-app.dev/docs/deployment/#step-1-add-homepage-to-packagejson)

5. After editing run the following bash commands:

   ```bash
   npm install
   npm start
   ```

6. To deploy website, run:

   ```bash
    npm run build
    npm run deploy
   ```

   Or for deployment at \<username>.github.io, refer [READMEdocs/custom-deployment.md](./READMEdocs/custom-deployment.md) and [pages.js](./pages.js)

7. Congrats your site is up and running. To see it live, visit:

   ```https
     https://<your-username>.github.io/home
   ```



# Contributing

### How To Contribute 

Contributions are welcome! If you find any bugs or want to add new features, please open an issue or submit a pull request. For major changes, please discuss them first in the issue tracker.

1. Fork the repository.
2. Create your branch: git checkout -b feature/YourFeature.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature/YourFeature.
5. Open a pull request.

### Thank you
If you liked this Budget Manager App, don't forget to give it a ⭐.
