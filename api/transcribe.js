export const config = {
  runtime: 'edge', // Runs on V8 isolates for instant initialization and minimal memory overhead
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio');

    if (!audioFile) {
      return new Response(JSON.stringify({ error: 'No audio file provided' }), { status: 400 });
    }

    // Construct the standard payload for Groq's API
    const groqData = new FormData();
    groqData.append('file', audioFile);
    groqData.append('model', 'whisper-large-v3');
    groqData.append('response_format', 'verbose_json');
    groqData.append('timestamp_granularities[]', 'word');

    // Send payload directly to Groq's LPU cluster
    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: groqData
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || JSON.stringify(data.error));
    }

    // Return the word-level timestamp payload directly to the client
    return new Response(JSON.stringify({ words: data.words }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
