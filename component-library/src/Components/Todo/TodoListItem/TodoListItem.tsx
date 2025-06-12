import { ChangeEventHandler, useState } from "react";
import { Input } from "../Input/input";
import "./TodoListItem.css";

interface InputProps {
  handleEdit: (value: string) => void;
  value: string;
  isCompleted: boolean;
  handleCompleteTask: ChangeEventHandler<HTMLInputElement>;
}
export const TodoListItem = ({
  value,
  handleEdit,
  isCompleted,
  handleCompleteTask,
}: InputProps) => {
  const [edit, setEdit] = useState(false);
  const textToshow = value.length > 60 ? value.substring(0, 60) + "..." : value;
  return (
    <div className="todo-list-items-wrapper">
      <input
        type="checkbox"
        id={value}
        name={value}
        checked={isCompleted}
        onChange={handleCompleteTask}
      />
      <div
        className="list-item-input"
        onClick={() => {
          if (!isCompleted) {
            setEdit(true);
          }
        }}
      >
        {edit ? (
          <Input
            onChange={handleEdit}
            value={value}
            placeholder="Create new todo"
            className="input-list"
            onBlur={() => {
              setEdit(false);
            }}
          />
        ) : (
          <div>{textToshow}</div>
        )}
      </div>
    </div>
  );
};
