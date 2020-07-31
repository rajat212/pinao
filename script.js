//accessing html elements using the javascript code
const keys = document.querySelectorAll('.key');
const visual = document.querySelector('.visual')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')
const dabba = document.querySelector('.piano')
const guitar = document.querySelector('.guitar')
const drum = document.querySelector('.drum')
var counter = 0





drum.addEventListener('click', () => playDrum())

function playDrum() {
    const drumaudio = document.getElementById('drummer');
    drumaudio.currentTime = 0;
    
    drumaudio.play()
}



guitar.addEventListener('click', () => playGuitar())

function playGuitar() {
    const guitaudio = document.getElementById('guit');
    guitaudio.currentTime = 0;
    guitaudio.play()
}



function playLoop(count) {
    const loopaudio = document.getElementById('drumloop');
    
    if(count%2==0){
        
        loopaudio.pause();
    }
    else{
        loopaudio.volume = 0.3;
        loopaudio.play()
    }
}


//keyboard mapping for playing using the keyboard

const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']
const DRUM_KEYS = ['q']
const GUITAR_KEYS = ['p']
const LOOP_KEYS = ['l']


//list of random colors to choose from
  const colors = [
    "#60d394",
    "#d36060",
    "#c060d3",
    "#d3d160",
    "#606bd3",
    "#60c2d3"
  ];

//creating a click listener event for any black piano key click
  
blackKeys.forEach((keyblack,index) => {
    keyblack.addEventListener('click', () => playNote(keyblack,index))


})

//creating a click listener event for any white piano key click

whiteKeys.forEach((keywhite,index) => {
    keywhite.addEventListener('click', () => playNote(keywhite,index))
    
    
})

//CREATING A listener event for a keyboard keypress and checking the index of key(array element) in the WHITE_KEYS or BLACK_KEYS array
//subsequently playing the key correspondnig to the speific index
document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key
    console.log(e.key)
    const whiteKeyIndex = WHITE_KEYS.indexOf(key)
    const blackKeyIndex = BLACK_KEYS.indexOf(key)
    const drumKeyIndex = DRUM_KEYS.indexOf(key)
    const guitKeyIndex = GUITAR_KEYS.indexOf(key)
    const loopKeyIndex = LOOP_KEYS.indexOf(key)
    


    
    if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex],whiteKeyIndex);
    if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex],blackKeyIndex);
    if (drumKeyIndex > -1) playDrum();
    if (guitKeyIndex > -1) playGuitar();
    if (loopKeyIndex > -1) {
        counter = counter + 1
        playLoop(counter)
    
    };
    
  })


  
  //Function to play audio

function playNote(key,index) {
    const randomElement = colors[Math.floor(Math.random() * colors.length)];


    const noteAudio = document.getElementById(key.dataset.note);
    //playing note
    
    noteAudio.currentTime = 0;
    noteAudio.play();



    //using the left position of a black key to generate a bubble at that specified position later 
    var rect = key.getBoundingClientRect();
    posl = rect.left;


    

    //adding a temporary active class attribute to make trigger to change the state while the sound is playing
    key.classList.add('active')
    dabba.classList.add('active')
    

    //removing the active class after the sound has ended
    noteAudio.addEventListener('ended', () => {
        
      key.classList.remove('active')
      dabba.classList.remove('active')
      

    })

    //checking whether the key pressed is white or black and generating the bar or bubble respectively

    if (key.dataset.color =='W'){
        createBubblesWhite(index)

    }
    else{createBubblesBlack(index,posl)}


}

//creates a bar when a white key is pressed

const createBubblesWhite = index => {
    const randomElement = colors[Math.floor(Math.random() * colors.length)];
    const bubblewhite = document.createElement("div");
    visual.appendChild(bubblewhite);
    bubblewhite.style.backgroundColor = randomElement ;
    bubblewhite.style.animation = 'jump 1s ease';
    bubblewhite.style.position = "absolute"; 
    bubblewhite.style.height = '300px'
    bubblewhite.style.width = '100px'
    bubblewhite.style.left = index*200 -350 +  'px';
    bubblewhite.style.boxShadow = "0px 0px 5px white," + "0px 0px 40px " + randomElement + ",0px 0px 70px " + randomElement;
    //animation event
    bubblewhite.addEventListener('animationend', function(){
    visual.removeChild(this);
    


    })
};

//creates a bar when a black key is pressed

const createBubblesBlack = (index,posl) => {
    const randomElement = colors[Math.floor(Math.random() * colors.length)];
    const bubbleblack = document.createElement("div");
    visual.appendChild(bubbleblack);
    bubbleblack.style.backgroundColor = randomElement ;
    bubbleblack.style.position = "absolute"; 
    bubbleblack.style.height = '50px'
    bubbleblack.style.width = '50px'
    bubbleblack.style.borderRadius = '50%'

    bubbleblack.style.animation = 'jump 1s ease';
    bubbleblack.style.left = posl -820 + 'px';
    bubbleblack.style.boxShadow = "0px 0px 10px white," +  "0px 0px 40px " + randomElement + ",0px 0px 70px " + randomElement;
    bubbleblack.addEventListener('animationend', function(){
    visual.removeChild(this);
    
})
};
