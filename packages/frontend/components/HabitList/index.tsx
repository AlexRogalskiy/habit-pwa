import { Box } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import API from "../../constants/api";
import { getAllHabitLogs, getAllHabits } from "../../services/habits";
import HabitListItem from "../HabitListItem";

interface Props {
  date: Date;
}

const HabitList = ({ date }: Props) => {
  const { data: habits, error } = useSWR(API.habits, getAllHabits);
  const { data: habitLogs, error: habitLogErrors } = useSWR(
    API.habitlogs,
    getAllHabitLogs
  );
  console.log("habits swr", habits, error);
  console.log("habit logs", habitLogs, habitLogErrors);

  const sortedLog = habits?.data.map((habit) => {
    return habitLogs?.data?.filter((habitLog) => {
      console.log("habitLog", habitLog, habitLog.attributes);
      return habitLog.attributes.habit === habit.id;
    });
  });
  console.log("sorted log", sortedLog);

  if (error) return <div>failed to load</div>;
  if (!habits) return <div>loading...</div>;

  return (
    <Box width="100%">
      {habits.data.map((habit) => (
        <HabitListItem
          title={habit.attributes.title}
          id={habit.id}
          completed={false}
        />
      ))}
    </Box>
  );
};

export default HabitList;
