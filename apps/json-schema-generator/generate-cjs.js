/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const { userSchema } = require('zod-schema');
const { zodToJsonSchema } = require('zod-to-json-schema');

const outputFolder = './jsonschema';

function generate() {
  const userJsonSchema = zodToJsonSchema(userSchema);

  fs.mkdirSync(outputFolder, { recursive: true });
  fs.writeFileSync(
    path.resolve(outputFolder, 'user.json'),
    JSON.stringify(userJsonSchema, null, 2),
  );

  console.log('Successfully generated JSON Schema');
}

generate();
