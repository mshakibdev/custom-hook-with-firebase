import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "./../../hooks/useHttp";

const NewTask = (props) => {
	const {isLoading, error, sendRequest: sendTaskRequest} = useHttp();

	const createTask = (taskText, taskData) => {
		const generatedId = taskData.name; // firebase-specific => "name" contains generated id
		const task = {id: generatedId, text: taskText};

		props.onAddTask(task);
	};
	const enterTaskHandler = async (taskText) => {
		const urlResource = {
			url: "https://task-apps-backend-default-rtdb.firebaseio.com/tasks.json",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: {text: taskText},
		};

		sendTaskRequest(urlResource, createTask.bind(null, taskText));
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
