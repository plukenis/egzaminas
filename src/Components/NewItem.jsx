import { useState } from "react";

function NewItem({ create }) {
  // STATE bus objektas (buvo galima daryti 5 steitus ir jiems priskirti kontroliavima, bet darem paprasciau, vienas steitas, kuris kontroliuoja 5 inputus)
  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    discount_price: "",
    sale: false,
  });

  // inputu kontroliavimas, daroma inputu kopija nes tiesiogiai steito keisti negalima, norint gauti reiksme naudojam e.target.value
  const control = (e, what) => {
    const inputsCopy = { ...inputs };
    inputsCopy[what] = e.target.value;
    if (what === "sale") {
      inputsCopy[what] = !inputs.is_busy;
    }
    setInputs(inputsCopy);
  };

  const handleCreate = () => {
    create(inputs);
    // resetina inputu info kai sukuriamas naujas scooteris
    setInputs({
      title: "",
      price: "",
      discount_price: "",
      sale: false,
    });
  };

  // Cia yr akontroliuojamas komponentas. Kiekvienas inputas turi savo STATE, be State negalima kontroliuoti. Yra būdingas onChange eventas, jis pasileis kai ką nors įrašysim.
  return (
    <div className="new-item">
      <div className="each-new-item">
        <span>New title: </span>
        <input
          type="text"
          value={inputs.title}
          onChange={(e) => control(e, "title")}
          placeholder="insert title"
          onKeyPress={(event) => {
            if (
              !/[' ', 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']/.test(
                event.key
              )
            ) {
              event.preventDefault();
            }
          }}
          minLength="1"
          maxLength="200"
          required
        />
      </div>
      <div className="each-new-item">
        <span>New price: </span>
        <input
          type="number"
          value={inputs.price}
          onChange={(e) => control(e, "price")}
          placeholder="insert price"
          onKeyPress={(event) => {
            if (!/[.,0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          minLength="1"
          maxLength="10"
          required
        />
      </div>
      <div className="each-new-item">
        <span>New discount: </span>
        <input
          type="number"
          value={inputs.discount_price}
          onChange={(e) => control(e, "discount_price")}
          placeholder="insert discount"
          onKeyPress={(event) => {
            if (!/[.,0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          minLength="1"
          maxLength="10"
        />
      </div>
      <div className="each-new-item">
        <span>sale: </span>{" "}
        <input
          type="checkbox"
          value={inputs.sale}
          onChange={(e) => control(e, "sale")}
          checked={inputs.sale}
        />
      </div>
      <div className="each-new-item">
        <button onClick={handleCreate}>Save</button>
      </div>
    </div>
  );
}
export default NewItem;
