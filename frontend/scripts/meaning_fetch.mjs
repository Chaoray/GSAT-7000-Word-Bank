async function get_meaning(word) {
    let resp = await fetch(`https://dictionary-api.eliaschen.dev/api/dictionary/en-tw/${word}`);
    let data = await resp.json();
    return data;
}

export {
    get_meaning
};
