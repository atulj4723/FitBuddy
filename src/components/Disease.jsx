import { useState } from "react";

const Disease = ({ disease, setDisease }) => {
	const [diseaseList, setDiseaseList] = useState([
		"Asthama",
		"Diabates",
		"Blood Pressure",
	]);
	const [addDisease, setAddDisease] = useState("");
	const handle = (item) => {
		if (disease.includes(item)) {
			setDisease(
				disease.filter((cur) => {
					return cur != item;
				})
			);
		} else {
			setDisease([...disease, item]);
		}
	};
	const handleAdd = () => {
		const temp = addDisease.trim().toLowerCase();
		if (!diseaseList.includes(temp)) {
			setDiseaseList([...diseaseList, addDisease]);
		}
		setAddDisease("");
	};
	return (
		<div className="">
			<div className="diseaselist">
				{diseaseList.map((cur, idx) => {
					const selected = disease.includes(cur);
					return (
						<ul
							key={idx}
							className={`${selected ? "select" : "no"}`}
							onClick={() => {
								handle(cur);
							}}>
							{cur}
						</ul>
					);
				})}
			</div>
			<input
				type="text"
				value={addDisease}
				placeholder="Other."
				onChange={(e) => {
					setAddDisease(e.target.value);
				}}
			/>
			<button onClick={handleAdd}>add</button>
		</div>
	);
};
export default Disease;
