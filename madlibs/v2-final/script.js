(function () {
     "use strict";
     console.log("reading js");
     // your code starts here

     const myForm = document.querySelector('form')
     const formData = document.querySelectorAll('input[type=text]')
     const review = document.querySelector('#review')

     const words = []

     myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        processFormData(formData);
        document.querySelector('#finalreview').className = 'showing'
    });

    function processFormData(formData){
        const words = [];
        const emptyfields = [];
        let counter = 0;
        for (const eachWord of formData){

            if(eachWord.value){
                words.push(eachWord.value);
                eachWord.value = '';
            }
            else{
                emptyfields.push(counter);
            }
            counter++;

        }
            
        if (emptyfields.length > 0){
            showErrors(formData, emptyfields);
        } else {
            makeMadlib(words);
        }
        
        // makeMadlib(words);
    }

    function showErrors(formData, emptyfields){
        const errorId = formData[emptyfields[0]].id;
        const errorText =  `Please fill out this ${errorId}`;
        review.innerHTML = errorText;
        document.querySelector(`${errorId}`).focus();
    }

    function makeMadlib(words){
        const myText = `<strong>Notes:</strong> I finally got to try this new spot! I ordered the <strong>${words[0]}</strong>, which was <strong>${words[1]}</strong> and had just the right amount of <strong>${words[2]}</strong>. It was so <strong>${words[3]}</strong> that my <strong>${words[4]}</strong> started <strong>${words[5]}</strong>.`
        review.innerHTML = myText
        for (const eachField of formData){
            eachField.value = ''
        }
        console.log(myText)
        console.log(review.innerHTML)
    }

    document.querySelector('#close').addEventListener('click', function(){
        document.querySelector('#finalreview').className = 'hidden'
    });


})();