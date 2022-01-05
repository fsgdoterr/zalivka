
const form = document.querySelector('form');
const block = document.querySelector('.block');
const blockHeight = block.getBoundingClientRect().height;
block.style.width = blockHeight + 'px';

window.addEventListener('keydown', event => {
    if(event.key == 'q'){
        form.classList.toggle('none');
    }
},true);

form.addEventListener('submit', event => {

    let widthPixels = form.querySelector('input[name=width]').value;
    let heightPixels = form.querySelector('input[name=height]').value;
    let colorInputs = form.querySelectorAll('input[type=color]');
    let color = [];
    colorInputs.forEach(element => {
        color.push(element.value);
    });
    if(event.submitter.id == 'addColor' ) {
        const colors = form.querySelector('.input-colors');
        const newBlock = document.createElement('div');
        newBlock.classList.add('color');
        newBlock.innerHTML ='<input type="color" name="color' + (color.length + 1) + '"><button id="delete' + (color.length + 1) + '" class="delete">Удалить</button>';
        colors.insertAdjacentElement('beforeend', newBlock);        
    }
    if(event.submitter.classList.contains('delete')) {
        event.submitter.closest('.color').remove()
    }
    if(event.submitter.id == 'submit' && document.querySelector('input[name=width]').value.length > 0 && Number(document.querySelector('input[name=width]').value) > 1 && document.querySelector('input[name=height]').value.length > 0 && Number(document.querySelector('input[name=height]').value) > 1) {
        width = Number(document.querySelector('input[name=width]').value);
        height = Number(document.querySelector('input[name=height]').value);
        colors =  [];
        
        colorInputs.forEach(el => {
            colors.push(el.value);
        });
        event.preventDefault();

        drawBlocks(width, height, colors);
        console.log(document.querySelector('canvas').getContext('2d'));
        // generateBlock(width, height, colors)
    }
    event.preventDefault();
});

function drawBlocks(width,height,colors) {
    const canvas = document.querySelector('canvas');
    const canvasHeight = canvas.height;
    const cxt = canvas.getContext('2d');
    
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++) {
            cxt.fillStyle = colors[getRandomValue(colors.length)];
            cxt.fillRect(x * (canvasHeight / width), y * (canvasHeight / height), canvasHeight/width, canvasHeight/width);
        }
    }
}

function generateBlock(width,height,colors) {
    const unitWidth = blockHeight / width;
    const unitHeight = blockHeight / height;

    block.innerHTML = '';
    block.style.gridTemplateColumns = 'repeat(' + width + ', 1fr)';
    block.style.gridTemplateRows = 'repeat(' + height + ', 1fr)';

    for(let x = 0;x < width * height; x++) {
        let color = colors[getRandomValue(colors.length)];
        let newBlock = document.createElement('div');
        newBlock.classList.add('cell');
        newBlock.style.background = color;

        block.insertAdjacentElement('beforeend', newBlock);

    }
}

function getRandomValue(max) {
    return Math.floor(Math.random() * max);
}
(function() {
    const canvas = document.querySelector('canvas');
    const h = document.querySelector('body').getBoundingClientRect().height;
    canvas.height = h/100*95;
    canvas.width = h/100*95;
})();