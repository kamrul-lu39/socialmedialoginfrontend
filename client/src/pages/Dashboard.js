import { useEffect, useState } from "react";
import { fetchData, createItem } from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const addItem = async () => {
    const newItem = { id: Date.now().toString(), name: "New Item" };
    const created = await createItem(newItem);
    setData([...data, created]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Dashboard</h1>
      <button onClick={addItem} style={{ padding: "10px", fontSize: "16px" }}>Add Item</button>
      <ul>
        {data.map((item) => (
          <li key={item.id} style={{ margin: "10px" }}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
