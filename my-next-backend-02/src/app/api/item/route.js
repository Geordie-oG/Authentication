import { getClientPromise } from "@/lib/mongodb";
import { errorResponse, printExceptionLog, successResponse } from "@/lib/utils";

export async function GET(request) {
  try {
    const client = await getClientPromise();
    const db = client.db(process.env.DB_NAME);

    // MODIFIED: Filter out items with the status "DELETED"
    const itemList = await db
      .collection("item")
      .find({ status: { $ne: "DELETED" } })
      .toArray();

    return successResponse({ itemList }, 201);
  } catch (error) {
    printExceptionLog("GET Items", error);
    return errorResponse("GET Item Internal Error", 500);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const client = await getClientPromise();
    const db = client.db(process.env.DB_NAME);

    const insertResult = await db.collection("item").insertOne({
      name: data.name,
      category: data.category,
      price: data.price,
      amount: data.amount,
      status: "ACTIVE", // MODIFIED: Automatically set status to ACTIVE
    });

    return successResponse(
      {
        id: insertResult.insertedId,
      },
      201,
    );
  } catch (error) {
    printExceptionLog("POST Items", error);
    return errorResponse("POST Item Internal Error", 500);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
