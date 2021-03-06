import Client from "lib/espocrm-api-client";

const espocrmHost = process.env.ESPOCRM_HOST;
const espocrmAPIkey = process.env.ESPOCRM_API_KEY;

const client = new Client(espocrmHost, espocrmAPIkey);

export default async function handler(req, res) {
  const {
    query: { slug, id },
    method,
  } = req;
  const payload = req.body;

  const route = `${slug}/${id}`;

  try {
    const response = await client.request(method, route, payload);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.statusCode, error.statusMessage);
    res.status(error.statusCode).send(error.statusMessage);
  }
}
