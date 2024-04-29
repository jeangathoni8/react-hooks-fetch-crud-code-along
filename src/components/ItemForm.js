import React, { useState } from "react";

function ItemForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  //Add function to handle submissions
  function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => r.json())
      .then((newItem) => onAddItem(newItem));
  }

  function Item({ item, onUpdateItem, onDeleteItem }) {
    function handleDeleteClick() {
      fetch(`http://localhost:4000/items/${item.id}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then(() => onDeleteItem(item));
    }
    function handleAddToCartClick() {
      // Call onUpdateItem, passing the data returned from the fetch request
      fetch(`http://localhost:4000/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isInCart: !item.isInCart,
        }),
      })
        .then((r) => r.json())
        .then((updatedItem) => onUpdateItem(updatedItem));
    }
  }

  return (
    <li className={Item.isInCart ? "in-cart" : ""}>
      <span>{Item.name}</span>
      <span className="category">{Item.category}</span>
      {/* add the onClick listener */}
      <button
        className={Item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {Item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default ItemForm;
