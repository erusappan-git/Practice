
// ITEM CONTROLLER, UI CONTROLLER, Storage Controller

// const StorageCtrl = (function () {

// })();


// ITEM Controller
const ItemCtrl = (function () {

    // Item Construtor

    const Item = function (id, name, money) {
        this.id = id;
        this.name = name;
        this.money = money;
    }

    // Data Structure / state

    const data = {

        items: [
            { id: 0, name: "clothes", money: 500 },
            { id: 1, name: "food", money: 1000 },
            { id: 2, name: "shoping", money: 1100 },
        ],
        currentItem: null,
        totalMoney: 0

    }

    return {
        getItem: function () {
            return data.items;
        },

        addItemData: function(input){
            let id;

            if(data.items.length>0){
                id= data.items[data.items.length-1].id + 1;
            }else{
                id=0;
            }

            const newItem = new Item(id,input.name,input.money);

            data.items.push(newItem);

            return newItem;
        },

        getTotalMoney: function(){
            let totMoney=0;


            data.items.forEach( item =>{
                totMoney += item.money;
            })

            data.totalMoney = totMoney

            return totMoney;
        },

        clearData: function(){
            data.items=[];
        },

        setCurrentItem: function(item){
            data.currentItem= item;
        },

        updateItem: function(input){
            data.items[data.currentItem].name = input.name;
            data.items[data.currentItem].money = input.money;
        },

        deleteItem: function(){
            data.items.splice(data.currentItem,1);
        }
    }


})();




const UICtrl = (function () {


    return {

        populateItemList: function (items) {

            let html = "";

            items.forEach(item => {

                html += `
                <li class="collection-item" id="item-1">
                    <strong>${item.name}</strong> : <em>${item.money}</em><em> rs</em>

                    <a href="#" class="secondary-content">
                        <i class="fa-solid fa-pencil edit-item"></i>
                    </a>
                </li>
              `

            });

            document.querySelector("#item-list").innerHTML = html;


        },

        clearEditState: function(){
            document.querySelector(".add-btn").style.display = "inline";
            document.querySelector(".update-btn").style.display = "none";
            document.querySelector(".delete-btn").style.display = "none";
            document.querySelector(".back-btn").style.display = "none";
        },

        showEditState: function(){

            document.querySelector(".add-btn").style.display = "none";
            document.querySelector(".update-btn").style.display = "inline";
            document.querySelector(".delete-btn").style.display = "inline";
            document.querySelector(".back-btn").style.display = "inline";
        },

        getItemList: function(){
            return{
                name: document.querySelector("#item-name").value,
                money: parseInt(document.querySelector("#item-money").value)
            }
            
        },

        addItemList : function(newItem){
            document.querySelector("#item-list").insertAdjacentHTML("beforeend",`<li class="collection-item" id="item-${newItem.id}">
               <strong>${newItem.name}</strong> : <em>${newItem.money}</em><em> rs</em>

               <a href="#" class="secondary-content">
                <i class="fa-solid fa-pencil edit-item"></i>
               </a>
            </li>`)
        },

        clearFields : function(){
            document.querySelector("#item-name").value = "";
            document.querySelector("#item-money").value = "";

        },

        displayMoney: function(money){
            document.querySelector(".total-money").innerHTML = money;
        },

        clearAll: function(){
            document.querySelector("#item-list").innerHTML = "";

        },

        populateInput: function(name,money){
            document.querySelector("#item-name").value = name;
            document.querySelector("#item-money").value = money;
        }

    }

})();

// APP Controller

const App = (function () {

    const loadEventListeners = function(){

        document.querySelector("#item-list").addEventListener("click", itemEditClick);

        document.querySelector(".back-btn").addEventListener("click", cancelRequest);
       
        document.querySelector(".add-btn").addEventListener("click", addItemSubmit);

        document.querySelector(".clear-btn").addEventListener("click",clearListItems);

        document.querySelector(".update-btn").addEventListener("click", updateItem);
        
        document.querySelector(".delete-btn").addEventListener("click", deleteItem);
    }

    const deleteItem = function(){
        ItemCtrl.deleteItem();
        UICtrl.clearFields();
        const items = ItemCtrl.getItem();
        UICtrl.populateItemList(items);
        const totalMoney = ItemCtrl.getTotalMoney();
        UICtrl.displayMoney(totalMoney);
    }

    const updateItem = function(){
        const input = UICtrl.getItemList();

        if(input.name === "" || input.money === ""){

            alert("please fill all the fields");

        }else{
            ItemCtrl.updateItem(input);

            UICtrl.clearEditState();

            UICtrl.clearFields();

            const items = ItemCtrl.getItem();

            UICtrl.populateItemList(items);

            const totalMoney = ItemCtrl.getTotalMoney();
            
            UICtrl.displayMoney(totalMoney);

        }

    }

    const clearListItems = function(){
        UICtrl.clearAll();
        ItemCtrl.clearData();
        const totalMoney = ItemCtrl.getTotalMoney();
        UICtrl.displayMoney(totalMoney);
        
    }

    const addItemSubmit = function(){
        const input = UICtrl.getItemList();

        if(input.name === "" || input.money === ""){

            alert("please fill all the fields");

        }else{

            const newItem= ItemCtrl.addItemData(input);

            UICtrl.addItemList(newItem);

            const totalMoney = ItemCtrl.getTotalMoney();

            UICtrl.displayMoney(totalMoney);

            UICtrl.clearFields();

        }

    }

    const cancelRequest = function(e){
        UICtrl.clearFields();
        UICtrl.clearEditState();
    }

    const itemEditClick = function(e){
        if(e.target.classList.contains("edit-item")){
            const itemList = e.target.parentElement.parentElement;
            const name = itemList.children[0].innerText;
            const money = itemList.children[1].innerText;
            // console.log(typeof name,typeof money);
            const index = Array.from(itemList.parentElement.children).indexOf(itemList);
            ItemCtrl.setCurrentItem(index);
            UICtrl.populateInput(name,money);
            UICtrl.showEditState();
        }
    }


    return {
        start: function () {
           
            document.addEventListener("DOMContentLoaded", ()=>{
                
                const totalMoney = ItemCtrl.getTotalMoney();

                UICtrl.displayMoney(totalMoney);
            })

            UICtrl.clearEditState();

            const items = ItemCtrl.getItem();

            if (items.length > 0) {

                UICtrl.populateItemList(items);

            }

            loadEventListeners();

            


        }
    }


})();


App.start();
