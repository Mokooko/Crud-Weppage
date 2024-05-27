// gerekli HTML elemetlerini sec
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container")
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");





// Duzenleme Secenekleri
let editElement  ;
let editFlag = false;  // duzenleme modunda olup olmadigini belirtir
let editId = ""; // duzenleme yapilan ogenin benzersiz kimligi 



// olay izliyicileri 

form.addEventListener("submit",addItem);
clearBtn.addEventListener("click", clearItems);

// Fonksiyonlar 

function displayAlert(text, action){
    console.log(text,action);
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`);
    }, 2000);
        
    
    

}




function addItem(e){
    e.preventDefault(); // formun otomatik olarak gonderilmesini engelliyor yani sayfa yenilenmiyor sadece icinde bulundugu fonksiyon ekleniyor 
    const value = grocery.value; // form icerisinde bulunan inputun degerini alma 
    const id = new Date().getTime().toString(); // benzersiz bir id olusturduk
    

    // eger deger bos degilse ve duzenleme modunda degilse altta item ekle 
    if(value !== "" && !editFlag){
     const element =  document.createElement("article"); //yeni bir article ogesi olusturdum
     let attr = document.createAttribute("data-id"); // yeni bir veri kimligi olusturur ekledigim urunleri silmek icin 
    attr.value = id;
    element.setAttributeNode(attr);  // olusturdugumuz id elemente ekledim
    element.classList.add("grocery-item");  // olusturdugumuz elementi class ekledim
    element.innerHTML = `
    <p class="tittle">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    </div> `;

       const deleteBtn = element.querySelector(".delete-btn");
       deleteBtn.addEventListener("click", deleteItem);

       const editBtn = element.querySelector(".edit-btn");
       editBtn.addEventListener("click", editItem);
       
       

       // kapsayiciya ekleme yapma             
     list.appendChild(element);
     displayAlert("Basariyla Eklendi","success");
     container.classList.add("show-container"); 

     grocery.value = ""; // form icerisinde bulunan inputun degerini sifirla 
    } else if(value !== "" && editFlag) {

        editElement.innerHTML = value;
        displayAlert("Deger degistirildi","success");     
    } else {

    }
}

// silme fonksiyonu 
function deleteItem(e){
   const element =  e.currentTarget.parentElement.parentElement;
   const id = element.dataset.id;
   list.removeChild(element);

   displayAlert("oge kaldirildi", "danger");
}

function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    console.log(items);
    if (items.length > 0) {
      items.forEach((item) => list.removeChild(item));
    }
    container.classList.remove("show-container"); // konteynarı gizle
    displayAlert("Liste Boş", "danger");
  }

//Duzenleme Fonksiyonu 
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;

    //duzenleme yapilacak ogeyi secme 

     editElement = e.currentTarget.parentElement.previousElementSibling;
     console.log(editElement);

     // form icerisinde bulunan inputun degerini duzenlenen ogenin metni ile doldurmak
     grocery.value = editElement.innerHTML;
     
     editFlag = true;
     editId = element.dataset.id; // duzenlenen ogenin kimligi 
     submitBtn.textContent="duzenle";
}