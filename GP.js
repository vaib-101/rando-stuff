const readline=require('readline');
const r= readline.createInterface({ //a nodejs module that allows input and output
input: process.stdin,  //registers input from keyboard
output: process.stdout //provides necessary output
});
function parseNum(input){ //checks for / and , to convert to proper numbers 
         const cleanInput=input.trim().replace(/[()]/g,''); //removes blank spaces and () 
         const constants={
         'pi': Math.PI,
         'e': Math.E,
         'phi':1.618033988
}
 if(constants[cleanInput.toLowerCase()]!==undefined){
      return constants[cleanInput.toLowerCase()];
     }
     if(cleanInput.includes('/')){
      const parts=cleanInput.split('/'); //splits the fractional number into an array of two strings
      const numerator=parseNum(parts[0]); //takes the split array and defines numbers
      const denominator=parseNum(parts[1]);
      if(isNaN(numerator)||isNaN(denominator)||denominator===0){
         return NaN;
      }
      return numerator/denominator; //for if decimal is input
   }
   if(cleanInput.includes(',')){
      const parts=cleanInput.split(',');
      const num=parts.join('');
      return parseNum(num);
   }
    if(cleanInput.toLowerCase().startsWith('0x')){ //hexadecimal
         const result=parseInt(cleanInput,16);
         if(!isNaN(result)) return result;
      }
        if(cleanInput.toLowerCase().startsWith('sqrt')){ //square root
            const num=parseNum(cleanInput.slice(4));
            if(!isNaN(num)&& num>=0){
               return Math.sqrt(num);
            }
            return NaN;
         }
          if(cleanInput.toLowerCase().startsWith('cbrt')){ //cube root
            const num=parseNum(cleanInput.slice(4));
            if(!isNaN(num)){
               return Math.cbrt(num);
            }
            return NaN;
         }
       if(cleanInput.toLowerCase().startsWith('ln')){ //log base e
            const num=parseNum(cleanInput.slice(2));
            if(!isNaN(num)&& num>0){
               return Math.log(num);
            }
            return NaN;
         }
              if(cleanInput.toLowerCase().startsWith('log')){ //log base 10
            const num=parseNum(cleanInput.slice(3));
            if(!isNaN(num)&& num>0){
               return Math.log10(num);
            }
            return NaN;
              }
   return parseFloat(cleanInput);
}
function ask(question,validate){
   return new Promise((resolve)=>{ //promise to deliver value and resolve to use said value
      const attempt=()=>{ //generates a function with no args
   r.question(question, (input)=>{
    const result=validate(input);
    if(result.ok){
      resolve(result.value);
    }else{
      console.log(result.error);
      attempt(); //recursion to make sure user is inputting properly
    }
   });
   };
   attempt();
   });
}
function validFirst(input){
   const n=parseNum(input);
   return isNaN(n)
   ? {ok: false, error: 'please enter a valid number'} //checks necessary conditions and allows correction
   : {ok: true, value: n};
}
function validRatio(input, isInf){
   const n=parseNum(input);
   if(isNaN(n)) return {ok:false, error: 'please input a valid number'};
   if(isInf && Math.abs(n)>=1) return{ok:false, error:'please input an integer from -1 to 1'}; //checks ratio and terms 
   return{ok:true, value:n};
}
function validTerms(input){
   if(input.toLowerCase()==='inf') return{ok: true, value: 'inf'};
   const n=parseNum(input);
   const c=Math.floor(n);
   if(isNaN(n)) return {ok: false, error: 'please enter a valid number'};
   if(c <= 0) return{ok: false, error: 'please enter a valid number'};
   if(n !== c) return{ok:false,error: 'please enter an integer'};
   return {ok: true, value: c};
}
async function main(){  //responsible for inputs(async is how javascript knows about delay)
   const a= await ask('enter first term: ',validFirst); //await causes a delay in the function
   const n= await ask('enter number of terms(enter inf for infinity): ',validTerms);
   const f= await ask('enter common ratio: ',(input)=>validRatio(input,n === 'inf'));
   if(n=== 'inf'){
     console.log(`The sum of terms is=${a/(1-f)}`);
      
   }else{
   const sum= f===1 ? a*n : a*((Math.pow(f,n)-1)/(f-1));
   if(!isFinite(sum)){
      console.log('The sum is too large to print');
    }else{
      console.log(`The sum of ${n} terms is ${sum}`);
    }
   }
   r.close();
}
main();




 



