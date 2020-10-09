const StorageCtrl = (function(){

    
    // Public methods
    return{

    }

})();

const UICtrl = (function (){

    const UISelectors = {
        itemList: "#item-list",
        addBtn: ".add-btn",
        itemNameIn: "#item",
        itemCaloriesIn: "#calories",
        totalCalories: ".total-calories",
    }

    
    // Public methods
    return{
        populateItems: function(items){
            let html = '';
            items.forEach(function(item){
                html += `<li class collection-item" id="item-${item.id}"><strong>${item.name}: </strong> <em>${item.calories}</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item">Edit</i>
                </a>
              </li>`
            })

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function(){
            return UISelectors;
        },
        getItemInput: function(){
             return{
                 name : document.querySelector(UISelectors.itemNameIn).value,

                 calories: document.querySelector(UISelectors.itemCaloriesIn).value,
             } 
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameIn).value = '';
            document.querySelector(UISelectors.itemCaloriesIn).value = '';
        }
        ,
        showTotalCalories: function(){
            let total = ItemCtrl.getTotalCalories();
            document.querySelector(UISelectors.totalCalories).innerText = total;
        }

    }

})();

const ItemCtrl = (function(){
    function Item (id, name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items: [
        {id: 0, name: 'sirene', calories: 100},
        {id: 1, name: 'stek', calories: 1500},
        {id: 2, name: 'domat', calories: 50},
    ],
    currentItem: null,
    totalCalories: 0,
    }


    // Public methods
    return{
        loadData: function(){
            return data;
        },
        getItems: function(){
            return data.items;
        },
        addItem: function(name, calories){
            let ID;
            if(data.items.length > 0){
                 ID = data.items[data.items.length - 1].id + 1;
            } else{
                ID = 0;
            }
             calories = parseInt(calories);

            newItem = new Item(ID, name,calories);
            data.items.push(newItem);

            return newItem;
        },
        getTotalCalories: function(){
            let sum = 0;
            data.items.forEach(e => {
                sum += e.calories;
            })
            return sum;
        }
    }


})();

const App = (function(ItemCtrl,UICtrl){
   
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();


        document.querySelector(UISelectors.addBtn).addEventListener('click',
        itemAddSubmit);

        
    }
    const itemAddSubmit = function(e){
        e.preventDefault();

        const input = UICtrl.getItemInput();
           
            if(input.name !== "" && input.calories !== "" && !isNaN(input.calories)){
             const item = ItemCtrl.addItem(input.name, input.calories);
             console.log(item);
             UICtrl.populateItems(ItemCtrl.getItems());
             UICtrl.showTotalCalories();
            }



        }

    return {
        init: function(){
           const items = ItemCtrl.getItems();

           UICtrl.populateItems(items);
           UICtrl.clearInput();

           UICtrl.showTotalCalories();

           loadEventListeners();
        }
    }
})(ItemCtrl,UICtrl);

App.init();