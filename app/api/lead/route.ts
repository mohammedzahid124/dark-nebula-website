/**
 * Lead API Endpoint
 * Handles lead data persistence and validation
 */

import { NextRequest, NextResponse } from "next/server";
import { LeadData } from "@/types/lead";

/**
 * Validate required fields
 */
function validateLeadData(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (typeof data !== "object" || data === null) {
    return { valid: false, errors: ["Invalid request body"] };
  }

  const lead = data as Record<string, unknown>;

  // Validate name
  if (!lead.name || typeof lead.name !== "string" || lead.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  // Validate email
  if (!lead.email || typeof lead.email !== "string") {
    errors.push("Valid email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead.email)) {
      errors.push("Invalid email format");
    }
  }

  // Validate phone
  if (!lead.phone || typeof lead.phone !== "string") {
    errors.push("Phone number is required");
  } else {
    const digits = (lead.phone.match(/\d/g) || []).length;
    if (digits < 10) {
      errors.push("Phone must contain at least 10 digits");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * POST /api/lead
 * Save lead data from form submission
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate lead data
    const validation = validateLeadData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    // Extract and sanitize lead data
    const lead: LeadData & { message?: string; submittedAt?: string; source?: string } = {
      name: String(body.name).trim(),
      email: String(body.email).trim().toLowerCase(),
      phone: String(body.phone).trim(),
      purpose: body.purpose ? String(body.purpose).trim() : undefined,
      timestamp: new Date(),
      conversationLength: body.conversationLength || 0,
    };

    // In a real application, you would:
    // 1. Save to a database (e.g., MongoDB, PostgreSQL)
    // 2. Send confirmation email
    // 3. Trigger CRM integration
    // 4. Send Slack notification

    // For now, log and return success
    console.log("[LEAD] New lead received:", {
      ...lead,
      message: body.message,
      source: body.source,
    });

    // TODO: Implement database save
    // const leadId = await saveLead(lead);

    // TODO: Implement email notification
    // await sendConfirmationEmail(lead.email, lead.name);

    // TODO: Implement CRM integration
    // await createCRMContact(lead);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Lead saved successfully",
        leadId: `lead_${Date.now()}`, // Placeholder ID
        lead: {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          purpose: lead.purpose,
          timestamp: lead.timestamp,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[LEAD API] Error:", error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process lead submission" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/lead
 * Retrieve lead count (optional, for admin dashboard)
 */
export async function GET(request: NextRequest) {
  try {
    // Optional: Check for admin authentication header
    const authHeader = request.headers.get("authorization");

    // This is a simple placeholder
    // In production, verify auth and return actual stats
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead stats endpoint",
      stats: {
        totalLeads: 0, // TODO: Query from database
        leadsThisMonth: 0,
        leadsThisWeek: 0,
      },
    });
  } catch (error) {
    console.error("[LEAD API] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead stats" },
      { status: 500 }
    );
  }
}
