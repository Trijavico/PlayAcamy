const $cta = document.querySelector('.play_icon');
const $map = document.querySelector('.map_bg');
const $returns = Array.from(document.querySelectorAll('.spikes button'))
const $cta_credits = document.querySelector('.cta_credits');
const $calc = document.getElementById('calc');
const $exit = document.getElementById('exit');

const values = {
    'first_level': document.querySelector('.first_level'),
    'second_level': document.querySelector('.second_level'),
    'third_level': document.querySelector('.third_level')
}

function changeSection(values, map){

    const target = values[document.querySelector("input[name=pathway]:checked").value];
    document.body.classList.add('disappear')

    setTimeout(() => {
        map.dataset.display = 'false';
        target.dataset.display = 'show';
        document.body.classList.remove('disappear')
    }, 2000);
}

function returnToMap(values, map){
    document.body.classList.add('disappear');

    setTimeout(() => {
        for (const key in values) {
            values[key].dataset.display = 'false';
        }
        map.dataset.display = 'show';
        document.body.classList.remove('disappear')
    }, 2000);
}

$cta.addEventListener('click', () =>{
    changeSection(values, $map);
});

$returns.forEach(button => {
    button.addEventListener('click', ()=>{
        returnToMap(values, $map)
    })
})