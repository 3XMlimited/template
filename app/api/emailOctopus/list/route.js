export const GET = async (req, res) => {
  try {
    const response = await fetch(
      "https://emailoctopus.com/api/1.6/lists?api_key=" +
        process.env.octopus_api,
      {
        headers: {
          "Content-Type": "application/json",
        },
        // later here need to add  limit / page default limit =100
      }
    );
    const List = await response.json();
    return new Response(JSON.stringify(List.data), { status: 200 });
  } catch (error) {
    return new Response("Fetch Data Error!", { status: 200 });
  }
};
