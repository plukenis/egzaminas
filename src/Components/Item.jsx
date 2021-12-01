function Item({ item, deleteItem, modal }) {
    // paspaudus showEdit turi išlysti modalas
    const showEdit = () => {
      modal(item);
    };
  
    // // datos fromatas
    // const d = new Date(item.last_milking_time);
    // let month = "00" + (d.getMonth() + 1);
    // month = month.substring(month.length - 2);
    // let day = "00" + d.getDate();
    // day = day.substring(day.length - 2);
    // item.last_milking_time = `${d.getFullYear()}-${month}-${day}`;

    const sale = (s) => {
      if (s === 1) {
          return 'yes';
      } else {
          return 'no';
      }
  }
  
    return (
      <div className="list">
        <span>Title: </span>
        <div className="each-item">
          <div>{item.title}</div>
        </div>
        <span>price: </span>
        <div className="each-item">
          <div>{item.price} €</div>
        </div>
        <div className="each-item">
          <span>discount price: </span>
          <div>{item.discount_price} €</div>
        </div>
        <div className="each-item">
          <span>sale: </span>
          <div>{sale(item.sale)}</div>
        </div>
        <button onClick={() => deleteItem(item.id)}>Delete</button>
        <button onClick={showEdit}>Edit</button>
      </div>
    );
  }
  export default Item;