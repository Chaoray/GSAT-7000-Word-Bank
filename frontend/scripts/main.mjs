import { $, $make } from './utils.mjs';
import { update_word, update_meaning } from './wordbank_handler.mjs';

let data = null;

$('#familiar-btn').addEventListener('click', async () => {
    await update_word();
});

$('#unfamiliar-btn').addEventListener('click', () => {
    add_word_to_unfamiliar_list();
});

$('#meaning-container').addEventListener('toggle', async () => {
    await update_meaning();
});

function init_unfamiliar_list() {
    data = localStorage.getItem('unfamiliar_words');
    if (data === null) {
        const default_data = JSON.stringify({ '1': [], '2': [], '3': [], '4': [], '5': [], '6': [] });
        localStorage.setItem('unfamiliar_words', default_data);
        data = default_data;
    }

    data = JSON.parse(data);
    let word_list = data;

    let container = $('#unfamiliar-words-container');
    for (let level = 1; level <= 6; level++) {
        let article = $make('article');
        article.id = `level-${level}`;

        let h2 = $make('h2');
        h2.textContent = `Level ${level}`;
        article.appendChild(h2);

        for (let word of word_list[level]) {
            let li = $make('li');
            li.textContent = word;
            article.appendChild(li);
        }

        container.appendChild(article);
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
