FROM docker pull mcp/playwright
WORKDIR /e2e

COPY package*.json ./
RUN npm install

COPY . ./
CMD [ "npx", "playwright", "test", "testFixture.spec.js"]