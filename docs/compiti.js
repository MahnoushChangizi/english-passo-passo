/* Compiti per casa – English Passo Passo.
   Ch = scelta (domanda, opzioni, giusta) · Tx = frase da scrivere (domanda, risposte accettate) · Op = risposta libera (la corregge l'insegnante). */
(function(){
const Ch=(q,o,a)=>({k:"c",q,o,a}), Tx=(q,a)=>({k:"t",q,a}), Op=q=>({k:"o",q});
const THERE=["There is","There are","There isn't","There aren't","Is there","Are there"];
window.EPP_HOMEWORK=[
 {id:"hw1",title:"Do, There is, How much",date:"2026-10-30",
  intro:"Ripasso di do/does, there is/are, some/any/a few e la nuova lezione How much / How many.",
  sections:[
   {t:"1 · Do o Does?",i:"Scegli do oppure does. Ricorda: he, she, it → does.",items:[
     Ch("___ you like chocolate?",["Do","Does"],"Do"),Ch("___ your sister go to school?",["Do","Does"],"Does"),
     Ch("___ they play basketball?",["Do","Does"],"Do"),Ch("Where ___ your grandparents live?",["do","does"],"do"),
     Ch("___ your dog sleep on your bed?",["Do","Does"],"Does"),Ch("What ___ you eat for breakfast?",["do","does"],"do"),
     Ch("___ Marco speak English?",["Do","Does"],"Does"),Ch("___ we have homework today?",["Do","Does"],"Do")]},
   {t:"2 · Risposte brevi",i:"Rispondi con una risposta breve, per esempio: Yes, I do. / No, she doesn't.",items:[
     Tx("Do you like pizza?",["Yes, I do.","No, I don't."]),Tx("Does your mum work?",["Yes, she does.","No, she doesn't."])]},
   {t:"3 · Frasi negative",i:"Riscrivi la frase in forma negativa con don't o doesn't. Esempio: She likes milk. → She doesn't like milk.",items:[
     Tx("I like spiders.",["I don't like spiders."]),Tx("Tom plays the piano.",["Tom doesn't play the piano."]),
     Tx("We watch TV in the morning.",["We don't watch TV in the morning."]),Tx("My cat eats carrots.",["My cat doesn't eat carrots."]),
     Tx("They live in Rome.",["They don't live in Rome."]),Tx("My dad drinks coffee.",["My dad doesn't drink coffee."])]},
   {t:"4 · There is o There are?",i:"Scegli la forma giusta.",items:[
     Ch("___ a big window in my classroom.",THERE,"There is"),Ch("___ twenty students in my class.",THERE,"There are"),
     Ch("___ a swimming pool at your school? – No, there isn't.",THERE,"Is there"),Ch("___ any shops near your house? – Yes, there are.",THERE,"Are there"),
     Ch("___ any milk in the fridge. Let's buy some!",THERE,"There isn't"),Ch("___ two cats and a dog in the garden.",THERE,"There are"),
     Ch("___ any chairs in the room. We sit on the floor.",THERE,"There aren't"),Ch("___ a computer in your bedroom? – Yes, there is.",THERE,"Is there")]},
   {t:"5 · Some, any o a few?",i:"some → frasi affermative · any → negative e domande · a few → alcuni, pochi.",items:[
     Ch("There are ___ apples on the table.",["some","any"],"some"),Ch("Are there ___ biscuits in the box?",["some","any"],"any"),
     Ch("I don't have ___ brothers.",["some","any"],"any"),Ch("There are only ___ children in the park today.",["a few","any"],"a few"),
     Ch("We haven't got ___ bread.",["some","any"],"any"),Ch("I have ___ new pencils for school.",["some","any"],"some"),
     Ch("Is there ___ juice?",["some","any"],"any"),Ch("There are ___ books on my desk, not many.",["a few","any"],"a few")]},
   {t:"6 · Si conta o no? (nuovo)",i:"Questa parola si può contare?",items:[
     Ch("apple",["Si conta","Non si conta"],"Si conta"),Ch("milk",["Si conta","Non si conta"],"Non si conta"),
     Ch("egg",["Si conta","Non si conta"],"Si conta"),Ch("cheese",["Si conta","Non si conta"],"Non si conta"),
     Ch("water",["Si conta","Non si conta"],"Non si conta"),Ch("chair",["Si conta","Non si conta"],"Si conta"),
     Ch("bread",["Si conta","Non si conta"],"Non si conta"),Ch("friend",["Si conta","Non si conta"],"Si conta")]},
   {t:"7 · How much o How many? (nuovo)",i:"How many + plurale · How much + cose che non si contano.",items:[
     Ch("___ sisters do you have?",["How much","How many"],"How many"),Ch("___ water do you drink every day?",["How much","How many"],"How much"),
     Ch("___ pencils are there in your bag?",["How much","How many"],"How many"),Ch("___ money is there in your piggy bank?",["How much","How many"],"How much")]},
   {t:"8 · A few o a little? (nuovo)",i:"a few + plurale · a little + cose che non si contano.",items:[
     Ch("I want ___ sugar in my tea.",["a few","a little"],"a little"),Ch("There are ___ birds in the tree.",["a few","a little"],"a few"),
     Ch("Can I have ___ cheese, please?",["a few","a little"],"a little"),Ch("I have ___ friends in Genova.",["a few","a little"],"a few")]},
   {t:"9 · La mia camera",i:"Scrivi 5 frasi sulla tua camera con there is, there are, some, any, a few. Poi scrivi 2 domande per l'insegnante con Do you…? o Does your…?",items:[
     Op("Frase 1"),Op("Frase 2"),Op("Frase 3"),Op("Frase 4"),Op("Frase 5"),Op("Domanda 1"),Op("Domanda 2")]}
  ]}
];
})();
