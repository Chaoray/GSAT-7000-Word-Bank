import { $, $make } from './utils.mjs';
import { update_word, update_meaning, set_weight_from_userinput } from './wordbank_handler.mjs';
import { add_word_to_unfamiliar_list } from './familiar_list_handler.mjs';

$('#familiar-btn').addEventListener('click', async () => {
    await update_word();
});

$('#unfamiliar-btn').addEventListener('click', () => {
    add_word_to_unfamiliar_list();
});

$('#meaning-container').addEventListener('toggle', async () => {
    await update_meaning();
});

for (let level = 1; level <= 6; level++) {
    const input = $(`#prob-level-${level}`);
    input.addEventListener('change', () => {
        set_weight_from_userinput();
    });
}
