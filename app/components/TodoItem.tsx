"use client";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
};

const TodoItem = ({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) => {
  return (
    <li className="flex justify-between items-center space-x-3 p-5 bg-base-200 rounded-lg shadow-md hover:bg-neutral transition-transform duration-500 ease-in-out">
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          className="cursor-pointer peer checkbox checkbox-neutral hover:checkbox-primary"
          defaultChecked={complete}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className="pl-4 peer-checked:line-through peer-checked:text-gray-500 text-lg cursor-pointer"
        >
          {title}
        </label>
      </div>
      <button
        className="btn btn-error btn-sm"
        onClick={(e) => {
          deleteTodo(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
