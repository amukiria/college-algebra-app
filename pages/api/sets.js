import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  const { query } = req.body;

  if (!query) {
    res.status(400).json({ error: 'Query is required' });
    return;
  }

  try {
    const response = await axios.get('https://api.wolframalpha.com/v2/query', {
      params: {
        input: query,
        format: 'plaintext',
        output: 'JSON',
        appid: process.env.WOLFRAM_API_KEY,
      },
    });

    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Wolfram API' });
  }
}
