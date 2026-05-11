/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Your code here
  if(!containerElement) return null;
  containerElement.addEventListener("click", (e) => {
    if(e.target.classList.contains("remove-btn")){
      e.target.parentElement.remove();
    }
  })
  return {
    addGuest(name,side){
      const guestItem = document.createElement("div");
      guestItem.classList.add("guest-item");
      guestItem.setAttribute("data-name", name);
      guestItem.setAttribute("data-side",side);
      const span = document.createElement("span");
      span.textContent = name;
      const button = document.createElement("button");
      button.classList.add("remove-btn");
      button.textContent = "Remove";
      guestItem.append(span, button);
      containerElement.appendChild(guestItem);
      return guestItem;
    },
    removeGuest(name){
      const allguest = containerElement.querySelectorAll(".guest-item");
      let found = false;

      for(const guest of allguest){
        if(guest.dataset.name === name){
          guest.remove();  
          return true;
              
      }
        
      }
      return found;
    },
    getGuests(){
      const result = [];
      const allguest = containerElement.querySelectorAll(".guest-item");
      for(const guest of allguest){
        result.push({name: guest.dataset.name, side: guest.dataset.side});
      }
      return result;
    }
  }
}
        

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here
  if(!containerElement || !previewElement) return null;
  const button = document.createElement("button");
  button.classList.add("theme-btn");
  button.textContent = "traditional";
  button.setAttribute("data-theme","traditional");
  containerElement.appendChild(button);
  
  const button2 = document.createElement("button");
  button2.classList.add("theme-btn");
  button2.textContent = "modern";
  button2.setAttribute("data-theme","modern");
  containerElement.appendChild(button2);

  const button3 = document.createElement("button");
  button3.classList.add("theme-btn");
  button3.textContent = "royal";
  button3.setAttribute("data-theme","royal");
  containerElement.appendChild(button3);

  containerElement.addEventListener("click",(e) =>{
    if(e.target.classList.contains("theme-btn")){
      previewElement.className = e.target.dataset.theme;
      previewElement.setAttribute("data-theme", e.target.dataset.theme);

    }
  })
  return {
    getTheme(){
      return previewElement.dataset.theme || null;
    }
  }

}

export function setupCardEditor(cardElement) {
  // Your code here

  if(!cardElement) return null;

  cardElement.addEventListener("click",(e) =>{
    
    const editable = e.target.closest("[data-editable]");
    if(editable && cardElement.contains(editable)){
      
      const currentlyEditing = cardElement.querySelectorAll(".editing");
      currentlyEditing.forEach(element => {
        element.classList.remove("editing");
        element.contentEditable = "false";  
       });
       editable.contentEditable = "true";
       editable.classList.add("editing");
    }
    else{
      cardElement.querySelectorAll(".editing").forEach(element => {
        element.classList.remove("editing");
        element.removeAttribute("contentEditable");
      });
    }

  })
  return {
    getContent(field){
      const element = cardElement.querySelector(`[data-editable="${field}"]`);
      return element ? element.textContent : null;
    }
  }
}
