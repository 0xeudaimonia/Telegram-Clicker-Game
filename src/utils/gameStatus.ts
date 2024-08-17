interface fetchGameResult {
  status: "Error" | "Success";
  message? : string;
  points: number
}

export const fetchPoints = async (currentUserId: string) => {
  try {
    const response = await fetch(
      `/api/getGamePoints?userId=${currentUserId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось получить игровые очки");
    }

    const data = await response.json();
    // setPoints(data.points);
    const formattedPoints = data.points ? data.points : 0;

    return {
      status: "Success",
      points: formattedPoints as number
    }
  } catch (error) {
    return {
      status: "Error",
      error: error instanceof Error ? error.message : 'Неизвестная ошибка при получении игровых очков',
      points: 0
    }
  }
};
