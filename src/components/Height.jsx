const Height = ({ setHeight,height }) => {
    return (
        <div className="">
            height
            <input
                type="number"
				value={height}
                onChange={(e) => {
                    setHeight(e.target.value);
                }}
            />
        </div>
    );
};
export default Height;