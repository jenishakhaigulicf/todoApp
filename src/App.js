import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalStorageData = () => {
  const list = localStorage.getItem("mytodolist");
  if(list) {
    // note: 12 convert data into array
    return JSON.parse(list);
  } else {
    return [];
  }
}

const App = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalStorageData());
  const [toggleButton, setToggleButton] = useState(false);
  const [isEditItem, setIsEditItem] = useState("");
  const addItems = () => {
    //confusing
    if (!inputData) {
      alert("please fill the data");
    } else if(toggleButton && inputData){
      setItems(
        items.map((item) => {
          if(item.id === isEditItem) {
            return {...item, name: inputData}
          }
          return item;
        })
      );
      setInputData(""); 
      setToggleButton(false);
      setIsEditItem(null);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  //handling key press
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.nativeEvent.code === "Enter") {
      addItems();
    }
  };

  const removeItem = (index) => {
    const updatedItem = items.filter((item) => {
      return item.id !== index;
    });
    setItems(updatedItem);
  };

  const removeAllItem = () => {
    setItems([]);
  }

  //edit the items
  const editItem = (index) => {
    const updatedItem = items.find((item) => {
      return item.id === index;
    });
    //note: using map or filter wont help will return a object kinda thing
    console.log(updatedItem);
    setToggleButton(true);
    setIsEditItem(updatedItem.id);
    setInputData(updatedItem.name);
  };
  // const updatedItem = items.filter((item) => {
  //   return item.id === index;
  // });
  // //note: using map or filter wont help will return a object kinda thing
  // console.log(JSON.stringify(updatedItem));
  // setInputData(updatedItem.name);

  //adding localStorage
  
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items))
  }, [items])
  

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here 🌻</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item ✏️"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              onKeyPress={(e) => handleKeypress(e)}
            />
            {/* note: 11 fontawesome use "fa was missing and the icon was not being shown" */}
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItems} />
              ) : (
              <i className="fa fa-solid fa-plus add-btn" onClick={addItems}></i>
            )}
            {/* show items */}
            <div className="showItems">
              {items.map((item) => {
                return (
                  <div className="eachItem" key={item.id}>
                    <h3>{item.name}</h3>;
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"
                        onClick={() => {
                          editItem(item.id);
                        }}
                      ></i>
                      <i
                        className="fas fa-trash-alt add-btn"
                        onClick={() => {
                          removeItem(item.id);
                        }}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="showItems">
              <button
                className="btn effect04"
                data-sm-link-text="Remove All"
                onClick={() => {
                  removeAllItem();
                }}
              >
                <span>CHECK lIST</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
