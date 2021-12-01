import { useEffect, useState } from "react";

function Modal({ showModal, hide, modalElement, edit, deleteItem }) {
  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    discount_price: "",
    sale: false,
  });
  const control = (e, what) => {
    const inputsCopy = { ...inputs };
    inputsCopy[what] = e.target.value;
    if (what === "sale") {
      inputsCopy[what] = !inputs.sale;
    }
    setInputs(inputsCopy);
  };

  useEffect(() => {
    setInputs({
      title: modalElement.title,
      price: modalElement.price,
      discount_price: modalElement.discount_price,
      sale: modalElement.sale,
    });
  }, [modalElement]);

  const handleEdit = () => {
    edit(
      {
        title: inputs.title,
        price: inputs.price,
        discount_price: inputs.discount_price,
        sale: inputs.sale,
      },
      modalElement.id
    );
  };

  return (
    <div
      className="general-modal"
      style={{
        display: showModal ? "block" : "none",
        top: window.scrollY + 100 + "px",
      }}
    >
      <h2>Edit</h2>
      <div className="each-modal">
        <span>title: </span>{" "}
        <input
          type="text"
          value={modalElement.title}
          onChange={(e) => control(e, "title,")}
          readOnly
        />
      </div>
      <div className="each-modal">
        <span>Update sale: </span>{" "}
        <input
          type="checkbox"
          value={inputs.sale}
          onChange={(e) => control(e, "sale")}
          checked={inputs.sale}
        />
      </div>

      <div className="each-modal">
        <span>Update price: </span>{" "}
        <input
          type="number"
          value={inputs.price}
          onChange={(e) => control(e, "price")}
        />
      </div>
      <div className="each-modal">
        <span>Update discount: </span>{" "}
        <input
          type="number"
          value={inputs.discount_price}
          onChange={(e) => control(e, "discount_price")}
        />
      </div>
      <div className="each-modal">
        <button onClick={handleEdit}>Save</button>
        <button onClick={hide}>Return</button>
        <button onClick={() => deleteItem(modalElement.id)}>Delete</button>
      </div>
    </div>
  );
}
export default Modal;
