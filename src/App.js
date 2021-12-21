import React, {useEffect, useState} from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/useHttp";

function App() {
	const [tasks, setTasks] = useState([]);
	const apiUrl = "https://task-apps-backend-default-rtdb.firebaseio.com/tasks.json";

	const {isLoading, error, sendRequest: fetchTasks} = useHttp();

	useEffect(() => {
		const taskManager = (taskData) => {
			const loadedTasks = [];

			for (const taskKey in taskData) {
				loadedTasks.push({id: taskKey, text: taskData[taskKey].text});
			}

			setTasks(loadedTasks);
		};

		fetchTasks({ url: apiUrl },taskManager);
		
		
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
