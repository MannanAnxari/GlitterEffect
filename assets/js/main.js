// Get the input and output elements
const input = document.getElementById('textInput');
const output = document.getElementById('output');

// Get the font select dropdown and range input
const fontSelect = document.getElementById('fontSelect');
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');

// Function to update the output div with the input text
function updateOutput() {
    output.innerText = input.value;
}

// Function to update the font size of the output div based on the range input value
function updateFontSize() {
    const fontSize = rangeInput.value;
    output.style.fontSize = fontSize + 'px';
    rangeValue.innerText = fontSize + 'px';
}

// Function to update the font family of the output div based on the font select dropdown value
function updateFontFamily() {
    output.style.fontFamily = fontSelect.value;
}

// Initialize the output div with default values
updateOutput();
updateFontSize();
updateFontFamily();

// Add event listeners to the input, range input, and font select dropdown
input.addEventListener('input', updateOutput);
rangeInput.addEventListener('input', updateFontSize);
fontSelect.addEventListener('change', updateFontFamily);
// Get the glitter select dropdown
const glitterSelect = document.getElementById('glitterSelect');

// Function to apply selected glitter effect to the output div
function updateGlitter() {
    const glitterOption = glitterSelect.value;
    output.classList.remove('sparkle-1', 'sparkle-2', 'sparkle-3');
    if (glitterOption) {
        output.classList.add(glitterOption);
    }
}

// Add event listener to the glitter select dropdown
glitterSelect.addEventListener('change', updateGlitter);
// Create a new GIF instance
const gif = new GIF({
    workers: 2,
    quality: 10,
    width: output.offsetWidth,
    height: output.offsetHeight,
});

// Function to add frames to the GIF
function addFrame() {
    // Get the current frame of the output div
    const frame = output.cloneNode(true);
    frame.style.position = 'relative';
    frame.style.top = '0';
    frame.style.left = '0';

    // Add the frame to the GIF
    gif.addFrame(frame, { delay: 100 });
}

// Add event listener to the input and glitter select elements to add frames when the text or glitter changes
input.addEventListener('input', addFrame);
glitterSelect.addEventListener('change', addFrame);

// When the user clicks the download button, generate and download the GIF
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', function () {
    gif.on('finished', function (blob) {
        // Create a temporary link element to download the GIF
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'glitter-text.gif';

        // Append the link to the body and trigger a click event to download the GIF
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });

    gif.render();
});
function selectGlitter(index) {
    console.log(index);
    const images = document.querySelectorAll('.glitter-images img');
    images.forEach((img, i) => {
        if (i === index - 1) {
            img.classList.add('selected'); 
            output.classList.add('test');          
            output.style.backgroundImage = `url(${img.getAttribute('src')})`;
            output.style.backgroundPosition ="center";
            output.style.backgroundClip ="text";
            output.style.color="transparent";
            console.log(output, img);
        } else {
            img.classList.remove('selected');
        }
    });

}
function downloadGif(){
    var element = document.getElementById("output"); // replace "element-id" with the ID of the element containing the GIF text
var canvas = document.createElement('canvas');

html2canvas(element).then(function(canvas) {
  var gif = new GIF({
    quality: 10,
    width: canvas.width,
    height: canvas.height,
   
  });

  gif.addFrame(canvas, {delay: 1000/30});

  gif.on('finished', function(blob) {
    var link = document.createElement('a');
    link.download = 'screenshot.gif';
    link.href = URL.createObjectURL(blob);
    link.click();
  });

  gif.render();
});
    // html2canvas(output).then(function(canvas) {        
    //       var a = document.createElement("a");
    //       a.href = canvas.toDataURL("image/png");
    //       a.download = "my-element.png";
    //       a.click();
    //     //   var imageData= canvas.toDataURL("image/png");
    //     //   var newData= imageData.replace(/^data:image\/jpg/,"data.application/octet-stream");
    //     //   $('#downloadBtn').attr("dowmload","image.jpg").attr("href",newData)
        
    //   });

// Then, add this code to your JavaScript file or script tag
// const capture = document.getElementById('output'); // Replace with the ID of the element you want to capture

// // Create a new instance of the GIF library
// const gif = new GIF({
//   workers: 2,
//   quality: 10,
//   workerScript: 'https://cdn.jsdelivr.net/npm/gif.js/dist/gif.worker.js',
//   width: capture.offsetWidth,
//   height: capture.offsetHeight,
// });

// // Use html2canvas to capture the element as a canvas
// html2canvas(capture).then(canvas => {
//   // Add the canvas as a frame to the GIF
//   gif.addFrame(canvas, { delay: 200 });

//   // Call gif.render() when you want to finish creating the GIF
//   gif.render();
// });

// // When the GIF is finished rendering, you can download it
// gif.on('finished', function(blob) {
//   // Create a new anchor element to download the GIF
//   const downloadLink = document.createElement('a');
//   downloadLink.href = URL.createObjectURL(blob);
//   downloadLink.download = 'my-gif.gif';
//   document.body.appendChild(downloadLink);
//   downloadLink.click();
// });
}

function downloadGifText() {
    const gifText = document.getElementById('output');
    const gifTextHtml = gifText.innerHTML;
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const gifImg = new Image();
  
    // Set the canvas dimensions to match the GIF text container
    canvas.width = gifText.offsetWidth;
    canvas.height = gifText.offsetHeight;
  
    // Load the background GIF image
    gifImg.src = 'https://i.picasion.com/images/glitters/gl/DCglit7.gif'; // Replace with the path to your background GIF
  
    // Draw the background GIF image onto the canvas
    gifImg.onload = function() {
      ctx.drawImage(gifImg, 0, 0, canvas.width, canvas.height);
  
      // Draw the GIF text onto the canvas
      ctx.font = '16px Arial'; // Set the desired font and size
      ctx.fillText(gifTextHtml, 0, 16); // Adjust the y-coordinate as needed
  
      // Convert the canvas to a data URL representing a GIF image
      const dataUrl = canvas.toDataURL('image/gif');
  
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'gif_text.gif';
  
      // Simulate a click on the link to start the download
      link.click();
    };
  }
  
  function convertToHebrew() {
    const inputText = document.getElementById('textInput').value;
    const outputElement = document.getElementById('output');
    
    outputElement.textContent = inputText;
    outputElement.style.direction = 'rtl'; // Set text direction to right-to-left
    outputElement.style.fontFamily = "'Open Sans Hebrew Condensed', serif"; // Set appropriate Hebrew font-family
    
    // Add CSS styles for Hebrew text appearance
    outputElement.style.fontSize = '18px';
    outputElement.style.color = 'black';
    outputElement.style.backgroundColor = 'lightgray';
  }
  
  
  
  
  
  
  
  
