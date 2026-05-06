import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('photos') as File[];

    const imageContents: any[] = [];

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString('base64');
        imageContents.push({
          type: "image_url",
          image_url: {
            url: `data:${file.type};base64,${base64}`,
            detail: "high"
          }
        });
      }
    }

    const response = await grok.chat.completions.create({
      model: "grok-4.3",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a professional roofing expert in Jonesboro, Arkansas.
Analyze these roof photos and give a rough estimate.

Return ONLY valid JSON:
{
  "priceRange": "$X,XXX – $X,XXX",
  "summary": "2-3 sentence summary"
}`
            },
            ...imageContents
          ]
        }
      ],
      temperature: 0.3,
      max_tokens: 400
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    return Response.json({
      priceRange: result.priceRange || "$7,500 – $14,500",
      summary: result.summary || "Moderate damage detected. Full roof replacement recommended."
    });

  } catch (error) {
    return Response.json({ error: "Analysis failed" }, { status: 500 });
  }
}
