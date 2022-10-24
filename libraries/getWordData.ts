export default async function getWordData(word: any) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  return res.json();
}
