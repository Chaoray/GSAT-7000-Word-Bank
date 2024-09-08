import { $, $make, rand_choice } from './utils.mjs';
import { word_bank } from './wordbank_fetch.mjs';
import { get_meaning } from './meaning_fetch.mjs';

let meaning_updated = true;
let current_word = 'cook';
let weight = [1, 4, 9, 16, 25, 36];

async function update_word() {
    const level = rand_choice([1, 2, 3, 4, 5, 6], weight); // select level 1 to 6
    const word_bank_with_level = word_bank[level];
    const index = Math.floor(Math.random() * word_bank_with_level.length);
    const word = word_bank_with_level[index];

    $('#word').textContent = word;
    $('#word-level').textContent = `${level}`;

    current_word = word;
    meaning_updated = false;
    await update_meaning();
}

async function update_meaning() {
    if (meaning_updated) return;

    let is_meaning_open = $('#meaning-container').hasAttribute('open');
    if (!is_meaning_open) return;

    $('#meaning').setAttribute('aria-busy', 'true');
    $('#meaning').innerHTML = '';

    await make_meaning_nodes(current_word);
    meaning_updated = true;

    $('#meaning').setAttribute('aria-busy', 'false');

}

async function make_meaning_nodes(word) {
    let data = await get_meaning(word);

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

function set_weight_from_userinput() {
    for (let level = 1; level <= 6; level++) {
        const input = $(`#prob-level-${level}`);
        weight[level - 1] = parseInt(input.value);
    }
    localStorage.setItem('probability_weight', weight);
}

function get_weight_from_localstorage() {
    let data = localStorage.getItem('probability_weight');
    if (data === null) {
        const default_data = JSON.stringify([1, 4, 9, 16, 25, 36]);
        localStorage.setItem('probability_weight', default_data);
        data = default_data;
    }

    data = JSON.parse(data);
    weight = data;
}
get_weight_from_localstorage();

function init_weight_input_value() {
    for (let level = 1; level <= 6; level++) {
        const input = $(`#prob-level-${level}`);
        input.value = weight[level - 1];
    }
}
init_weight_input_value();

export {
    update_word,
    update_meaning,
    set_weight_from_userinput
}