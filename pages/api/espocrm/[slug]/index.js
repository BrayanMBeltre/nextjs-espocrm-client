const Client = require("../../../../lib/espocrm-api-client");

const espocrmHost = process.env.ESPOCRM_HOST;
const espocrmAPIkey = process.env.ESPOCRM_API_KEY;

const client = new Client(espocrmHost, espocrmAPIkey);

export default async function handler(req, res) {
  let {
    query: { slug },
    method,
  } = req;
  const params = req.body;

  try {
    const response = await client.request(method, slug, params);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.statusCode, error.statusMessage);
    res.status(error.statusCode).send(error.statusMessage);
  }
}
