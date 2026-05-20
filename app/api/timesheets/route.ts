// 1. GET API Endpoint Handler
import { NextResponse } from "next/server";
import mockTimesheets from "../../../data/timesheet.json";

export async function GET() {
  // Return the mock database array instantly with a successful 200 header response
  return NextResponse.json(mockTimesheets, { status: 200 });
}

// 2. POST API Endpoint Handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTimesheet = {
      ...body,
      id: `server-${Math.random().toString(36).substring(2, 9)}`,
    };
    return NextResponse.json(newTimesheet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 },
    );
  }
}

// 3. PUT API Endpoint Handler
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // 1. Validation check: Ensure the payload contains the ID we are targetting
    if (!body.id) {
      return NextResponse.json(
        { error: "Missing required timesheet entry ID" },
        { status: 400 },
      );
    }

    // 2. Echo back the updated body item with a clean 200 OK block status header
    // (In a persistent database architecture, you would execute an update query here)
    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    console.error("PUT API Route Exception Failure:", error);
    return NextResponse.json(
      { error: "Internal structural processing failed" },
      { status: 500 },
    );
  }
}
