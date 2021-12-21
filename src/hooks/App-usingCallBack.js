import React, {useEffect, useState, useCallback} from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/useHttp";

function App() {
	const [tasks, setTasks] = useState([]);
	const apiUrl = "https://task-apps-backend-default-rtdb.firebaseio.com/tasks.json";

	const taskManager = useCallback((taskData) => {
		const loadedTasks = [];

		for (const taskKey in taskData) {
			loadedTasks.push({id: taskKey, text: taskData[taskKey].text});
		}

		//!! this are guaranteed to never change by react
		setTasks(loadedTasks);
	}, []);

	// !! CUSTOM HOOK
	const {isLoading, error, sendRequest: fetchTasks} = useHttp({url: apiUrl}, taskManager);

	// !! useEffect run in every re-render
	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
		</React.Fragment>
	);
}

export default App;
