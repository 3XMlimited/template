export const GET = async (req, res) => {
  try {
    const response = await fetch(
      "https://emailoctopus.com/api/1.6/lists?api_key=" + "",
      {
        headers: {
          "Content-Type": "application/json",
        },
        // later here need to add  limit / page default limit =100
      }
    );
    const List = await response.json();
    return new Response(List, { status: 200 });
  } catch (error) {
    return new Response("Fetch Data Error!", { status: 200 });
  }
};
