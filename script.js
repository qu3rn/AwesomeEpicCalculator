// play sounds multiple with elements on html 
function playFile( file )
{
    var audio = document.createElement('audio');
    audio.src = file;
    document.body.appendChild(audio);
    audio.play();
    
    audio.onended = function () {
      this.parentNode.removeChild(this);
    }
}

// calculator opeeration section class

class Calculator 
{

    constructor ( previousOperationTextElement, currentOperationTextElement ) 
    {
        this.previousOperationTextElement = previousOperationTextElement
        this.currentOperationTextElement = currentOperationTextElement
        this.clear()
    }

    getDisplayNumber( number ) 
    {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if(isNaN(integerDigits)) 
        {
            integerDisplay = ''
        }
        else 
        {
            integerDisplay = integerDigits.toLocaleString( 'en', {
                maximumFractionDigits: 0
            })
        }

        if(decimalDigits != null) 
        {
            return `${integerDisplay}.${decimalDigits}`
        }
        else 
        {
            return integerDisplay
        }

    }

    clear() 
    {

        this.currentOperation = '';
        this.previousOperation = '';
        this.operation = undefined;

    }

    delete() 
    {

        if ( this.currentOperation === "" ) return

        this.currentOperation = this.currentOperation.toString().slice(0,  -1)

    }

    appendNum( num ) 
    {

        if ( num === '.' && this.currentOperation.includes('.') ) return

        this.currentOperation = this.currentOperation.toString() + num.toString();

    }

    chooseOperation( operation )
    {

        if ( this.currentOperation === "" ) return

        if ( this.previousOperation !== "" ) 
        {
            this.compute()
        } 
        
        this.operation = operation
        this.previousOperation = this.currentOperation
        this.currentOperation = ''

    }

    compute() 
    {

        let computation 
        const previous = parseFloat( this.previousOperation )
        const current = parseFloat ( this.currentOperation )

        if ( isNaN(previous) || isNaN(current) ) return

        switch ( this.operation ) 
        {

            case '+' :
                computation = previous + current
                break

            case '-' :
                computation = previous - current
            break   

            case '*' :
                computation = previous * current
                break
                
            case '÷' :
                computation = previous / current
            break

            default : 
                return 

        }

        this.currentOperation = computation
        this.operation = undefined 
        this.previousOperation = ''

    }


    updateDisplay() {

        this.currentOperationTextElement.innerText = this.getDisplayNumber( this.currentOperation )

        if ( this.operation != null ) {

            this.previousOperationTextElement.innerText = `${ this.getDisplayNumber( this.previousOperation ) } ${ this.operation }`

        }
        else 
        {
            this.previousOperationTextElement.innerText = ''
        }

    }

}

// Here are defined buttons
const operationButtons = document.querySelectorAll( "[data-operation]" );
const numberButtons = document.querySelectorAll( "[data-number]");

const deleteButton = document.querySelector( "[data-delete]" );
const equalButton = document.querySelector( "[data-equals]" );
const allClearButton = document.querySelector( "[data-all-clear]" );
const previousOperationTextElement = document.querySelector( "[data-previous-operation" );
const currentOperationTextElement = document.querySelector( "[data-current-operation]" );

//  Here are defined sounds
const buttonClickSound = "sounds/FunctionAndOperationsClick.wav";
const deleteClickSound = "sounds/DeleteClick.wav";
const equalClickSound = "sounds/equalClick.wav";
const allclearClickSound = "sounds/allclearClick.wav";

// Calculator class 
const calculator = new Calculator( previousOperationTextElement, currentOperationTextElement  );

// Add event listeners to calculator buttons - diggits and dot
numberButtons.forEach( button => 
{
    button.addEventListener('click', () => 
    {
        calculator.appendNum( button.innerText )
        calculator.updateDisplay()
        playFile( buttonClickSound )
    })
})

// Add event listeners to calculator buttons - operation buttons 
operationButtons.forEach( button => 
{
        button.addEventListener('click', () => 
        {
            calculator.chooseOperation( button.innerText )
            calculator.updateDisplay()
            playFile( buttonClickSound )
        })
})

// Add event listeners to calculator buttons - equal button 
equalButton.addEventListener('click', () => 
{
    calculator.compute()
    calculator.updateDisplay();
    playFile( equalClickSound );
})

// Add event listeners to calculator buttons - all clear button 
allClearButton.addEventListener('click', () => 
{
    calculator.clear()
    calculator.updateDisplay();
    playFile( allclearClickSound );
})

// Add event listeners to calculator buttons - delete button 
deleteButton.addEventListener('click', () => 
{
    calculator.delete()
    calculator.updateDisplay();
    playFile( deleteClickSound )
})


