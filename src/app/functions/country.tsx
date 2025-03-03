// services/countries.ts

export async function fetchCountries() {
    const url = "https://backend-wtp.vercel.app/api/get-countries";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch countries");
    }

    const data = await response.json();
    return data;
}

export async function changeUserCountry(user_name: string, newCountry: string): Promise<any> {
    const url = "https://backend-wtp.vercel.app/api/change-user-country";
    const body = { user_name, newCountry };
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update user country");
    }
  
    const data = await response.json();
    return data;
  }