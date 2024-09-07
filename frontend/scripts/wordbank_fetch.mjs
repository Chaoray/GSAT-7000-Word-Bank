let word_bank = {};

(async () => {
    let response = await fetch('http://awa.freeserver.tw:22034/word_bank');
    let data = await response.json();
    word_bank = data;
})();

export {
    word_bank
};