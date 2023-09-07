# npm Package ReadMe

## Description

This npm package provides two main functions: `loadJSONFile`, `getJSONShape` and `getByTag`. These functions are designed to work with JSON data and perform the following tasks:

### `getJSONShape(json)`

- Retrieves the shape of a JSON structure, including the types of its elements.
- Parameters:
  - `json` (Object or Array): The JSON object or array for which you want to determine the shape.
- Returns: An object representing the shape of the JSON structure, with type information for each element.

#### Usage

```javascript
const { getJSONShape } = require("json-scan");

const json = {
  name: "John",
  age: 30,
  isStudent: true,
  hobbies: ["reading", "swimming"],
  address: {
    city: "New York",
    zipCode: "10001",
  },
};

const shape = getJSONShape(json);
```

This is the result we would obtain when performing `console.log(shape)`

```javascript
{
  "name": "string",
  "age": "number",
  "isStudent": "boolean",
  "hobbies": ["string"],
  "address": {
    "city": "string",
    "zipCode": "string"
  }
}
```

In the example above, `getJSONShape` will return an object representing the shape of the JSON structure, including the types of each element.

### `getByTag`

#### Description

This function allows you to search for objects within a JSON structure that contain a specified tag. It recursively searches through the JSON structure to find objects with the desired tag.

#### Usage

```javascript
const { getByTag } = require("json-scan");

const json = {
  name: "Damian",
  surname: "Sire",
  venue: {
    name: "Google",
    address: "dummy",
  },
  family: [
    {
      name: "Person1",
      surname: "DummySurname",
      venue: {
        name: "Place1",
        address: "Address1",
      },
      family: [],
    },
    {
      name: "Person2",
      surname: "Surname2",
      venue: {
        name: "Place2",
        address: "Address2",
      },
      family: [],
    },
  ],
};

const tag = "name";
const result = getByTag(json, tag);
```

The result we would obtain would be the following

```javascript
{
    "name": "Damian",
    "venue": {
        "name": "Google",
    },
    "family": [
        {
            "name": "Person1",
            "venue": {
                "name": "Place1",
            },
        },
        {
            "name": "Person2",
            "venue": {
                "name": "Place2",
            },
        }
    ]
}
```

### `loadJSONFile`

#### Description

This function is used to asynchronously load and parse a JSON file from a specified file path.

#### Usage

```javascript
const loadJSONFile = require("json-scan");

(async () => {
  try {
    const data = await loadJSONFile(filePath);
    console.log(data); // Parsed JSON data
  } catch (error) {
    console.error(error.message);
  }
})();
```

## Installation

To use this package in your project, you can install it via npm:

```bash
npm install json-scan
```

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/damiansire/json-scan) of this package.

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## Author

Damian Sire - [LinkedIn](https://www.linkedin.com/in/damiansire/) - [Twitter](https://twitter.com/damiansire)

## License

Anyone can use this library for free.

## Acknowledgments

Thank you for using our npm package! We hope it helps you work with JSON data more efficiently. If you have any questions or need further assistance, please don't hesitate to contact us.

Happy coding!
