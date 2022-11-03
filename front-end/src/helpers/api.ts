import { Url } from "../App.types";

export const baseUrl = "http://localhost:8000";

export const getUrlsFromApi = (): Promise<Url[]> => {
  return fetch(`${baseUrl}/urls`).then((response) => {
    if (response.status === 200) return response.json();
    else throw new Error("Invalid response");
  });
};

export const postUrlToApi = (
  userInput: string
): Promise<{ code: number; message: string }> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ longUrl: userInput }),
  };

  return fetch(`${baseUrl}/url`, requestOptions).then((response) =>
    response.json()
  );
};
