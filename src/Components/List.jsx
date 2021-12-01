import Item from "./Item";
// Grąžina masyvą, suformuotą susiejant kiekvieną masyvo (-ų) reikšmę su nauja reikšme
function List({ list, deleteItem, modal }) {
  return (
    <>
      <h2>book list</h2>
      <div className="extra-list">
        {list.map((item) => (
          <Item
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            modal={modal}
          ></Item>
        ))}
      </div>
    </>
  );
}
export default List;
