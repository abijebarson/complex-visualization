import { parseTex, evaluateTex } from '../tex-math-parser/index.js'; //NOT NPM version - Customized!
import { update_all } from './main.js';

var MQ = MathQuill.getInterface(2); // for backcompat

var mathFieldSpanX = document.getElementById('math-field-f');
var staticFieldSpanX = document.getElementById('stat-field-f');
var latexSpan = document.getElementById('latex');

MQ.StaticMath(staticFieldSpanX)

export let fz = function(z){ return z}

const mathfieldX = MQ.MathField(mathFieldSpanX, {
    spaceBehavesLikeTab: true,
    leftRightIntoCmdGoes: 'up',
    restrictMismatchedBrackets: true,
    sumStartsWithNEquals: true,
    supSubsRequireOperand: true,
    charsThatBreakOutOfSupSub: '=<>',
    autoSubscriptNumerals: true,
    autoCommands: 'pi theta sqrt sum int infinity',
    autoOperatorNames: 'sin cos tan sec cosec cot sinh cosh tanh sech cosech coth exp log ln',
    maxDepth: 10,
    substituteTextarea: function() {
        return document.createElement('textarea');
    },
    handlers: {
        edit: function(mathField) { 
            let latstr = mathField.latex()
            try{
                let parsed = parseTex(latstr)
                let temp = parsed.evaluate({z:0})
                fz = function (z_val) {return parsed.evaluate({z:z_val})}
                update_all(fz)
            }catch(err){
                console.log('ERROR')
            }
        },
    }
});
