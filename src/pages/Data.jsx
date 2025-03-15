import React, { useState } from "react";
import Disease from "../components/Disease";
import Diet from "../components/Diet";
import Height from "../components/Height";
import Weight from "../components/Weight";
const Data = () => {
	const [disease, setDisease] = useState([]);
	const [height, setHeight] = useState(0);
	const [weight, setWeight] = useState(0);
	const [diet, setDiet] = useState("");
	const [step, setStep] = useState(0);
	if (
		disease.length !== 0 &&
		height !== 0 &&
		weight !== 0 &&
		diet !== "" &&
		step === 4
	) {
		console.log("dataSaved");
	}
	return (
		<div>
			{step === 0 && (
				<>
					<Diet setDiet={setDiet} diet={diet} />
					<Disease setDisease={setDisease} disease={disease} />
				</>
			)}
			{step === 1 && <Height setHeight={setHeight} height={height} />}
			{step === 2 && <Weight setWeight={setWeight} weight={weight} />}
			{step === 3 && (
				<>
					<ul>Height:{height}</ul>
					<ul>Weight:{weight}</ul>
					<ul>Diet:{diet}</ul>
					<ul>
						Disease:{disease.length == 0 ? "No Diseases" : disease.join(",")}
					</ul>
				</>
			)}

			<div>
				<button onClick={() => (step > 0 ? setStep(step - 1) : setStep(0))}>
					Previous
				</button>
				<button onClick={() => (step < 3 ? setStep(step + 1) : setStep(3))}>
					next
				</button>
			</div>
		</div>
	);
};

export default Data;
