export const postRequest = async (url: string, payload: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`API failed: ${url}`);
  return res.json();
};
