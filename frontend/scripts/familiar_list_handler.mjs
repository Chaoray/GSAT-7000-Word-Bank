import { $, $make } from './utils.mjs';

let data = null;

function init_unfamiliar_list() {
    data = localStorage.getItem('unfamiliar_words');
    if (data === null) {
        const default_data = JSON.stringify({ '1': [], '2': [], '3': [], '4': [], '5': [], '6': [] });
        localStorage.setItem('unfamiliar_words', default_data);
        data = default_data;
    }

    data = JSON.parse(data);
    let word_list = data;

    for (let level = 1; level <= 6; level++) {
        let article = $(`#level-${level}`);

        for (let word of word_list[level]) {
            let li = $make('li');
            li.textContent = word;
            article.appendChild(li);
        }
    }
}

function add_word_to_unfamiliar_list() {
    if (data === null)
        return;

    let word = $('#word').textContent;
    let level = $('#word-level').textContent;

    if (data[level].includes(word))
        return;

    data[level].push(word);
    localStorage.setItem('unfamiliar_words', JSON.stringify(data));

    let li = $make('li');
    li.textContent = word;
    $(`#level-${level}`).appendChild(li);
}

init_unfamiliar_list();

export {
    add_word_to_unfamiliar_list
};
