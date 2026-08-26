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
r.question('Enter first term: ', (input)=> { //creates a callback(this function runs only when input done)
    const a= parseNum(input);
    if (isNaN(a)) { //== and === dont work as NaN not equal to NaN
     console.log('Please enter a valid number');
      r.close(); //closes the input 
      return;
    }
    r.question('Enter common ratio: ', (inputR)=>{
   const f=parseNum(inputR);
   if(isNaN(f)){
      console.log('Please enter a valid number');
      r.close();
      return;
   }
   r.question('Enter number of terms(inf for infinity): ', (inputN)=>{

    if(inputN.toLowerCase()==='inf'){
    if(Math.abs(f)>=1){
      console.log('Invalid input, give a number between -1 to 1');
      r.close();
   }
   else{
      const sum=a/(1-f);
       console.log(`The sum of infinite terms is=${sum}`);
    }}
   else{
      const c= Math.floor(parseNum(inputN));
       if(isNaN(c)) {
      console.log('Please enter a valid number');
       r.close();
      return;
       }
    else if(c<=0){
      console.log('Please enter only positive numbers');
      r.close();
      return;
    }
    else if(parseNum(inputN)!== c){ //checks if number of terms is natural
      console.log('Please enter a natural number');
      r.close();
      return;
    }
       else if(f===1){
         const sum=a*c;
          if(!isFinite(sum)){ //checks for value of sum
         console.log('The sum is too large to calculate')
        }
        else{
        console.log(`The sum of ${c} of terms is=${sum}`); 
        }
      }
      else{
        const sum=a*(Math.pow(f,c)-1)/(f-1);
        if(!isFinite(sum)){
         console.log('The sum is too large to calculate')
        }
        else{
        console.log(`The sum of ${c}  terms is=${sum}`); 
        }
      }
}
    r.close();
       });
   });
});
