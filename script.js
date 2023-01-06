//Declaration des données du tableau 
const donneDepRev =(function (){
    const Item= function(id,title, amount){
      this.id=id;
      this.title=title;
      this.amount=amount;
    };
    
    //definition du tableau
    const data={
      items: [],
    };
    return {
      dataItem:function(){
        return data;
      },
      ajouter: function(title,amount){
        let ID = donneDepRev.createID();
        //creation d'un nouveau
        newAjouter = new Item(ID,title,amount);
       //pouser dans le tableau
        data.items.push(newAjouter);
       //retour
        return newAjouter;
      },
      createID: function () {
        //créer au hasard des nombres compris entre 0 et 10000 pour les id
        const idNum = Math.floor(Math.random() * 10000);
        return idNum;
      },
      
    }
  })();
  // controler les donnees
  const executDepRev=(function(){
    //declaration des selecteurs
    const Selecteur={
      title:"#title",
      amount:"#amount",
      ajouBudget:"#budget_fcfa",
      ajouDepense:"#depense_fcfa",
      ajouSolde:"#solde_fcfa",
      itemrevenu:".item_revenu",
      itemdepense:".item_depense",
      revenu:"#list_revenu",
      depense:"#list_depense",
      btnrevenu:"#btn_ajout_rev",
      btndepense:"#btn_ajout_dep",
      deleteListe:".sup",
      updateListe:".modif",
    };
    return {
      //recuperation des inputs au niveau du css
      repSelecteur: function (){
        return Selecteur;
      },
      repTitle: function() {
      return {
        titleInput: document.querySelector(Selecteur.title).value,
      };
      },
      repAmount: function() {
        return {
          amountInput: document.querySelector(Selecteur.amount).value,
        };
      },
      //creation,recuperation, modification et suppresion  revevenu
      //creer la liste des revenus
      recRevenu: function(item){
        //creer une section
        const div=document.createElement("div");
        //creer sa class
        div.classList="itemrevenu";
        div.id = `item-${item.id}`;
        div.innerHTML= `<h3>${item.title}</h3>
        <div class="item_revenu1">
          <span class="item_revenu">${item.amount}</span>
          <p class="symbol">F CFA</p>
        </div>
        <p><a class="sup" href="">Suprimer</a></p>
        `; 
        document.querySelector(Selecteur.revenu).insertAdjacentElement("beforeend",div);
      },
      clearInputs: function () {
        document.querySelector(Selecteur.title).value = "";
        document.querySelector(Selecteur.amount).value = "";
      },
      //metre à jour et afficher le budget
      miseBudget: function (){
        //recuperation de tous les revenus
        const bugetTotal= document.querySelectorAll(Selecteur.itemrevenu);
       //parcours du tableau
        const budgetCompte= [...bugetTotal].map((item)=> +item.innerHTML);
       //calcule du budget nouveau
        const budSomme= budgetCompte.reduce(function (a , b){
          return a + b;
        }, 0);
        //afficher le budget total
        const afficheRevenu=(document.querySelector(Selecteur.ajouBudget).innerHTML=budSomme.toFixed(0));
      },
      //creation,recuperation, modification et suppresion  revevenu
      //creer la liste des depenses
      recDepense: function(item){
        const div=document.createElement("div");
        //creer une class
        div.classList="itemdepense";
        div.id = `item-${item.id}`;
        div.innerHTML= `<h3>${item.title}</h3>
        <div class="item_depense1">
          <span class="item_depense">${item.amount}</span>
          <p class="symbol">F CFA</p>
        </div>
        <p> <a class="sup" href="">Suprimer</a></p>
        `;
        document.querySelector(Selecteur.depense).insertAdjacentElement("beforeend", div)
      },
      //metre à jour et afficher depense
      miseDepense: function (){
        //recuperation de tous les revenus
        const depenseTotal= document.querySelectorAll(Selecteur.itemdepense);
       //parcours du tableau
        const depenseCompte= [...depenseTotal].map((item)=> +item.innerHTML);
       //calcule du budget
        const depenseSomme= depenseCompte.reduce(function (a , b){
          return a + b;
        }, 0);
        //afficher le budget total
        const affiche2=(document.querySelector(Selecteur.ajouDepense).innerHTML=depenseSomme);
      },
      //metre à jour et afficher le solde
      miseSolde: function(){
        //recuperation de revenu depense et solde
        const revTotal=document.querySelector(Selecteur.ajouBudget);
        const depTotal=document.querySelector(Selecteur.ajouDepense);
        const solTotal=document.querySelector(Selecteur.ajouSolde);
        //afficher le solde total
        solTotal.innerHTML=(+revTotal.innerHTML - +depTotal.innerHTML).toFixed(0);
      },
    }
  })();
  //Execution App
  const App= (function(){
    //Evenement
    const Ajouterlistener =function(){
      //Recuperation du selecteur global
      const RecSelecteur=executDepRev.repSelecteur();
      //Ajouter Revenus
      document.querySelector(RecSelecteur.btnrevenu).addEventListener("click", ajouterRev);
      //Ajouter depense
      document.querySelector(RecSelecteur.btndepense).addEventListener("click", ajouterDep);
      //Suprimer
      document.querySelectorAll(RecSelecteur.deleteListe).forEach(b => {
        b.addEventListener("click", function() {
          return deleteItem(this.value);
        });
      });
      //Modification
      document.querySelectorAll(RecSelecteur.updateListe).forEach(b => {
        b.addEventListener("click", function() {
          return modifItem(this.value);
        });
      });
    };
    const ajouterRev =function(){
      //recuperation le title et amount
      const title= executDepRev.repTitle();
      const amount= executDepRev.repAmount();
      
      if(title.titleInput !=="" && amount.amountInput !==""){
        const newAjouter= donneDepRev.ajouter(title.titleInput, amount.amountInput);
        //ajouter dans la list
        executDepRev.recRevenu(newAjouter);
        //clear
        executDepRev.clearInputs(); 
        //nouveau budget
        executDepRev.miseBudget();
        //nouveau solde
        executDepRev.miseSolde();  
      }else if(title.titleInput ===''){
        alert("Veuilez Saisir le Titre!!!");
      }else if(amount.amountInput==''){
        alert("Veuilez Saisir le montant!!!")
      }
    };
    const ajouterDep=function(){
      const title= executDepRev.repTitle();
      const amount= executDepRev.repAmount();
      
      if(title.titleInput !=="" && amount.amountInput !==""){
        const newAjouter= donneDepRev.ajouter(title.titleInput, amount.amountInput);
        //ajouter dans la list
        executDepRev.recDepense(newAjouter);
        //clear
        executDepRev.clearInputs(); 
        //nouveau depense
        executDepRev.miseDepense();  
        //nouveau solde
        executDepRev.miseSolde();
      }else if(title.titleInput ===''){
        alert("Veuilez Saisir le Titre!!!");
      }else if(amount.amountInput==''){
        alert("Veuilez Saisir le montant!!!")
      }
    };
    const deleteItem = function (index) {
      if (confirm("Confirmez-vous la suppression ?")) {
        data.items.splice(index, 1);
        //mettre à jour le budget
        executDepRev.miseBudget();
        //mettre à jour les dépenses
        executDepRev.miseDepense();
        //calculer le solde
        executDepRev.miseSolde();
      }
    };
    // const modifItem= function (index) {
    //   // Récupération de la ligne via son index
    //   const rec = dataItem.find((m, i) => {
    //     return i == index;
    //   });
    
    //   // Alimentation des champs
    //   document.getElementById("title").value = rec.title;
    //   document.getElementById("amount").value = rec.amount;
    // };
    return {
      init: function () {
        Ajouterlistener();
      },
    };
  })(donneDepRev, executDepRev);
  App.init();