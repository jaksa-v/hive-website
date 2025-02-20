export const prerender = false; // Not needed in 'server' mode
import type { APIRoute } from "astro";
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(1, 'Mobile number is required'),
  activity: z.string().optional()
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const formData = {
      name: data.get('name'),
      email: data.get('email'),
      mobile: data.get('mobile'),
      activity: data.get('activity') || undefined
    };

    const result = formSchema.safeParse(formData);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({
          message: 'Validation error',
          errors: result.error.errors
        }),
        { status: 400 }
      );
    }

    const { name, email, mobile, activity } = result.data;

    // Send to MailerLite
    const response = await fetch(`${import.meta.env.MAILERLITE_API_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${import.meta.env.MAILERLITE_TOKEN}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          name,
          phone: mobile,
          activity: activity || "",
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit to MailerLite');
    }

    return new Response(
      JSON.stringify({
        message: "Success!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'Internal server error',
      }),
      { status: 500 }
    );
  }
};
