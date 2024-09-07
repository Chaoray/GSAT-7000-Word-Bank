import { $, rand_choice } from './utils.mjs';
import { word_bank } from './wordbank_fetch.mjs';
import { get_meaning } from './meaning_fetch.mjs';

let weight = [1, 4, 9, 16, 25, 36];
let current_word = 'cook';

$('#ok-btn').addEventListener('click', async () => {
    await update_word();
});

$('#meaning-container').addEventListener('toggle', async () => {
    update_meaning(current_word);
});

async function update_word() {
    let level = rand_choice([1, 2, 3, 4, 5, 6], weight);
    let word_bank_with_level = word_bank[level];
    let index = Math.floor(Math.random() * word_bank_with_level.length);
    let word = word_bank_with_level[index];
    $('#word').textContent = word;
    $('#word-level').textContent = `${level}`;

    current_word = word;
    await update_meaning(word);
}

async function update_meaning(word) {
    let is_meaning_open = $('#meaning-container').hasAttribute('open');
    if (is_meaning_open) {
        $('#meaning').setAttribute('aria-busy', 'true');
        $('#meaning').innerHTML = '';

        await make_meaning(word);

        $('#meaning').setAttribute('aria-busy', 'false');
    }
}

async function make_meaning(word) {
    let data = await get_meaning(word);
    let $make = (p) => document.createElement(p);

    for (let def of data['definition']) {
        let article = $make('article');
        let i = $make('i');
        i.textContent = def['pos'];
        article.appendChild(i);

        let ol = $make('ol');
        let li = $make('li');
        ol.appendChild(li);

        let mark = $make('mark');
        mark.textContent = def['translation'];
        li.appendChild(mark);

        for (let ex of def['example']) {
            let p = $make('p');
            p.textContent = ex['text'];
            let i = $make('i');
            i.textContent = ex['translation'];
            p.appendChild(i);
            li.appendChild(p);
        }

        article.appendChild(ol);
        $('#meaning').appendChild(article);
    }
}
