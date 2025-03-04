// services/user.ts
export async function addUserInterest(username: string, topic: string): Promise<any> {
    const url = "https://backend-wtp.vercel.app/api/add-interest";
    const body = { username, topic };
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error("Failed to add user interest");
    }
  
    const data = await response.json();
    return data;
  }