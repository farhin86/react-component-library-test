import { useMemo, useState } from "react";
import { Input } from "../Input/input";
import "./todoList.css";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import { Tabs } from "../Tabs/tabs";

interface todoItem {
  id: number;
  value: string;
  active: boolean;
}

export function TodoList() {
  const [currentTodoText, setCurrentTodoText] = useState<string>("");
  const [todoList, setTodoList] = useState<todoItem[]>([]);
  const [sortOnOldestFirst, setSortOnOldestFirst] = useState(true);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsList = ["All", "Active", "Completed"];

  function handleAddNewTodo(key: string) {
    if (key === "Enter" && currentTodoText.length > 0) {
      const createTime = Date.now();
      const newTodo = {
        id: createTime,
        value: currentTodoText,
        active: true,
      };
      if (sortOnOldestFirst) {
        setTodoList([...todoList, newTodo]);
      } else {
        setTodoList([newTodo, ...todoList]);
      }
      setCurrentTodoText("");
    } else if (key === "Escape") {
      setCurrentTodoText("");
    }
  }

  function handleEditListItem(currValue: string, id: number) {
    const updatedTodoList = todoList.map((listItem) => {
      if (listItem.id === id) {
        listItem.value = currValue;
      }
      return listItem;
    });
    setTodoList(updatedTodoList);
  }

  function handleSortOnOrder() {
    setSortOnOldestFirst(!sortOnOldestFirst);
  }

  function handleCompleteTask(id: number) {
    const updatedTodoList = todoList.map((listItem) => {
      if (listItem.id === id) {
        listItem.active = !listItem.active;
      }
      return listItem;
    });
    setTodoList(updatedTodoList);
  }

  function handleChageTab(indexVal: number) {
    setActiveTabIndex(indexVal);
  }

  const visibleTodos = useMemo(() => {
    const visibleTodos =
      activeTabIndex === 1
        ? todoList.filter((listItem) => {
            if (listItem.active) {
              return listItem;
            }
          })
        : activeTabIndex === 2
        ? todoList.filter((listItem) => {
            if (!listItem.active) {
              return listItem;
            }
          })
        : todoList;
    return visibleTodos.sort((a, b) => {
      if (!sortOnOldestFirst) {
        return b.id - a.id;
      } else return a.id - b.id;
    });
  }, [activeTabIndex, todoList, sortOnOldestFirst]);

  return (
    <div className="todo-list-wrapper">
      <div className="create-todo-wrapper">
        <Input
          onChange={(val) => setCurrentTodoText(val)}
          value={currentTodoText}
          placeholder="Create new todo"
          onKeyDown={(e) => handleAddNewTodo(e.key)}
        />
      </div>
      <div className="sort-list">
        <div>Oldest first</div>
        <input
          type="checkbox"
          name="sort"
          onChange={handleSortOnOrder}
          checked={sortOnOldestFirst}
        />
      </div>
      <Tabs
        list={tabsList}
        activeIndex={activeTabIndex}
        handleChageTab={handleChageTab}
      />
      <div>
        {visibleTodos.length > 0 ? (
          visibleTodos.map((listItem) => {
            return (
              <div className="todo-list-section" key={listItem.id}>
                <TodoListItem
                  handleEdit={(value) => handleEditListItem(value, listItem.id)}
                  isCompleted={!listItem.active}
                  value={listItem.value}
                  handleCompleteTask={() => handleCompleteTask(listItem.id)}
                />
              </div>
            );
          })
        ) : (
          <div className="empty-list-msg">No task in this section yet!</div>
        )}
      </div>
    </div>
  );
}
