export const fetchTodos = async () => {
  const response = await fetch('http://localhost:3001/todos');
  return await response.json();
};

export const createTodo = async (text: string) => {
  const newTodo = {
    text,
    done: false,
    createdTimestamp: Date.now(),
  };

  const response = await fetch('http://localhost:3001/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    window.alert(`Unexpected error ${response.status}: ${response.statusText}`);
    throw new Error(`Unexpected error ${response.statusText}`);
  }
  return response.json();
};
