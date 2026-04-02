'use server';

import { Resend } from 'resend';
import AppEmail from '@/components/email/AppEmail';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail({ email, fullName, type, category }) {
  
  // ✅ Check API key
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not defined");
    return { success: false, error: "Email service not configured" };
  }

  // ✅ Validate inputs
  if (!email || !fullName) {
    return { success: false, error: "Missing required fields" };
  }

  // ✅ Detect environment
  const isDev = process.env.NODE_ENV === 'development';

  try {
    const { data, error } = await resend.emails.send({

      // ✅ Resend default sender (test mode)
      from: 'FrameX Tech Farm <onboarding@resend.dev>',

      // 🔥 Smart email routing
      to: isDev 
        ? ['framextechfarm@gmail.com']   // Dev → only your email
        : [email],                       // Prod → actual user

      // ✅ Replies go to your Gmail
      reply_to: 'framextechfarm@gmail.com',

      // ✅ Subject
      subject: `🎉 Your ${type} Application for ${category.toUpperCase()} is Received!`,

      // ✅ React Email Template
      react: (
        <AppEmail 
          fullName={fullName} 
          type={type} 
          category={category} 
        />
      ),

      // ✅ Fallback text
      text: `Hi ${fullName}, your application for ${type} (${category}) has been received. We will contact you soon.`,

    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", data);

    return { success: true, data };

  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message };
  }
}