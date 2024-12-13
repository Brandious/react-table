# REACT TABLE

React table requires .env file in format, you can use .env.example to have a look at format of it. 

# How to Start This Repository

Follow these steps to set up and run the project that uses Vite, React, and TypeScript.

## 1. Clone the Repository

First, clone the repository to your local machine. Open your terminal and run:
  
  ```bash
    git clone https://github.com/Brandious/react-table.git
  ```

## 2. Navigate to the Project Directory

Change into the project directory:

```bash
  cd react-table
```

## 3. Install Dependencies

Use Yarn (or npm, depending on your preference) to install the project dependencies. If you are using Yarn, run:

```bash
  yarn install
```
If you prefer npm, run:

```bash
  npm install
```
This command will read the `package.json` file and install all the required dependencies listed there.

## 4. Set Up Environment Variables

Create a `.env` file in the root of the project if it doesn't already exist. You can use the provided example to set up your environment variables. Here’s how to create the file:

```bash
  touch env
```

Then, open the `.env` file in your text editor and add the necessary environment variables:


```env
  VITE_IP = <url of host file>
  VITE_COLUMNS = <route where columns are stored>
  VITE_CODES = <route where codes are stored>
```

## 5. Start the Development Server

To start the development server, run the following command:

```bash
  yarn dev
```