export function getBillionaires() {
  return fetch("https://billions-api.nomadcoders.workers.dev/").then(
    (response) => response.json()
  );
}

export async function getDetails(id: string) {
  const data = await (
    await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`)
  ).json();
  return data;
}
