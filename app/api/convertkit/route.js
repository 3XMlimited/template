export const GET = async (req) => {
  try {
    const response = await fetch(
      "https://api.convertkit.com/v3/forms?" +
        new URLSearchParams({
          api_secret: process.env.convertkit_api,
        }),
      {
        method: "GET",
        timeout: "30000",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
