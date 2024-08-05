"use client";
import { useState, useEffect } from "react";

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
}

const AdminRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    fetch("/api/admin/rewards")
      .then((res) => res.json())
      .then((data) => setRewards(data));
  }, []);

  const addReward = async () => {
    const response = await fetch("/api/admin/rewards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, points }),
    });

    if (response.ok) {
      const newReward: Reward = await response.json();
      setRewards([...rewards, newReward]);
    }
  };

  return (
    <div>
      <h1>Admin Rewards</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        placeholder="Points"
      />
      <button onClick={addReward}>Add Reward</button>
      <ul>
        {rewards.map((r) => (
          <li key={r.id}>
            Title: {r.title}, Description: {r.description}, Points: {r.points}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminRewards;
