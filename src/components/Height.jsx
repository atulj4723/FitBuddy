const Height = ({ setHeight, height }) => {
    return (
        <div className="height">
            
            Height :
            <input className="hinput"
                type="number"
                value={height}
                onChange={(e) => {
                    setHeight(e.target.value);
                }}
            />
        cm
        </div>
    );
};
export default Height;
