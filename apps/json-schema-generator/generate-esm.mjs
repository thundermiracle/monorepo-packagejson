/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import { userSchema } from 'zod-schema';
import { zodToJsonSchema } from 'zod-to-json-schema';

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
