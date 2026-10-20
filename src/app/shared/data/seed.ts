import { cocktails } from './cocktails.data';

export async function seedData() {
  await fetch('https://restapi.fr/api/cocktails-v3', {
    method: 'POST',
    body: JSON.stringify(cocktails),
    headers: {
      'Content-type': 'application/json',
    },
  });
}
