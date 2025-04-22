const Weight = ({ setWeight,weight }) => {
    return (
        <div className="weight">
            
            Weight:
            <input className="iweight"
                type="number"
				value={weight}
                onChange={(e) => {
                    setWeight(e.target.value);
                }}
                
            />kg
        </div>
    );
};
export default Weight;