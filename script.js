const types = [
      {
        id:"burger",
        type: "burger",
      },
      {
        id:"pizza",
        type: "pizza",
      },
      {
        id:"snack",
        type: "snack",
      },
      {
        id:"drink",
        type: "drink",
      },
      {
        id:"dessert",
        type: "dessert",
      },

      {
        id:"salad",
        type:"salad"
      }
];

const burgerlist=[
    {
        name:"beef burger",price:"3$"
    },
    {
        name:"cheese burger",price:"4$"
    },
]
const pizzalist=[
    {
        name:"veg burger",price:"5$"    
    },
    {
        name:"peperoni burger",price:"7$"
    },
]
const snacklist=[]
const drinklist=[]
const dessertlist=[]

const typeDisplayDiv = document.getElementById('typeDisplay');

const ulElement = document.createElement('ul');
 ulElement.style.listStyleType = 'none';
 ulElement.style.display = 'flex';
 ulElement.style.flexDirection = 'row';
 ulElement.style.justifyContent=' center';


for (const item of types) {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = item.type;
  buttonElement.type = 'button';
  buttonElement.style.margin='20px',
  buttonElement.style.fontSize='40px',
  buttonElement.style.padding='20px',
  buttonElement.style.border = '1px solid ',
  

  buttonElement.onmouseover=function() {
    buttonElement.style.backgroundColor = 'yellow';
    buttonElement.style.color = 'white';
  }
  buttonElement.onmouseout = function() {
    buttonElement.style.backgroundColor = 'white';
    buttonElement.style.color = 'black';
  };
  ulElement.appendChild(buttonElement);

  
}
typeDisplayDiv.appendChild(ulElement);



  








  
  
  



