const Weight = ({ setWeight,weight }) => {
    return (
        <div className="">
            Weight
            <input
                type="number"
				value={weight}
                onChange={(e) => {
                    setWeight(e.target.value);
                }}
            />
        </div>
    );
};
export default Weight;